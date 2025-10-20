import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "notesk2k25@gmail.com",
        pass: process.env.GOOGLE_APP_PASSWORD,
    },
});

export const sendResetPasswordMail = async (to, otp) => {
    await transporter.sendMail({
        from: process.env.EMAIL,
        to,
        subject: "Reset Your Password",
        html: `<p>Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.</p>`,
    });
};

export const sendAccountCreationMail = async (to, otp) => {
    await transporter.sendMail({
        from: process.env.EMAIL,
        to,
        subject: "Welcome to Notesk!",
        html: `<p>Your OTP for account creation is <b>${otp}</b>. It expires in 5 minutes.</p>`,
    });
};

export const sendLoginMail = async (to, otp) => {
    await transporter.sendMail({
        from: process.env.EMAIL,
        to,
        subject: "Login to your account",
        html: `<p>Your OTP for logging into your account is <b>${otp}</b>. It expires in 5 minutes.</p>`,
    });
};
