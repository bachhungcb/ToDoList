import React from "react";
import "../css/Today.css";
import { useEffect, useState, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";

interface Note {
    _id: number;
    Title: string;  // must match with DB
    Content: string; // must match with DB
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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [notes, setNotes] = useState<Note[]>([]);
    const fetchCountRef = useRef<number>(0); // Ref for counter

    useEffect(() => {
        const fetchNotes = async () => {
            setIsLoading(true);
            fetchCountRef.current++; // Increment counter
            console.log(`fetchNotes has been called ${fetchCountRef.current} times`); // Log counter value

            try {
                const date = new Date().toISOString();
                const response = await fetch(`http://localhost:5000/app/today?date=${date}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
    
                if (!response.ok) {
                    throw new Error(`Network response was not ok. Status: ${response.status}`);
                }
    
                const notes: Note[] = await response.json();
                console.log(notes);
                setNotes(notes);
            } catch (error) {
                if (error instanceof Error) {
                    console.error('Failed to fetch notes:', error.message);
                } else {
                    console.error('Failed to fetch notes:', 'Unknown error');
                }
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchNotes();
    }, []); // Ensure fetchNotes runs only once on component mount

    const moveTaskUp = (index: number) => {
        if (index > 0) {
            const updatedNotes = [...notes];
            const temp = updatedNotes[index];
            updatedNotes[index] = updatedNotes[index - 1];
            updatedNotes[index - 1] = temp;
            setNotes(updatedNotes);
        }
    };

    const moveTaskDown = (index: number) => {
        if (index >= 0 && index < notes.length - 1) {
            const updatedNotes = [...notes];
            const temp = updatedNotes[index];
            updatedNotes[index] = updatedNotes[index + 1];
            updatedNotes[index + 1] = temp;
            setNotes(updatedNotes);
        }
    };

    return (
        <div className="app-container">
            <div className="notes-grid">
                {isLoading ? <div className="loading">Loading...</div> : null}
                {notes.filter(note => note !== null && note !== undefined).map((note, index) => (
                    <div key={note._id} className="notes-item">
                        <div className="notes-header">
                            {/* Optionally add buttons or other controls here */}
                        </div>
    
                        <div>
                            <h2>{note.Title}</h2>
                            <p className="notes-content">{note.Content}</p>
                        </div>
    
                        <div className="notes-footer">
                            <p className="notes-date">
                                {note.Date ? new Date(note.Date).toLocaleDateString() : getDate()}
                            </p>
                            <button onClick={() => moveTaskUp(index)}>Move Up</button>
                            <button onClick={() => moveTaskDown(index)}>Move Down</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Today;
