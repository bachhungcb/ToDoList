let mongoose = require('mongoose');

let usersSchema = new mongoose.Schema({
    name: String,
    email: String, 
    password: String,
    role: String
})
const Users = mongoose.model('Users', usersSchema)

module.exports = Users;
