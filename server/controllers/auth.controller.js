import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
    try {
        const { firstname, lastname, username, password, email } = req.body;
        if (!email || !password || !username || !firstname || !lastname) {
            return res.status(400).json({ message: "Fill all fields" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstname,
            lastname,
            email,
            username,
            password: hashedPassword,
        });

        if (user) {
            generateToken(user, res);
            return res.status(200).json(user);
        }
    } catch (error) {
        console.log(`Error in register controller : ${error}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Fill all fields" });
        }
        const user = await User.findOne({ email }).populate("friends");

        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        generateToken(user._id, res);
        return res.status(200).json(user);
    } catch (error) {
        console.log(`Error in login controller : ${error}`);
        return res.status(500).json({ message: "Internal Server Error" });
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

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            {
                firstname,
                lastname,
                username,
            },
            { new: true },
        );

        if (!updatedUser) {
            return res.status(400).json({ message: "Whoops" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(`Error in updateProfile controller : ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteProfile = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user._id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(deletedUser);
    } catch (error) {
        console.log(`Error in deleteProfile controller : ${error}`);
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
