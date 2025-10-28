import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        media: [
            {
                url: { type: String, required: true },
                public_id: { type: String, required: true },
                type: {
                    type: String,
                    enum: ["image", "video"],
                    required: true,
                },
            },
        ],

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        upvotes: {
            type: Number,
            default: 0,
        },
        downvotes: {
            type: Number,
            default: 0,
        },
        stars: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                default: [],
            },
        ],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
                default: [],
            },
        ],
    },
    {
        timestamps: true,
    },
);

const Post = mongoose.model("Post", postSchema);

export default Post;
