import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: false,
        },

        priority: {
            type: String,
            enum: ["LOW", "MEDIUM", "HIGH"],
            required: true,
        },

        dueDate: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
