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


/* --------------GET NOTE----------------- */
const getNotesFromDay = async (req, res) => {
    // Get the current date in ISO string format and extract the date part
    const {Date: datestring} = req.body;
    let date = datestring;


    const startTime = new Date(date);
    startTime.setHours(0,0,0,0);


    const endTime = new Date(date);
    endTime.setHours(23,59,59,999);

    try {
        await client.connect();
        const collection = db.collection('ToDoList');
        const response = await collection
            .find({
                "Date": { 
                    $gte: startTime, 
                    $lt: endTime 
                }
            }).toArray(); 
        res.status(200).send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    } finally {
        await client.close();
    }
};


module.exports = {
    getNotesFromDay: getNotesFromDay
}