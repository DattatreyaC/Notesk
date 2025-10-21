import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },

        requestsReceived: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                default: [],
            },
        ],

        requestsSent: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                default: [],
            },
        ],

        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                default: [],
            },
        ],

        notes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Note",
                default: [],
            },
        ],

        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post",
                default: [],
            },
        ],

        starredPosts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post",
                default: [],
            },
        ],

        tasks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Task",
                default: [],
            },
        ],

        otp: {
            type: String,
        },
        otpExpires: {
            type: Date,
        },
        isOtpVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

// userSchema.index({ otpExpires: 1 }, { expireAfterSeconds: 600 });

const User = mongoose.model("User", userSchema);

export default User;
