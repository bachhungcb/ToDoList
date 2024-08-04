/* --------------INIT SETTINGS----------------- */
const express = require("express");
require('dotenv').config()
const cors = require("cors");
const { ObjectId } = require("mongodb");

const { getDb } = require('../config/databaseConfig.js');


const app = express();
app.use(express.json());
app.use(cors());
/* --------------INIT SETTINGS----------------- */

/* --------------CODE HERE----------------- */
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
  

module.exports = {
    getNotesFromDay: getNotesFromDay
}