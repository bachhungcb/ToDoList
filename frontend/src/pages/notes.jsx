import React, { useContext } from "react";
import "../styles/notes.css";
import { useState, useEffect } from "react";
import axios from '../util/axios.customize';
import { AuthContext } from "../components/context/auth.context";
import { DatePicker, Space } from 'antd';



/*
  const notes ={
    _id: ObjectId,
    title: String,
    content: String,
    date: {
        type: Date,
        default: Date.now(),
    },
    userId: String,
  }
*/

const notesPage = () => {
  const {auth} = useContext(AuthContext);//get userInformation
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  // Fetch notes on initial load
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
                        `/notes/${auth.user._id}`
                      );
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
      const id = auth.user._id;
      const response = await axios.post("/notes", {
        title,
        content,
        id,
        date //add date with notes
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
        date
      });
      const updatedNote = response;

      setNotes(prevNotes => prevNotes.map(note => 
        note._id === selectedNote._id ? updatedNote : note
      ));
      
      setTitle("");
      setContent("");
      setSelectedNote(null);
      setDate(null);
    } catch (err) {
      console.log(err);
    }
  };

  // Cancel editing a note
  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote("");
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

  //handle datepicker
  const onChange = (date, dateString) => {
    setDate(date);
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
        <DatePicker 
          value={date}
          onChange={onChange} //(event) => setDate(event.target.value)
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

            <div className="notes-body">
              <h2>{note.title}</h2>
              <p className="notes-content">{note.content}</p>
            </div>

            <div className="notes-footer">
              <p className="notes-date">{new Date(note.date).toLocaleDateString()}</p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default notesPage;
