import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import {
    acceptFriendRequest,
    declineFriendRequest,
    getFriends,
    getOtherUsers,
    getProfile,
    removeFriend,
    searchUsers,
    sendFriendRequest,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/others", isLoggedIn, getOtherUsers);
router.get("/profile", isLoggedIn, getProfile);
router.get("/friends", isLoggedIn, getFriends);
router.post("/send-request/:id", isLoggedIn, sendFriendRequest);
router.post("/accept/:id", isLoggedIn, acceptFriendRequest);
router.post("/decline/:id", isLoggedIn, declineFriendRequest);
router.post("/removeFriend/:id", isLoggedIn, removeFriend);
router.get("/search/:searchValue", isLoggedIn, searchUsers);

export default router;
