const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: [
      "https://ismartashish.github.io",
      "http://localhost:3000"
    ]
  })
);

app.use(express.json());

app.use("/api/contact", require("./routes/contact"));

app.get("/", (req, res) => {
  res.status(200).send("🚀 Portfolio Server Running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(console.error);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
