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

const createNote = async (req,res) => {
    const { Title, Content } = req.body;

  if (!Title || !Content) {
    return res.status(400).json({ message: "Please provide Title and Content" });
  }

  try {
    await client.connect();
    const collection = db.collection('ToDoList');
    const response = await collection.insertOne({ Title, Content });
    
    // Fetch the newly added note using the insertedId
    const newNote = await collection.findOne({ _id: response.insertedId });
    res.json(newNote);
  } catch (err) {
    res.status(500).send("Oops, something went wrong");
  } finally {
    await client.close();
  }
}

module.exports ={
    createNote: createNote
}