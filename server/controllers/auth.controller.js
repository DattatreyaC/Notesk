import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import {
    sendAccountCreationMail,
    sendLoginMail,
    sendResetPasswordMail,
} from "../utils/nodemailer.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { firstname, lastname, username, password, email } = req.body;
        if (!email || !password || !username || !firstname || !lastname) {
            return res.status(400).json({ message: "Fill all fields" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res
                .status(400)
                .json({ message: "User with this email already exists" });

        const existingUsername = await User.findOne({ username });
        if (existingUsername)
            return res.status(400).json({ message: "Username already taken" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstname,
            lastname,
            email,
            username,
            password: hashedPassword,
            isOtpVerified: false,
        });

        // Generate OTP
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        user.otp = otp;
        user.otpExpires = Date.now() + 5 * 60 * 1000;
        await user.save();

        // Send OTP
        await sendAccountCreationMail(email, otp);

        return res
            .status(200)
            .json({ message: "OTP sent to your email", email: user.email });
    } catch (error) {
        console.log(`Error in register controller : ${error}`);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const verifyRegisterOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });
        if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        user.isOtpVerified = true;
        user.isEmailVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        generateToken(user, res); // log in the user after OTP
        return res
            .status(200)
            .json({ message: "Registration successful", user });
    } catch (error) {
        return res
            .status(500)
            .json({ message: `OTP verification failed: ${error}` });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: "Fill all fields" });

        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "Invalid credentials" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return res.status(400).json({ message: "Invalid credentials" });

        // Generate OTP
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        user.otp = otp;
        user.otpExpires = Date.now() + 5 * 60 * 1000;
        user.isOtpVerified = false;
        await user.save();

        await sendLoginMail(email, otp);

        return res
            .status(200)
            .json({ message: "OTP sent to your email", email: user.email });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const verifyLoginOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        user.isOtpVerified = true;
        user.isEmailVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        generateToken(user, res);
        return res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        return res
            .status(500)
            .json({ message: `OTP verification failed: ${error}` });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("token", "");
        res.clearCookie("token");
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log(`Error in logout controller : ${error}`);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { username, firstname, lastname } = req.body;

        let uploadedPicture = "";

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (firstname) user.firstname = firstname;
        if (lastname) user.lastname = lastname;
        if (username) user.username = username;

        if (req.file) {
            uploadedPicture = await uploadOnCloudinary(
                req.file.path,
                req.user._id,
            );

            if (uploadedPicture) {
                if (user.profilePicture?.public_id) {
                    await cloudinary.uploader.destroy(
                        user.profilePicture?.public_id,
                    );
                }

                user.profilePicture = uploadedPicture;

                await user.save();
            }
        }

        await user.save();

        res.status(200).json(user);
    } catch (error) {
        console.log(`Error in updateProfile controller : ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteProfile = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // If OTP required
        if (!otp) {
            // send OTP
            const generatedOtp = Math.floor(
                1000 + Math.random() * 9000,
            ).toString();
            user.otp = generatedOtp;
            user.otpExpires = Date.now() + 5 * 60 * 1000;
            user.isOtpVerified = false;
            await user.save();

            await sendLoginMail(user.email, generatedOtp);
            return res.status(200).json({ message: "OTP sent to your email" });
        }

        // Verify OTP
        if (user.otp !== otp || user.otpExpires < Date.now())
            return res.status(400).json({ message: "Invalid or expired OTP" });

        await User.findByIdAndDelete(user._id);
        return res
            .status(200)
            .json({ message: "Account deleted successfully" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: `Delete profile error: ${error}` });
    }
};

export const getAllProfiles = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        console.log(`Error in getAllProfiles controller : ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const checkAuth = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        user.otp = otp;
        user.otpExpires = Date.now() + 5 * 60 * 1000;
        user.isOtpVerified = false;
        await user.save();

        await sendResetPasswordMail(email, otp);
        return res.status(200).json({ message: "OTP sent to your email" });
    } catch (error) {
        return res.status(500).json({ message: `Send OTP error: ${error}` });
    }
};

export const verifyResetPasswordOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        user.isOtpVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        return res.status(200).json({ message: "OTP Verified" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: `OTP Verification error: ${error}` });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.findOneAndUpdate(
            { email },
            { password: hashedPassword },
        );

        if (!user) return res.status(400).json({ message: "User not found" });

        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: `Reset password error: ${error}` });
    }
};
