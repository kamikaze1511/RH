const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require('../models/Student');
const Researcher = require('../models/Researcher');
const { hashPassword } = require('../utils/auth');
const upload = require('../utils/upload');
const { sendEmailOTP, sendPhoneOTP, verifyOTP } = require("../utils/otpService");

// Student Registration (with file uploads)
router.post('/register-student', upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'photo', maxCount: 1 }]), async (req, res) => {
    console.log("📥 Received Student Data:", req.body);
    console.log("📂 Received Files:", req.files);

    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const { firstName, lastName, email, password, nationality, phone, university, registrationNo } = req.body;
        const hashedPassword = await hashPassword(password);

        const student = new Student({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            nationality,
            phone,
            university,
            registrationNo,
            resume: req.files?.resume ? req.files.resume[0].path : null,
            photo: req.files?.photo ? req.files.photo[0].path : null,
        });

        await student.save();
        console.log("✅ Student Registered:", student);
        res.status(201).json({ message: 'Student registered successfully' });
    } catch (err) {
        console.error("⚠️ Error Saving Student:", err.message);
        res.status(500).json({ error: err.message });
    }
});


// Researcher Registration (with file uploads)
router.post('/register-researcher', upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'photo', maxCount: 1 }]), async (req, res) => {
    console.log("Received Researcher Data:", req.body);
    console.log("Received Researcher Files:", req.files);
    try {
        const { firstName, lastName, email, password, nationality, phone, researcherId, university, registrationNo, linkedIn, scopusId, orcid } = req.body;
        const hashedPassword = await hashPassword(password);
        const researcher = new Researcher({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            nationality,
            phone,
            researcherId,
            university,
            registrationNo,
            linkedIn,
            scopusId,
            orcid,
            resume: req.files['resume'] ? req.files['resume'][0].path : null,
            photo: req.files['photo'] ? req.files['photo'][0].path : null,
        });
        await researcher.save();
        res.status(201).json({ message: 'Researcher registered successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/get-user-count', async (req, res) => {
    try {
        const studentCount = await Student.countDocuments();
        const researcherCount = await Researcher.countDocuments();
        res.json({ count: studentCount + researcherCount });
    } catch (err) {
        console.error("Error fetching user count:", err.message);
        res.status(500).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check in Students collection
        let user = await Student.findOne({ email });

        // If not found, check in Researchers collection
        if (!user) {
            user = await Researcher.findOne({ email });
        }

        // If still not found, return error
        if (!user) {
            console.log("❌ User not found:", email);
            return res.status(400).json({ message: "User not found" });
        }

        console.log("🔑 Stored Hashed Password:", user.password);
        console.log("📝 Entered Password:", password);

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("🔄 Password Match:", isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: "Wrong credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, user });
    } catch (error) {
        console.error("⚠️ Server error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Send OTP to email
router.post("/send-email-otp", async (req, res) => {
  const { email } = req.body;
  try {
    await sendEmailOTP(email);
    res.json({ message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

// Send OTP to phone
router.post("/send-phone-otp", async (req, res) => {
  const { phone } = req.body;
  try {
    await sendPhoneOTP(phone);
    res.json({ message: "OTP sent to phone" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

// Verify OTP
router.post("/verify-otp", (req, res) => {
  const { identifier, otp } = req.body; // identifier can be email or phone
  if (verifyOTP(identifier, otp)) {
    res.json({ message: "OTP verified successfully" });
  } else {
    res.status(400).json({ error: "Invalid OTP" });
  }
});


module.exports = router;


