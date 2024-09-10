/* --------------INIT SETTINGS----------------- */
const express = require("express");
require('dotenv').config()
const cors = require("cors");
const { createUsersService } = require("../services/usersService.js");

const app = express();
app.use(express.json());
app.use(cors());
/* --------------INIT SETTINGS----------------- */

/*--------------CODE HERE------------ */

const registerUsers = async (req,res) =>{

    const {Name, Email, Password} = req.body;
    const data = await createUsersService(Name, Email, Password);
    return res.status(200).json(data);

}

module.exports = {
    registerUsers
};
