const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const sendEmail = require("../utils/sendEmail");

router.post("/", async (req, res) => {
  try {
    console.log("📩 Contact request:", req.body);

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // 1️⃣ Save to DB
    const contact = new Contact({ name, email, message });
    await contact.save();
    console.log("✅ Saved to MongoDB");

    // 2️⃣ Send Email
    try {
      await sendEmail({ name, email, message });
      console.log("📧 Email sent");
    } catch (mailError) {
      console.error("❌ Email failed:", mailError.message);

      // IMPORTANT: still return JSON
      return res.status(500).json({
        success: false,
        message: "Saved but email failed"
      });
    }

    // 3️⃣ Success response
    return res.status(200).json({
      success: true,
      message: "Message sent successfully"
    });

  } catch (error) {
    console.error("❌ CONTACT ERROR:", error);

    // 🔥 ALWAYS JSON — never HTML
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error"
    });
  }
});

module.exports = router;
