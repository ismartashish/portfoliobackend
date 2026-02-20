const sendEmail = async ({ name, email, message }) => {
  try {
    const response = await resend.emails.send({
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

    console.log("Resend Response:", response);
  } catch (error) {
    console.error("FULL EMAIL ERROR:", error);
  }
};
