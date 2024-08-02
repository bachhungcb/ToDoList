/* --------------INIT SETTINGS----------------- */
const express = require("express");
require('dotenv').config()
const cors = require("cors");
const client = require('../config/databaseConfig.js');//kho noi
const { ObjectId } = require("mongodb");

const dbName = process.env.DB_NAME;
const db = client.db(dbName);

const app = express();

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

    await client.connect();
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
  } finally {
    await client.close();
  }
}

const getNotes = async (req, res) =>{//get
    let result = [];
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();

      const collection = db.collection('ToDoList');
      result = await collection.find( {}, {}).toArray();
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }

    res.status(200).send(result);
}

const deleteNotes = async (req,res) => {//delete
    const id = req.params.id;
    
    try{
      await client.connect();
      
      const collection = db.collection('ToDoList');
      await collection.deleteOne( {"_id": ObjectId(id)});
    }catch(err){
      console.log(err)
      res.send(404).send("Not Found");
    }finally{
      await client.close();
    }
  
    res.status(200).send("OK");
}

const updateNote = async (req,res)=>{//put
    const id = req.params.id;
    const {Title, Content, Date: datestring} = req.body;
    let date = new Date(datestring);
    try{
      await client.connect();
      const collection = db.collection('ToDoList');
      const updatedNote = await collection.updateOne( {"_id": ObjectId(id)}, 
                                  {$set: {Title: Title, Content: Content, Date: date}});
      const newlyUpdatedNote = await collection.findOne({"_id": ObjectId(id)});
      res.status(200).json(newlyUpdatedNote);
    }catch(err){
      console.log(err)
      res.send(404).send("Not Found");
    }finally{
      await client.close();
    }
}

module.exports ={
    createNote: createNote,
    getNotes: getNotes,
    deleteNotes: deleteNotes,
    updateNote: updateNote
}