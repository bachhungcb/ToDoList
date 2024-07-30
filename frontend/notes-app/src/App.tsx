import { get } from "http";
import "./App.css";
import { useEffect, useState } from "react";


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
  const [date, setDate] = useState(getDate());
  const [notes, setNotes] = useState<Note[]>([]);
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
          }),
        }
      );

      const updatedNote = await response.json();
      console.log(updatedNote);
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
              <p className="notes-date">{date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;