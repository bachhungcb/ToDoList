import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import axios from 'axios';


const App = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () =>{
      try{
        const response = await axios.get("http://localhost:5000/notes");
        const notes =response.data;
        setNotes(notes);
      }catch(err){
        console.log(err)
      }
    }
    fetchNotes();
  }, []);

  const handleAddNote = async (event) => {
    try{
      const newNote = await
      setNotes([newNote, ...notes]);
      setTitle("");
      setContent("");
      const response = await fetch(
        "http://localhost:5000/notes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
          }),
        }
      );
    }catch(err){  
      console.log(err);
    }
  };

  const [selectedNote, setSelectedNote] = useState(null);

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleUpdateNote = (event) => {
    event.preventDefault();
  
    if (!selectedNote) {
      return;
    }
  
    const updatedNote = {
      id: selectedNote.id,
      title: title,
      content: content,
    };
  
    const updatedNotesList = notes.map((note) => (note.id === selectedNote.id ? updatedNote : note));
  
    setNotes(updatedNotesList);
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const deleteNote = (event, noteId) => {
    event.stopPropagation();
  
    const updatedNotes = notes.filter((note) => note.id !== noteId);
  
    setNotes(updatedNotes);
  };

  return (
    <div className="app-container">
      <form className="note-form"
        onSubmit={(event) => (selectedNote ? handleUpdateNote(event) : handleAddNote(event))}>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          required>
        </input>
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Content"
          rows={10}
          required>
        </textarea>

        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Add Note</button>
        )}
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note.id} className="note-item" onClick={() => handleNoteClick(note)}>
          <div className="notes-header">
            <button onClick={(event) => deleteNote(event, note.id)}>x</button>
          </div>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </div>
        ))}
      </div>
    </div>
  );
};

export default App;