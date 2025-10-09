import React from "react";
import { CirclePlus } from "lucide-react";

const NotesSummaryHeader = ({
    setIsCreateOpen,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    filterBy,
    setFilterBy,
}) => {
    return (
        <div className="w-full flex border-b border-t p-4 bg-white shadow-sm">
            {/* Add Note Button */}
            <div className="flex items-center justify-end">
                <button
                    onClick={() => setIsCreateOpen(true)}
                    className="bg-black p-2 rounded text-white flex gap-2 group cursor-pointer"
                >
                    <CirclePlus className="group-hover:rotate-90 duration-200" />
                    ADD NOTE
                </button>
            </div>

            {/* Search, Sort & Filter */}
            <div className="flex flex-wrap gap-4 items-center justify-between">
                {/* Search */}
                <input
                    type="text"
                    placeholder="Search notes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border rounded px-3 py-1 w-full sm:w-64"
                />

                {/* Sort */}
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border rounded px-3 py-1"
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="title-asc">Title A–Z</option>
                    <option value="title-desc">Title Z–A</option>
                </select>

                {/* Filter */}
                <select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}
                    className="border rounded px-3 py-1"
                >
                    <option value="all">All</option>
                    <option value="pinned">Pinned</option>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                </select>
            </div>
        </div>
    );
};

export default NotesSummaryHeader;
