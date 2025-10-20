import Note from "../models/Note.js";
import Post from "../models/Post.js";
import User from "../models/User.js";
import Task from "../models/Task.js";

export const dashboardData = async (req, res) => {
    try {
        const user = req.user;

        const notes = await Note.find({ user: user._id })
            .sort({ createdAt: -1 })
            .limit(3);

        const posts = await Post.find({ user: user._id })
            .sort({ createdAt: -1 })
            .limit(3);

        const tasks = await Task.find({ user: user._id })
            .sort({ createdAt: -1 })
            .limit(3);

        const starred = user.starredPosts;

        return res.status(200).json({
            notes: notes,
            posts: posts,
            tasks: tasks,
            starredPosts: starred,
        });
    } catch (error) {
        console.log(`Error in dashboardNotes controller : ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};
