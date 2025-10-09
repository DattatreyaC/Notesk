import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import {
    createNote,
    deleteNote,
    editNote,
    getMyNotes,
    pinNote,
    unpinNote,
} from "../controllers/note.controller.js";

const router = express.Router();

router.post("/create", isLoggedIn, createNote);
router.put("/edit/:id", isLoggedIn, editNote);
router.delete("/delete/:id", isLoggedIn, deleteNote);
router.get("/mynotes", isLoggedIn, getMyNotes);

router.post("/pin/:id", isLoggedIn, pinNote);
router.post("/unpin/:id", isLoggedIn, unpinNote);

export default router;
