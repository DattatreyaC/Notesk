import React, { useEffect } from "react";
import NotesSummaryHeader from "../components/notes-page-components/NotesSummaryHeader";
import NoteCard from "../components/notes-page-components/NoteCard";
import useNoteStore from "../store/useNoteStore";

const NotesPage = () => {
    const { fetchNotes, isFetchingnotes, notes } = useNoteStore();

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <section className="bg w-full h-screen flex flex-col pl-12 p-3 overflow-y-auto">
            <main className="w-full min-h-screen">
                <header className="text-center">
                    <h1 className="text-black font-bold text-4xl text-center mb-4">
                        Your Notes
                    </h1>
                </header>

                {/* Summary Bar and Add Note button */}
                <NotesSummaryHeader />

                {/* Pinned Notes */}

                {/* Other Notes */}
                <div className="flex gap-5 w-full h-full pt-2">
                    {notes.map((note) => {
                        return <NoteCard key={note._id} note={note} />;
                    })}
                </div>
            </main>
        </section>
    );
};

export default NotesPage;
