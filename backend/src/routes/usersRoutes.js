/*--------------INIT SETTING------------ */
const express = require("express");
const users = require('../controller/usersController');
const users_routes = express.Router();

/*--------------CODE HERE------------ */

users_routes.post("/register", users.registerUsers);

module.exports = users_routes;
