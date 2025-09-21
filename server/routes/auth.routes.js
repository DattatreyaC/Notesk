import express from "express";
import {
    checkAuth,
    deleteProfile,
    getAllProfiles,
    login,
    logout,
    register,
    updateProfile,
} from "../controllers/auth.controller.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const router = express.Router();

//signup
router.post("/register", register);

//login
router.post("/login", login);

//logout
router.post("/logout", isLoggedIn, logout);

//update profile
router.put("/update", isLoggedIn, updateProfile);

//delete profile
router.delete("/delete", isLoggedIn, deleteProfile);

//get all profiles
router.get("/profiles", getAllProfiles);

//get auth / check auth
router.get("/profile", isLoggedIn, checkAuth);

export default router;
