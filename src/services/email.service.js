import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Exists ✅" : "❌ MISSING");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Must be false for TLS
    auth: {
        user: process.env.EMAIL_USER?.trim(), // Trim any unwanted spaces
        pass: process.env.EMAIL_PASS?.trim()
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error("SMTP Error:", error);
    } else {
        console.log("✅ SMTP Server is ready to send emails.");
    }
});

export default async function sendEmail(email, message){
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Notification",
        text: message
    })
    console.log(`Email sent to ${email}`)
}