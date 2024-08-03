import { get } from "http";
import "../css/Today.css";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { set } from "react-datepicker/dist/date_utils";

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

const Today = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
       
        const fetchNotes = async() =>{
          setIsLoading(true);
          try{
            const date = new Date().toISOString();
            const response = await fetch(`http://localhost:5000/app/today?date=${encodeURIComponent(date)}`,
                                    {
                                        method: 'GET',
                                        headers: {'Content-Type':'application/json'}
                                    }
            ); //lay data tu BE, default method la GET
            const notes: Note[] = await response.json();
            setNotes(notes);
          }catch(err){
            console.log(err);
          }
        }
    
        fetchNotes();
        setIsLoading(false);
      },[]); //Lastly, add an empty dependency array 
             //to ensure that this code only runs once when 
             //the component is first mounted:

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

    return(
        <div className="app-container">
                  <div className="notes-grid">
        {isLoading ? <div className="loading">Loading...</div> : null}
        {notes.map((note, index) => (
            <div key={note._id} className="notes-item">
              <div className="notes-header">
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
}

export default Today;
