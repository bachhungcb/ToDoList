import "../css/Inbox.css";
import { useEffect, useState, useRef } from "react";
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


const Inbox = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [notes, setNotes] = useState<Note[]>([]);
  useEffect(() => {

    const fetchNotes = async() =>{
      setIsLoading(true);

      try{
        
        const response = await fetch(
                                "http://localhost:5000/app/notes",
                                ); //lay data tu BE, default method la GET
        
        const notes: Note[] = await response.json();
        setNotes(notes);
      }catch(err){
        console.log(err);
      }finally{
        setIsLoading(false);
      }
    }

    fetchNotes();

  },[]); //Lastly, add an empty dependency array 
         //to ensure that this code only runs once when 
         //the component is first mounted:
  


  const handleAddNote = async (event: React.FormEvent) => {
    setIsLoading(true);
    try{
      event.preventDefault();
      const response = await fetch(
        "http://localhost:5000/app/notes",
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
      setIsLoading(false);
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
    setIsLoading(true);
    event.preventDefault();

    if(!selectedNote){
      return;
    }

    const id = selectedNote._id;
    try{
      const response = await fetch(
        `http://localhost:5000/app/notes/${id}`, 
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
      setSelectedNote(null);
    } catch(err){
      console.log(err);
    }   
    setIsLoading(false);
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
    setIsLoading(true);

    try {
      await fetch(
        `http://localhost:5000/app/notes/${noteId}`,
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
    setIsLoading(false);
  };

  function moveTaskUp(index: any){
    console.log(index);
    if(index > 0){
      const temp = notes[index];
      notes[index] = notes[index - 1];
      notes[index - 1] = temp;
      setNotes([...notes]);
    }
  }

  function moveTaskDown(index: any){
    console.log(index);
    if(index >= 0){
      const temp = notes[index];
      notes[index] = notes[index + 1];
      notes[index + 1] = temp;
      setNotes([...notes]);
    }
  }
  
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
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Add Note</button>
        )}
      </form>
      <div className="notes-grid">
        {isLoading ? <div className="loading">Loading...</div> : null}
        {notes.map((note, index) => (
            <div key={note._id} className="notes-item">
              <div className="notes-header">
                <button className="change-buttons" onClick={() => handleNoteClick(note)}>📝</button>
                <button className="move-buttons" onClick={() => moveTaskUp(index)} >⬅️</button>
                <button className="move-buttons" onClick={() => moveTaskDown(index)}>➡️</button>
                <button className="delete-buttons" onClick={(event) => deleteNote(event, note._id)}>❌</button>
              </div>

              <div>
                <h2>{note.Title}</h2>
                <p className="notes-content">{note.Content}</p>
              </div>

              <div className="notes-footer">
                <p className="notes-date">
                  {note.Date ? new Date(note.Date).toLocaleDateString() : getDate()}
                </p>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inbox;