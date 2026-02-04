const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const sendEmail = require("../utils/sendEmail");

router.post("/", async (req, res) => {
  try {
    console.log("📩 Contact request:", req.body);

    const { name, email, message } = req.body;

    // ✅ Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // ✅ Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address"
      });
    }

    // 1️⃣ Save to DB (PRIMARY SUCCESS)
    await new Contact({ name, email, message }).save();
    console.log("✅ Saved to MongoDB");

    // 2️⃣ Try email (SECONDARY — NEVER FAIL REQUEST)
    try {
      await sendEmail({ name, email, message });
      console.log("📧 Email sent");
    } catch (mailError) {
      console.warn("📭 Email skipped:", mailError.message);
      // ❌ Do NOT throw or return
    }

    // 3️⃣ Always respond SUCCESS
    return res.status(200).json({
      success: true,
      message: "Message received successfully"
    });

  } catch (error) {
    console.error("❌ CONTACT ERROR:", error);

    // 🔥 Only real server errors reach here
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});

module.exports = router;
