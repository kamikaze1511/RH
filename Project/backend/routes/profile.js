const express = require("express");
const router = express.Router();
const Student = require("../models/Student");  
const Researcher = require("../models/Researcher");  
const authMiddleware = require("../middleware/authMiddleware"); 

router.get("/", authMiddleware, async (req, res) => {  // ✅ Ensure correct route path
  try {
    let user = await Student.findById(req.user.id).select("-password");
    if (!user) {
      user = await Researcher.findById(req.user.id).select("-password");
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
