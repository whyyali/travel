const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config()

let verificationCodes = {};

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  host: 'smtp.gamil.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_ADMIN,
    pass: process.env.EMAIL_PASS, 
  },
});

module.exports = {
  sendCode: async (req, res, next) => {
    const { contact } = req.body;

    if (!contact) {
      return res.status(400).json({ message: 'Contact information is required' });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    verificationCodes[contact] = {
      code: verificationCode,
      timestamp: Date.now(),
    };

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: contact,
      subject: 'Your Verification Code',
      text: `Your verification code is ${verificationCode}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.json({ message: 'Verification code sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Failed to send verification code' });
    }
  },

  receivedCode: async (req, res, next) => {
    const { contact, code } = req.body;

    if (!contact || !code) {
      return res.status(400).json({ message: 'Contact and verification code are required' });
    }

    const storedCode = verificationCodes[contact];

    if (!storedCode) {
      return res.status(400).json({ message: 'No verification code found for this contact' });
    }

    // Check if the code is expired (e.g., 10 minutes
    const codeLifetime = 10 * 60 * 1000; // 10 minutes in milliseconds
    if (Date.now() - storedCode.timestamp > codeLifetime) {
      delete verificationCodes[contact];
      return res.status(400).json({ message: 'Verification code has expired' });
    }

    if (storedCode.code !== code) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    // Code is valid
    delete verificationCodes[contact]; // Optionally delete the code after verification
    res.json({ message: 'Verification code is valid' });
  },
};