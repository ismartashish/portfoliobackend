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

    // 1️⃣ Save to DB (PRIMARY SUCCESS)
    const contact = new Contact({ name, email, message });
    await contact.save();
    console.log("✅ Saved to MongoDB");

    // 2️⃣ Try email (SECONDARY, NEVER BLOCK RESPONSE)
    try {
      await sendEmail({ name, email, message });
      console.log("📧 Email sent");
    } catch (mailError) {
      console.error("📭 Email skipped:", mailError.message);
      // ❌ DO NOT return or throw
    }

    // 3️⃣ Always return SUCCESS if DB save worked
    return res.status(200).json({
      success: true,
      message: "Message received successfully"
    });

  } catch (error) {
    console.error("❌ CONTACT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});

module.exports = router;
