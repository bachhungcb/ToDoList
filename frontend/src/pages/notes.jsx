import React from "react";
import "../styles/notes.css";
import { useState, useEffect } from "react";
import axios from '../util/axios.customize';


/*
  const notes ={
    _id: ObjectId,
    title: String,
    content: String
  }
*/

const notesPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  // Fetch notes on initial load
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`/notes`);
        setNotes(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotes();
  }, []);

  // Add a new note
  const handleAddNote = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/notes", {
        title,
        content,
      });
      const newNote = response;
      setNotes([newNote, ...notes]);  // Add the new note to the start of the list
      setTitle("");
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };

  // Handle note click (for editing)
  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  // Update an existing note
  const handleUpdateNote = async (event) => {
    event.preventDefault();
    if (!selectedNote) return;

    try {
      const response = await axios.put(`/notes/${selectedNote._id}`, {
        title,
        content,
      });
      const updatedNote = response;

      setNotes(prevNotes => prevNotes.map(note => 
        note._id === selectedNote._id ? updatedNote : note
      ));
      
      setTitle("");
      setContent("");
      setSelectedNote(null);
    } catch (err) {
      console.log(err);
    }
  };

  // Cancel editing a note
  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  // Delete a note
  const deleteNote = async (event, noteId) => {
    event.stopPropagation();  // Prevent triggering note click
    try {
      await axios.delete(`/notes/${noteId}`);
      const updatedNotes = notes.filter(note => note._id !== noteId);
      setNotes(updatedNotes);  // Update the notes state
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="app-container" style={{margin: 50}}>
      <form className="note-form" onSubmit={(event) => (selectedNote ? handleUpdateNote(event) : handleAddNote(event))}>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Content"
          rows={10}
          required
        />

        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Add Note</button>
        )}
      </form>

      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note._id} className="note-item" onClick={() => handleNoteClick(note)}>
            <div className="notes-header">
              <button onClick={(event) => deleteNote(event, note._id)}>x</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default notesPage;
