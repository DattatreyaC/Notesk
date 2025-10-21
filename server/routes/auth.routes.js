import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import {
    checkAuth,
    deleteProfile,
    getAllProfiles,
    login,
    logout,
    register,
    verifyRegisterOtp,
    verifyLoginOtp,
    updateProfile,
    forgotPassword,
    resetPassword,
    verifyResetPasswordOtp,
} from "../controllers/auth.controller.js";

const router = express.Router();

//  AUTH ROUTES

router.post("/register", register);
router.post("/register/verify-otp", verifyRegisterOtp);

router.post("/login", login);
router.post("/login/verify-otp", verifyLoginOtp);

router.post("/logout", isLoggedIn, logout);

router.put("/update", isLoggedIn, updateProfile);

router.delete("/delete", isLoggedIn, deleteProfile);

router.get("/profiles", getAllProfiles);

router.get("/profile", isLoggedIn, checkAuth);

router.post("/forgot-password", forgotPassword);
router.post("/resetPassword/verify-otp", verifyResetPasswordOtp);

router.post("/reset-password", resetPassword);

export default router;
