const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

app.post('/order', (req, res) => {
  const { name, email, phone, interest, message } = req.body;
  console.log('New order request received:');
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Phone: ${phone}`);
  console.log(`Interest: ${interest}`);
  console.log(`Message: ${message}`);
  console.log('---');

  // In a full production setup, you can add email sending, database storage,
  // or order management logic here.

  res.json({
    status: 'success',
    message: 'Thank you! Your jewellery request has been received. We will contact you shortly.',
  });
});

app.listen(port, () => {
  console.log(`Mallick Jewellers server is running at http://localhost:${port}`);
});
