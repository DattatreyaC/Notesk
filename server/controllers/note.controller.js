import Note from "../models/Note.js";
import User from "../models/User.js";

export const createNote = async (req, res) => {
    try {
        const { title, content, isPublic } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Fill all fields" });
        }

        const createdNote = await Note.create({
            title,
            content,
            isPublic,
            user: req.user._id,
        });

        if (createdNote) {
            const updatedUser = await User.findByIdAndUpdate(createdNote.user, {
                $push: {
                    notes: createdNote._id,
                },
            });

            if (updatedUser) return res.status(201).json(createdNote);
        }
    } catch (error) {
        console.log(`Error in createNote controller : ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const editNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, isPublic, isPinned, tags } = req.body;

        const updatedNote = await Note.findByIdAndUpdate(
            id,
            {
                title,
                content,
                isPublic,
                isPinned,
                tags,
            },
            { new: true },
        );

        if (updatedNote) {
            return res.status(200).json(updatedNote);
        }
    } catch (error) {
        console.log(`Error in updateNote controller : ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedNote = await Note.findByIdAndDelete(id);

        if (deletedNote) {
            const updatedUser = await User.findByIdAndUpdate(deletedNote.user, {
                $pull: {
                    notes: deletedNote._id,
                },
            });

            if (updatedUser) return res.status(201).json(deletedNote);
        }
    } catch (error) {
        console.log(`Error in deleteNote controller : ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getMyNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id }).sort({
            createdAt: -1,
        });

        if (notes) {
            res.status(200).json(notes);
        }
    } catch (error) {
        console.log(`Error in getMyNotes controller : ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};
