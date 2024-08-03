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

let connectionCount = 0; // Define a counter variable
/* --------------GET NOTE----------------- */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getNotesFromDay = async (req, res) => {
    // Get the current date in ISO string format and extract the date part
    const {date: datestring} = req.query;
    const startTime = new Date(datestring);
    console.log(datestring);
    startTime.setHours(0,0,0,0);


    const endTime = new Date(datestring);
    endTime.setHours(23,59,59,999);

    try {
        await client.connect();
        connectionCount++; // Increment the counter on each connection
        console.log(`Number of connections made: ${connectionCount}`); // Log the connection count

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
        await client.close();
        res.status(500).send(err);
    } finally {
        await client.close();
        connectionCount = 0
    }
};


module.exports = {
    getNotesFromDay: getNotesFromDay
}