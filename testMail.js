require("dotenv").config();
const sendEmail = require("./utils/sendEmail");

sendEmail({
  name: "Test",
  email: "test@test.com",
  message: "Hello test email"
})
.then(() => console.log("Email sent"))
.catch(console.error);
