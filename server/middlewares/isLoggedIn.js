import jwt, { decode } from "jsonwebtoken";
import User from "../models/User.js";

const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "No token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).populate("friends");

        if (!user) {
            return res.status(401).json({ message: "Invalid user" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

export default isLoggedIn;
