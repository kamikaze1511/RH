const nodemailer = require("nodemailer");
const twilio = require("twilio");

// Twilio setup
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Store OTPs temporarily (replace with DB in production)
const otpStore = {}; 

// Send OTP via email
const sendEmailOTP = async (email) => {
  const otp = generateOTP();
  otpStore[email] = otp; // Save OTP temporarily

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP for Verification",
    text: `Your OTP for verification is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
  return otp;
};

// Send OTP via SMS
const sendPhoneOTP = async (phone) => {
  const otp = generateOTP();
  otpStore[phone] = otp;

  await twilioClient.messages.create({
    body: `Your OTP for verification is: ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phone,
  });

  return otp;
};

// Verify OTP
const verifyOTP = (identifier, userOTP) => {
  if (otpStore[identifier] && otpStore[identifier] === userOTP) {
    delete otpStore[identifier]; // OTP is used, remove it
    return true;
  }
  return false;
};

module.exports = { sendEmailOTP, sendPhoneOTP, verifyOTP };
