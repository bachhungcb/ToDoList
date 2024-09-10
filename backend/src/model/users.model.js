let mongoose = require('mongoose');

let usersSchema = new mongoose.Schema({
    name: String,
    email: String, 
    password: String,
    role: String
});

const Users = mongoose.model('users', usersSchema)

module.exports = Users;
