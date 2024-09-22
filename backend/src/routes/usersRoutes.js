/*--------------INIT SETTING------------ */
const express = require("express");
const users = require('../controller/usersController');
const delay = require("../middleware/delay");
const users_routes = express.Router();

/*--------------CODE HERE------------ */
users_routes.all('*', delay);

users_routes.post("/register", users.registerUsers);
users_routes.post("/login", users.loginUsers);
users_routes.get("/user", users.getUsers);


module.exports = users_routes;
