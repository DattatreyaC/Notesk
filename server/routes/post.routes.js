import express from 'express';
import {
    createPost,
    deletePost,
    editPost,
    getAllPosts,
    getFriendsPosts,
    getMyPosts, getPostsOfUser,
} from "../controllers/post.controller.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const router = express.Router();

router.post('/createPost',isLoggedIn, createPost);
router.post("/editPost/:id",isLoggedIn, editPost);
router.delete("/deletePost/:id",isLoggedIn, deletePost);

router.get("/myPosts",isLoggedIn, getMyPosts)
router.get("/friendsPosts",isLoggedIn, getFriendsPosts);
router.get("/posts-of-user/:id",isLoggedIn, getPostsOfUser);
router.get('/getAllPosts',isLoggedIn, getAllPosts);

export default router;