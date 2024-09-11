/* --------------INIT SETTINGS----------------- */
const express = require("express");
require('dotenv').config()
const cors = require("cors");
const { registerUsersService } = require("../services/usersService.js");

const app = express();
app.use(express.json());
app.use(cors());
/* --------------INIT SETTINGS----------------- */

/*--------------CODE HERE------------ */

const registerUsers = async (req,res) =>{

    const {Name, Email, Password} = req.body;
    try{
        const data = await registerUsersService(Name, Email, Password);
        if (!data){
            return res.status(400).send("Error");
        }
        return res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }

}

module.exports = {
    registerUsers
};
