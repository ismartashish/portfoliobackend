const { Resend } = require("resend");

if (!process.env.RESEND_API_KEY) {
  console.error("❌ RESEND_API_KEY is missing in environment variables");
}

if (!process.env.EMAIL_USER) {
  console.error("❌ EMAIL_USER is missing in environment variables");
}

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ name, email, message }) => {
  console.log("📨 Attempting to send email...");
  console.log("To:", process.env.EMAIL_USER);

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.EMAIL_USER,
      subject: `New Contact Message from ${name}`,
      html: `
        <h3>New Portfolio Contact</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    console.log("✅ Email sent successfully!");
    console.log("Resend Response:", data);

    return data;
  } catch (error) {
    console.error("❌ EMAIL SEND FAILED");
    console.error(error);
    throw error;
  }
};

module.exports = sendEmail;
