"use client";

import Head from "next/head";
import NoteCard from "../_components/note.component";
import AddNoteForm from "./add-note.component";
import UseNote from "../_hooks/use-note.hook";

export default function Home() {
  const {
    data: { activeNotes, archivedNotes, notes, searchTerm, showAddForm },
    handler: {
      addNote,
      archiveNote,
      deleteNote,
      setSearchTerm,
      setShowAddForm,
      unarchiveNote,
    },
  } = UseNote();

  return (
    <main className="app-container">
      <Head>
        <title>Personal Notes</title>
      </Head>

      <div className="container">
        <header className="header">
          <h1>Personal Notes</h1>
        </header>

        <div className="controls">
          <input
            type="text"
            placeholder="Search notes"
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            className="add-btn"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? "Tutup" : "Add notes"}
          </button>
        </div>

        {showAddForm && (
          <AddNoteForm
            onAddNote={addNote}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        <div className="notes-section">
          <h2>Active Notes</h2>
          <div className="notes-grid">
            {activeNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onArchive={archiveNote}
                onUnarchive={unarchiveNote}
                onDelete={deleteNote}
              />
            ))}
          </div>
        </div>

        <div className="notes-section">
          <h2>Archived Notes</h2>
          {archivedNotes.length === 0 ? (
            <div className="empty-state">
              <p>None</p>
            </div>
          ) : (
            <div className="notes-grid">
              {archivedNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onArchive={archiveNote}
                  onUnarchive={unarchiveNote}
                  onDelete={deleteNote}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
