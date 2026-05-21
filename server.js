require('dotenv').config();
const express = require('express');
const fs = require('fs');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  EMAIL_TO,
} = process.env;

const emailConfigured = SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && EMAIL_TO;
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

const writeOrderLog = (orderRequest) => {
  const logLine = `${new Date().toISOString()} | ${orderRequest.name} | ${orderRequest.email} | ${orderRequest.phone} | ${orderRequest.interest} | ${orderRequest.message}\n`;
  fs.appendFile('orders.log', logLine, (err) => {
    if (err) {
      console.error('Failed to write order log:', err);
    }
  });
};

const buildEmailContent = (orderRequest) => {
  return `New order request received:\n\nName: ${orderRequest.name}\nEmail: ${orderRequest.email}\nPhone: ${orderRequest.phone}\nInterested In: ${orderRequest.interest}\nMessage:\n${orderRequest.message}\n\nReceived at: ${orderRequest.receivedAt}`;
};

app.post('/order', async (req, res) => {
  const { name, email, phone, interest, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Please provide your name and email address.' });
  }

  const orderRequest = {
    name,
    email,
    phone: phone || '',
    interest: interest || '',
    message: message || '',
    receivedAt: new Date().toISOString(),
  };

  console.log('New order request:', orderRequest);
  writeOrderLog(orderRequest);

  if (emailConfigured) {
    try {
      await transporter.sendMail({
        from: `"Mallick Jewellers" <${SMTP_USER}>`,
        to: EMAIL_TO,
        subject: 'New order request from website',
        text: buildEmailContent(orderRequest),
      });
      console.log('Order email sent to', EMAIL_TO);
    } catch (error) {
      console.error('Failed to send order email:', error);
      return res.status(500).json({ message: 'Unable to complete your request right now. Please try again later.' });
    }
  } else {
    console.warn('Email is not configured. Order request is logged only.');
  }

  return res.json({ message: 'Thank you! Your order request has been received successfully.' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Mallick Jewellers server running at http://localhost:${port}`);
});