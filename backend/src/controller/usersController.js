/* --------------INIT SETTINGS----------------- */
const express = require("express");
require('dotenv').config()
const cors = require("cors");
const { registerUsersService, loginUsersService, getUsersService } = require("../services/usersService.js");

const app = express();
app.use(express.json());
app.use(cors());
/* --------------INIT SETTINGS----------------- */

/*--------------CODE HERE------------ */

const registerUsers = async (req,res) =>{

    const {name, email, password} = req.body;
    try{
        const data = await registerUsersService(name, email, password);
        if (!data){
            return res.status(400).send("Error");
        }
        
        if(data.exists){
            return res.status(409).send("Conflict");
        }
        return res.status(200).json(data);
    }catch(err){
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }

}

const loginUsers = async (req, res) =>{
    const {email, password} = req.body;
    const data = await loginUsersService(email,password);
    return res.status(200).json(data);
}

const getUsers = async (req,res) =>{
    const user = req.user;
    const data = await getUsersService(user.role);
    if(data.EC != 3){
        return res.status(200).json(data);
    }else{
        return res.status(400).json(data);
    }
}

const getAccount = async (req,res) =>{
    const result = req.user;
    return res.status(200).json(result);
}

module.exports = {
    registerUsers,
    loginUsers,
    getUsers,
    getAccount
};
