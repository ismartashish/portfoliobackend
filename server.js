const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

/* ================= APP ================= */
const app = express();

/* ================= CORS (FIXED FOR EXPRESS 5) ================= */
app.use(cors({
  origin: true,               // allow all origins
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));

// ✅ IMPORTANT: handle preflight explicitly
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
  } else {
    next();
  }
});

/* ================= MIDDLEWARE ================= */
app.use(express.json());

/* ================= ROUTES ================= */
app.use("/api/contact", require("./routes/contact"));

/* ================= DATABASE ================= */
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

/* ================= HEALTH ================= */
app.get("/", (req, res) => {
  res.status(200).send("Portfolio Server Running");
});

/* ================= START ================= */
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
