const nodemailer = require("nodemailer");

const sendEmail = async ({ name, email, message }) => {
  // ⏱️ Fail fast on Render (no long hangs)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    connectionTimeout: 5000, // 5s
    greetingTimeout: 5000,
    socketTimeout: 5000
  });

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `New Contact Message from ${name}`,
    html: `
      <h3>New Portfolio Contact</h3>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Message:</b> ${message}</p>
    `
  };

  // 🔥 Let error bubble to caller (already handled safely)
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
