const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const sendEmail = require("../utils/sendEmail");

router.post("/", async (req, res) => {
  try {
    console.log("📩 Contact request received:", req.body);

    const { name, email, message } = req.body;

    // STEP 1: Save to DB
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    console.log("✅ Saved to MongoDB");

    // STEP 2: Send email
    await sendEmail({ name, email, message });
    console.log("📧 Email sent");

    return res.status(200).json({
      success: true,
      message: "Message sent successfully"
    });

  } catch (error) {
    console.error("❌ CONTACT ROUTE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
