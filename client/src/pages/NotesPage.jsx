import React, { useEffect, useState } from "react";
import NotesSummaryHeader from "../components/notes-page-components/NotesSummaryHeader";
import NoteCard from "../components/notes-page-components/NoteCard";
import useNoteStore from "../store/useNoteStore";
import Loader from "../components/Loader.jsx";
import CreateNote from "../components/notes-page-components/CreateNote.jsx";

const NotesPage = () => {
    const { fetchNotes, isNotesLoading, notes, createNote, deleteNote } =
        useNoteStore();

    const [isCreateOpen, setIsCreateOpen] = useState(false);

    useEffect(() => {
        document.title = "Notes";
        fetchNotes();
    }, []);

    if (isNotesLoading && notes.length === 0) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />;
            </div>
        );
    }

    return (
        <section className="bg w-full h-screen flex flex-col pl-12 p-3 overflow-y-auto relative overflow-x-hidden">
            <main className="w-full ">
                {/* Page Title */}
                <header className="text-center mb-6">
                    <h1 className="text-black font-extrabold text-3xl md:text-4xl lg:text-5xl">
                        Your Notes
                    </h1>
                    <p className="text-gray-600 mt-2 text-sm md:text-base">
                        Keep your ideas, tasks, and reminders organized ✨
                    </p>
                </header>

                {/* Summary Bar and Add Note button */}
                <NotesSummaryHeader
                    isCreateOpen={isCreateOpen}
                    setIsCreateOpen={setIsCreateOpen}
                />

                {/* Pinned Notes */}
                {notes.some((note) => note.isPinned) && (
                    <section className="mt-8 flex flex-col items-center justify-center ">
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {notes
                                .filter((note) => note.isPinned)
                                .map((note) => (
                                    <NoteCard key={note._id} note={note} />
                                ))}
                        </div>
                    </section>
                )}

                {/* Other Notes */}
                {notes.some((note) => !note.isPinned) && (
                    <section className="mt-10 flex flex-col items-center justify-center ">
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {notes
                                .filter((note) => !note.isPinned)
                                .map((note) => (
                                    <NoteCard key={note._id} note={note} />
                                ))}
                        </div>
                    </section>
                )}

                {/* Empty State */}
                {!isNotesLoading && notes.length === 0 && (
                    <div className="text-center mt-20 text-gray-500">
                        <p className="text-lg">
                            No notes yet. Start by adding one! ✍️
                        </p>
                    </div>
                )}
            </main>

            <CreateNote
                isCreateOpen={isCreateOpen}
                setIsCreateOpen={setIsCreateOpen}
            />
        </section>
    );
};

export default NotesPage;
