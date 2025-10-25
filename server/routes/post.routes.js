import express from "express";
import {
    createPost,
    deletePost,
    downvotePostController,
    editPost,
    getAllPosts,
    getFeedPosts,
    getFriendsPosts,
    getMyPosts,
    getPostById,
    getPostsOfUser,
    revertDownvoteController,
    revertUpvoteController,
    starPostController,
    unstarPostController,
    upvotePostController,
} from "../controllers/post.controller.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const router = express.Router();

router.post("/createPost", isLoggedIn, createPost);
router.put("/editPost/:id", isLoggedIn, editPost);
router.delete("/deletePost/:id", isLoggedIn, deletePost);

router.get("/feed", isLoggedIn, getFeedPosts);
router.get("/myPosts", isLoggedIn, getMyPosts);
router.get("/:id", isLoggedIn, getPostById);
router.get("/friendsPosts", isLoggedIn, getFriendsPosts);
router.get("/posts-of-user/:id", isLoggedIn, getPostsOfUser);
router.get("/getAllPosts", isLoggedIn, getAllPosts);

router.post("/post/upvote/:id", isLoggedIn, upvotePostController);
router.post("/post/unupvote/:id", isLoggedIn, revertUpvoteController);
router.post("/post/downvote/:id", isLoggedIn, downvotePostController);
router.post("/post/undownvote/:id", isLoggedIn, revertDownvoteController);
router.post("/post/star/:id", starPostController);
router.post("/post/unstar/:id", unstarPostController);

export default router;
