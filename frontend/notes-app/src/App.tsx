import { get } from "http";
import "./App.css";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


interface Note {
  _id: number;
  Title: string;  // phai match voi DB
  Content: string;// phai match voi DB
  Date: Date;
}

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${date}/${month}/${year}`;
}


const App = () => {
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [notes, setNotes] = useState<Note[]>([]);
  const date = new Date();
  useEffect(() => {

    const fetchNotes = async() =>{
      try{
        const response = await fetch("http://localhost:5000/api/notes"); //lay data tu BE, default method la GET
        
        const notes: Note[] = await response.json();
        setNotes(notes);
      }catch(err){
        console.log(err);
      }
    }

    fetchNotes();
  },[]); //Lastly, add an empty dependency array 
         //to ensure that this code only runs once when 
         //the component is first mounted:
  


  const handleAddNote = async (event: React.FormEvent) => {

    try{
      event.preventDefault();
      const response = await fetch(
        "http://localhost:5000/api/notes",
        {
          method:"POST",
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            Title,
            Content,
            Date: startDate,
          }),
        }
      );
      
      const newNote = await response.json();

      setNotes([newNote, ...notes]);
      setTitle("");
      setContent("");
    }catch(err){
      console.log(err);
    }

  }

  const  [selectedNote, setSelectedNote] = useState<Note | null >(null);
  const handleNoteClick = (note: Note) =>{
    setSelectedNote(note);
    setTitle(note.Title);
    setContent(note.Content);
  }

  const handleUpdateNote = async (event: React.FormEvent) =>{
    event.preventDefault();

    if(!selectedNote){
      return;
    }

    const id = selectedNote._id;
    try{
      const response = await fetch(
        `http://localhost:5000/api/notes/${id}`, 
        {
          method: "PUT",
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            Title,
            Content,
            Date: startDate,
          }),
        }
      );

      const updatedNote = await response.json();

      const updatedNotesList = notes.map((note) => (note._id === id ? updatedNote : note));

      setNotes(updatedNotesList);
      setTitle("");
      setContent("");

    } catch(err){
      console.log(err);
    }   

  }

  const handleCancel = () =>{
    setTitle("");
    setContent("");
    setSelectedNote(null);
  }

  const deleteNote = async (
    event: React.MouseEvent,
    noteId: number
  ) => {
    event.stopPropagation();

    try {
      await fetch(
        `http://localhost:5000/api/notes/${noteId}`,
        {
          method: "DELETE",
        }
      );
      const updatedNotes = notes.filter(
        (note) => note._id !== noteId
      );

      setNotes(updatedNotes);
    } catch (e) {
      console.log(e);
    }
  };


  
  return (
    <div className="app-container">
      <form onSubmit={(event) => 
                      {selectedNote? handleUpdateNote(event) : handleAddNote(event)}}
            className="note-form">
        <input
            value={Title}
            onChange={(event) => setTitle(event.target.value)}        
            placeholder="Title" 
            required>
        </input>
        <textarea
          value={Content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Content" 
          rows={10} required>
        </textarea>

        <DatePicker
          showIcon
          selected={startDate} 
          onChange={date => date && setStartDate(date)} 
          showTimeSelect
          dateFormat="Pp"
        />

        {selectedNote ? (
          <div className="edit-button">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Add Note</button>
        )}
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note._id} className="notes-item" onClick={() => handleNoteClick(note)}>
            <div className="notes-header">
              <button onClick={(event)=>deleteNote(event, note._id)}>x</button>
            </div>

            <div>
              <h2>{note.Title}</h2>
              <p className="notes-content">{note.Content}</p>
            </div>

            <div>
              <p className="notes-date">
                  {/* {new Intl.DateTimeFormat('en-US', { year: 'numeric',
                                                      month: '2-digit',
                                                      day: '2-digit', 
                                                      hour: '2-digit', 
                                                      minute: '2-digit', 
                                                      second: '2-digit'})
                  .format(note.Date)} */}
                  {note.Date? new Date(note.Date).toLocaleDateString() : getDate()}
                </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;