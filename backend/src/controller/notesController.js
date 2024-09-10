/* --------------INIT SETTINGS----------------- */
const express = require("express");

const cors = require("cors");
const { ObjectId } = require("mongodb");
const { getDb } = require('../config/databaseConfig.js');
const app = express();
const Notes = require('../model/notes.model.js');
const {createNotesService, deleteNotesService} = require('../services/notesService.js');

app.use(express.json());
app.use(cors());
/* --------------INIT SETTINGS----------------- */

/* --------------CREATE NOTE----------------- */

const createNote = async (req,res) => {//post
  const { Title, Content, Date: datestring } = req.body;
  if (!Title || !Content) {
    return res.status(400).json({ message: "Please provide Title and Content" });
  }
  try {
    const response = await createNotesService(Title, Content, datestring);
    // Fetch the newly added note using the insertedId
    //const newNote = await collection.findOne({ _id: response.insertedId });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
}

const getNotes = async (req, res) =>{//get
    let result = [];
    try{
      result = await Notes.find({});
    }catch(err){
      console.log(err);
    }
    res.status(200).send(result);
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


const updateNote = async (req,res)=>{//put
    const id = req.params.id;
    const {Title, Content, Date: datestring} = req.body;
    let date = new Date(datestring);
    try{
      const db = getDb();
      const collection = db.collection('ToDoList');
      const updatedNote = await collection.updateOne( {"_id": ObjectId(id)}, 
                                  {$set: {Title: Title, Content: Content, Date: date}});
      const newlyUpdatedNote = await collection.findOne({"_id": ObjectId(id)});
      res.status(200).json(newlyUpdatedNote);
    }catch(err){
      console.log(err)
      res.send(404).send("Not Found");
    }
}

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
    res.status(200).send(response);
  } catch (err) {
    console.error("Error fetching notes:", err);
    res.status(500).send(err);
  }
};


module.exports ={
    createNote: createNote,
    getNotes: getNotes,
    deleteNotes: deleteNotes,
    updateNote: updateNote,
    todayNote: getNotesFromDay,
}
