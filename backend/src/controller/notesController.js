/* --------------INIT SETTINGS----------------- */
const express = require("express");
require('dotenv').config()
const cors = require("cors");
const { ObjectId } = require("mongodb");
const { getDb } = require('../config/databaseConfig.js');
const app = express();
const Notes = require('../model/notes.model.js');

app.use(express.json());
app.use(cors());
/* --------------INIT SETTINGS----------------- */

/* --------------CREATE NOTE----------------- */

const createNote = async (req,res) => {//post
  const { Title, Content, Date: datestring } = req.body;
  let date = new Date(datestring);
  if (!Title || !Content) {
    return res.status(400).json({ message: "Please provide Title and Content" });
  }
  try {
    const db = getDb();
    const collection = db.collection('ToDoList');
    const response = await collection.insertOne({ Title: Title, 
                                                  Content: Content,   
                                                  Date: date
                                                });
    
    // Fetch the newly added note using the insertedId
    const newNote = await collection.findOne({ _id: response.insertedId });
    res.status(200).json(newNote);
  } catch (err) {
    res.status(500).send(err);
  }
}

const getNotes = async (req, res) =>{//get
    let result = [];
    // try {
    //   // Connect the client to the server	(optional starting in v4.7)
    //   const db = getDb();

    //   const collection = db.collection('ToDoList');
    //   result = await collection.find( {}, {}).toArray();
    // }catch(err){
    //   console.log(err);
    // }
    try{
      result = await Notes.find({});
    }catch(err){
      console.log(err);
    }
    res.status(200).send(result);
}

const deleteNotes = async (req,res) => {//delete
    const id = req.params.id;
    
    try{
      const db = getDb();
      
      const collection = db.collection('ToDoList');
      await collection.deleteOne( {"_id": ObjectId(id)});
    }catch(err){
      console.log(err)
      res.send(404).send("Not Found");
    }
  
    res.status(200).send("OK");
}

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
