import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },

        isPublic: {
            type: Boolean,
            default: false,
        },

        isPinned: {
            type: Boolean,
            default: false,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        tags: [
            {
                type: String,
                default: [],
            },
        ],
    },
    {
        timestamps: true,
    },
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
