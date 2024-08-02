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
const getNotesFromDay = async (req,res)=>{
    const date = new Date();

    try{

    }catch(err){
        res.status(500).send("Oops, something went wrong");
    }finally{
        await client.close();
    }
}