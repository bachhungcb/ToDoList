/* --------------INIT SETTINGS----------------- */
const express = require("express");

const cors = require("cors");

const { getDb } = require('../config/databaseConfig.js');
const app = express();
const Notes = require('../model/notes.model.js');
const {createNotesService, deleteNotesService, updateNotesService} = require('../services/notesService.js');

app.use(express.json());
app.use(cors());
/* --------------INIT SETTINGS----------------- */

/* --------------CREATE NOTE----------------- */

const createNote = async (req,res) => {//post
  const { title, content, Date: datestring, id } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Please provide title and content" });
  }
  try {
    const response = await createNotesService(title, content, datestring, id);
    if(response){
      return res.status(200).json(response);
    }else{
      return res.status(400).send("Error");
    }
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
}

const getNotes = async (req, res) =>{//get
    let result = [];
    try{
      const userId =  req.params.id; //this will return userId
      result = await Notes.find({userId: userId}); 
      if(result){
        return res.status(200).send(result);
      }else{
        return res.status(400).send("Error");
      }
    }catch(err){
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }
}

const deleteNotes = async (req, res) => {
  const id = req.params.id;
  let result;
  try {
    result = await deleteNotesService(id);
    if (result) {
      return res.status(200).send(`Deleted: ${result}`);
    } else {
      return res.status(400).send("Error");
    }
  } catch (err) {
    console.log(err);
    return res.status(404).send("Not Found");
  }
};


const updateNote = async (req, res) => {
  const id = req.params.id;
  const { title, content, date: dateString } = req.body;
  try {
    const updatedNote = await updateNotesService(id, title, content, dateString);
    if (!updatedNote) {
      return res.status(404).send("Note not found");
    }
    res.status(200).json(updatedNote);
  } catch (err) {
    console.error("Error updating note:", err);
    return res.status(500).send("Internal Server Error");
  }
};

const getNotesFromDay = async (req, res) => {
  const { date: datestring } = req.query;
  const startTime = new Date(datestring);
  startTime.setHours(0, 0, 0, 0);

  const endTime = new Date(datestring);
  endTime.setHours(23, 59, 59, 999);

  try {
    const db = getDb();
    const collection = db.collection('ToDoList');
    const response = await collection.find({
      "Date": {
        $gte: startTime,
        $lt: endTime
      }
    }).toArray();
    return res.status(200).send(response);
  } catch (err) {
    console.error("Error fetching notes:", err);
    return res.status(500).send(err);
  }
};


module.exports ={
    createNote: createNote,
    getNotes: getNotes,
    deleteNotes: deleteNotes,
    updateNote: updateNote,
    todayNote: getNotesFromDay,
}
