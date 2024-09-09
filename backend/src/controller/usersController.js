/* --------------INIT SETTINGS----------------- */
const express = require("express");
require('dotenv').config()
const cors = require("cors");
const { ObjectId } = require("mongodb");
const { getDb } = require('../config/databaseConfig.js');
const { createUsersService } = require("../services/usersService.js");

const app = express();
app.use(express.json());
app.use(cors());
/* --------------INIT SETTINGS----------------- */

/*--------------CODE HERE------------ */

const registerUsers = async (req,res) =>{

    console.log(">>check req: ", typeof(req.body));
    const {Name, Email, Password} = req.body;
    const data = await createUsersService(Name, Email, Password);

    console.log(data);
    return res.status(200).json(data);

}

module.exports = {
    registerUsers
};
