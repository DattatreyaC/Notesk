import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import {
    createNote,
    deleteNote,
    editNote,
    getMyNotes,
} from "../controllers/note.controller.js";

const router = express.Router();

router.post("/create", isLoggedIn, createNote);
router.put("/edit/:id", isLoggedIn, editNote);
router.delete("/delete/:id", isLoggedIn, deleteNote);
router.get("/mynotes", isLoggedIn, getMyNotes);

export default router;
