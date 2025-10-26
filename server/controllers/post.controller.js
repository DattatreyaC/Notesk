import Post from "../models/Post.js";
import post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const createdPost = await Post.create({
            title,
            content,
            user: req.user._id,
        });
        if (createdPost) {
            return res.status(201).json(createdPost);
        }
    } catch (error) {
        console.log(`Error in createPost controller : ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const editPost = async (req, res) => {
    try {
        const { title, content, isPublic } = req.body;
        const id = req.params.id;
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {
                title,
                content,
                isPublic,
            },
            {
                new: true,
            },
        );
        if (updatedPost) {
            return res.status(200).json(updatedPost);
        } else {
            return res.status(404).json({ message: "Post not found" });
        }
    } catch (error) {
        console.log(`Error in editPost controller : ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const deletePost = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedPost = await Post.findByIdAndDelete(id);
        if (deletedPost) {
            return res.status(200).json(deletedPost);
        } else {
            return res.status(404).json({ message: "Post not found" });
        }
    } catch (error) {
        console.log(`Error in deletePost controller : ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getMyPosts = async (req, res) => {
    try {
        const myPosts = await Post.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .populate("user", "firstname lastname username email");

        return res.status(200).json(myPosts);
    } catch (error) {
        console.log(`Error in getMyPosts controller : ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getFriendsPosts = async (req, res) => {
    try {
        const friends = req.user.friends;
        if (friends.length === 0) {
            return res.status(404).json({ message: "No friends found" });
        }
        const posts = await Post.find({
            user: {
                $in: friends,
            },
        });
        return res.status(200).json(posts);
    } catch (error) {
        console.log(`Error in getFriendsPosts controller : ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getPostsOfUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const posts = await Post.find({ user: userId });
        return res.status(200).json(posts);
    } catch (error) {
        console.log(`Error in getPostsOfUser controller : ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const allPosts = await Post.find();
        return res.status(200).json(allPosts);
    } catch (error) {
        console.log(`Error in getAllPosts controller : ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const upvotePostController = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findByIdAndUpdate(id, {
            $push: {
                upvotes: req.user._id,
            },
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.status(200).json({ message: "Post Upvoted" });
    } catch (error) {
        console.log(`Error in upvotePostController : ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const revertUpvoteController = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id);
        if (!post || !post.upvotes.includes(req.user._id)) {
            return res.status(404).json({ message: "Post not found" });
        }

        const updatedPost = await Post.findByIdAndUpdate(id, {
            $pull: {
                upvotes: req.user._id,
            },
        });

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.status(200).json({ message: "Upvote reverted" });
    } catch (error) {
        console.log(`Error in revertUpvoteController : ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const downvotePostController = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findByIdAndUpdate(id, {
            $push: {
                downvotes: req.user._id,
            },
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.status(200).json({ message: "Post Upvoted" });
    } catch (error) {
        console.log(`Error in downvotePostController : ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const revertDownvoteController = async (req, res) => {
    try {
        const id = req.params.id;

        const post = await Post.findById(id);
        if (!post || !post.downvotes.includes(req.user._id)) {
            return res.status(404).json({ message: "Post not found" });
        }

        const updatedPost = await Post.findByIdAndUpdate(id, {
            $pull: {
                downvotes: req.user._id,
            },
        });

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.status(200).json({ message: "Upvote reverted" });
    } catch (error) {
        console.log(`Error in revertDownvoteController : ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const starPostController = async (req, res) => {
    try {
        const id = req.params.id;

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.stars.includes(req.user._id)) {
            return res
                .status(400)
                .json({ message: "You have already starred this post" });
        }

        post.stars.push(req.user._id);
        post.save();

        const updatedUser = await User.findByIdAndUpdate(req.user._id, {
            $push: {
                starredPosts: post._id,
            },
        });

        return res.status(200).json({ message: "Post starred" });
    } catch (error) {
        console.log(`Error in starPostController : ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const unstarPostController = async (req, res) => {
    try {
        const id = req.params.id;

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (!post.stars.includes(req.user._id)) {
            return res
                .status(400)
                .json({ message: "You do not have that post starred" });
        }

        post.stars = post.stars.filter(
            (starId) => starId.toString() !== req.user._id.toString(),
        );
        post.save();

        const updatedUser = await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                starredPosts: post._id,
            },
        });

        return res.status(200).json({ message: "Post unstarred" });
    } catch (error) {
        console.log(`Error in unstarPostController : ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getFeedPosts = async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch posts excluding the user's own posts
        const feedPosts = await Post.find({ user: { $ne: req.user._id } })
            .populate("user")
            .sort({ createdAt: -1 }) // newest first
            .limit(10); // only show 10 posts

        res.status(200).json(feedPosts);
    } catch (error) {
        console.error("Error fetching feed posts:", error);
        res.status(500).json({ message: "Failed to fetch feed" });
    }
};

export const getPostById = async (req, res) => {
    try {
        const id = req.params.id;

        const post = await Post.findById(id).populate("user");
        // .populate("comments");

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.status(200).json(post);
    } catch (error) {
        console.log(`Error in getting post : ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};
