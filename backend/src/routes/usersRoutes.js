/*--------------INIT SETTING------------ */
const express = require("express");
const users = require('../controller/usersController');
const delay = require("../middleware/delay");
const auth = require("../middleware/auth");
const users_routes = express.Router();

/*--------------CODE HERE------------ */
users_routes.use(auth); // applies delay middleware to all routes under users_routes


users_routes.post("/register", users.registerUsers);
users_routes.post("/login", users.loginUsers);
users_routes.get("/user", users.getUsers); //getAllUsers
users_routes.get("/account", delay, users.getAccount); //getAccountInfor

module.exports = users_routes;
