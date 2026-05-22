const nodemailer = require('nodemailer');

const {
  ENABLE_EMAIL,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  EMAIL_TO,
} = process.env;

const emailEnabled = ENABLE_EMAIL === 'true';
const emailConfigured = emailEnabled && SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && EMAIL_TO;
let transporter;

if (emailConfigured) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

const buildEmailBody = (orderRequest) => {
  return `New order request received:\n\nName: ${orderRequest.name}\nEmail: ${orderRequest.email}\nPhone: ${orderRequest.phone}\nInterested In: ${orderRequest.interest}\nMessage:\n${orderRequest.message}\n\nReceived at: ${orderRequest.receivedAt}`;
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, phone = '', interest = '', message = '' } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ message: 'Please provide your name and email address.' });
  }

  const orderRequest = {
    name,
    email,
    phone,
    interest,
    message,
    receivedAt: new Date().toISOString(),
  };

  if (emailEnabled) {
    if (!emailConfigured) {
      console.error('Email enabled but SMTP settings are incomplete.');
      return res.status(500).json({ message: 'Email notification setup is incomplete. Please configure SMTP settings or disable email notifications.' });
    }

    try {
      await transporter.sendMail({
        from: `"Mallick Jewellers" <${SMTP_USER}>`,
        to: EMAIL_TO,
        subject: 'New order request from website',
        text: buildEmailBody(orderRequest),
      });
      console.log('Order email sent to', EMAIL_TO);
    } catch (error) {
      console.error('Failed to send order email:', error);
      return res.status(500).json({ message: 'Unable to complete your request right now. Please try again later.' });
    }
  }

  return res.status(200).json({ message: 'Thank you! Your order request has been received successfully.' });
};
