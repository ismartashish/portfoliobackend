const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

/* ================= SAFE DEBUG ================= */
console.log("EMAIL_USER loaded:", !!process.env.EMAIL_USER);
console.log("EMAIL_PASS loaded:", !!process.env.EMAIL_PASS);

/* ================= APP ================= */
const app = express();

/* ================= CORS CONFIG ================= */
const allowedOrigins = [
  "http://localhost:3000",
  "https://ashishjha1-portfolio-git-main-ismartashishs-projects.vercel.app",
  "https://ashishjha1-portfolio.vercel.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests without origin (Postman, server-to-server)
      if (!origin) return callback(null, true);

      // allow listed origins
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // allow ALL vercel preview deployments
      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      // ❗ DO NOT THROW ERROR (prevents HTML response)
      return callback(null, false);
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true
  })
);

// handle preflight requests
app.options("*", cors());

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

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio Server Running"
  });
});

/* ================= GLOBAL ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error("❌ SERVER ERROR:", err.message);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

/* ================= START SERVER ================= */
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
