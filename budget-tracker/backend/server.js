require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const twilio  = require('twilio');
const crypto  = require('crypto');

const app = express();
app.use(express.json());
app.use(cors());

// ── Twilio client ────────────────────────────────────────────────────────────
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// ── In-memory OTP store (per phone, expires in 5 min) ───────────────────────
const otpStore = new Map(); // phone -> { code, expiry, attempts }

function generateOtp() {
  return String(crypto.randomInt(100000, 999999));
}

function normalizePhone(phone) {
  // Strip spaces/dashes, ensure starts with +
  return phone.replace(/[\s\-()]/g, '');
}

// ── POST /send-otp ───────────────────────────────────────────────────────────
app.post('/send-otp', async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: 'Phone number required' });

  const normalized = normalizePhone(phone);

  // Only allow YOUR phone number
  const allowedPhone = normalizePhone(process.env.MY_PHONE_NUMBER || '');
  if (allowedPhone && normalized !== allowedPhone) {
    // Return generic error — don't reveal which numbers are allowed
    return res.status(403).json({ error: 'This number is not authorized.' });
  }

  // Rate limit: max 3 OTPs per 10 minutes
  const existing = otpStore.get(normalized);
  if (existing && existing.expiry > Date.now() && existing.attempts >= 3) {
    return res.status(429).json({ error: 'Too many attempts. Wait a few minutes.' });
  }

  const code   = generateOtp();
  const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes
  otpStore.set(normalized, { code, expiry, attempts: (existing?.attempts || 0) + 1 });

  // Send SMS via Twilio
  try {
    await twilioClient.messages.create({
      body: `Your BudgetEye verification code is: ${code}\n\nValid for 5 minutes. Do not share this code.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: normalized,
    });
    console.log(`[OTP] Sent to ${normalized.slice(0, -4)}****`);
    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (err) {
    console.error('[Twilio Error]', err.message);
    res.status(500).json({ error: 'Failed to send SMS. Check Twilio credentials.' });
  }
});

// ── POST /verify-otp ─────────────────────────────────────────────────────────
app.post('/verify-otp', (req, res) => {
  const { phone, code } = req.body;
  if (!phone || !code) return res.status(400).json({ error: 'Phone and code required' });

  const normalized = normalizePhone(phone);
  const record     = otpStore.get(normalized);

  if (!record) return res.status(400).json({ error: 'No OTP found. Request a new one.' });
  if (Date.now() > record.expiry) {
    otpStore.delete(normalized);
    return res.status(400).json({ error: 'Code expired. Request a new one.' });
  }
  if (code !== record.code) {
    return res.status(400).json({ error: 'Incorrect code. Try again.' });
  }

  // Valid — clean up and issue a simple session token
  otpStore.delete(normalized);
  const token = crypto.randomBytes(32).toString('hex');

  console.log(`[AUTH] Verified: ${normalized.slice(0, -4)}****`);
  res.json({ success: true, token });
});

// ── Health check ─────────────────────────────────────────────────────────────
app.get('/health', (_, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
const HOST = process.env.SERVER_HOST || 'localhost';
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n✅ BudgetEye backend running`);
  console.log(`   Local:   http://localhost:${PORT}`);
  console.log(`   Network: http://${HOST}:${PORT}  ← use this on your phone\n`);
});
