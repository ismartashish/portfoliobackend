const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const sendEmail = require("../utils/sendEmail");

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    console.log("📩 Contact request:", req.body);

    // ✅ Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address"
      });
    }

    // 1️⃣ Save to DB
    await new Contact({ name, email, message }).save();
    console.log("✅ Saved to MongoDB");

    // 2️⃣ RESPOND IMMEDIATELY (THIS IS THE KEY)
    res.status(200).json({
      success: true,
      message: "Message received successfully"
    });

    // 3️⃣ Fire-and-forget email (cannot affect response)
    sendEmail({ name, email, message })
      .then(() => console.log("📧 Email sent"))
      .catch(err =>
        console.warn("📭 Email skipped:", err.message)
      );

  } catch (err) {
    console.error("❌ CONTACT ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});

module.exports = router;
