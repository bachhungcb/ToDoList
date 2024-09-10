let mongoose = require('mongoose');

let notesSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: {
        type: Date,
        default: Date.now(),
    }
})

const Notes = mongoose.model('notes', notesSchema);

module.exports = Notes;
