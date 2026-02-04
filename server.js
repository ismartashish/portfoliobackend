const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ================= CORS (FIXED) ================= */
app.use(
  cors({
    origin: [
      "https://ismartashish.github.io", // GitHub Pages
      "http://localhost:3000"           // Local dev
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
  })
);

/* ================= MIDDLEWARE ================= */
app.use(express.json());

/* ================= ROUTES ================= */
app.use("/api/contact", require("./routes/contact"));

/* ================= HEALTH ================= */
app.get("/", (req, res) => {
  res.status(200).send("🚀 Portfolio Server Running");
});

/* ================= DATABASE ================= */
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

/* ================= START ================= */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
