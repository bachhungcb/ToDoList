//Routes for CRUD here
/*--------------INIT SETTING------------ */
const express = require("express");
const addNotes = require('../controller/CRUDNotesController.js');
const notes_router = express.Router();

/*--------------CODE HERE------------ */
notes_router.post("/api/notes", addNotes.createNote);//kho noi
notes_router.get("/api/notes", addNotes.getNotes);
notes_router.delete("/api/notes/:id", addNotes.deleteNotes);
notes_router.put("/api/notes/:id", addNotes.updateNote);

module.exports = notes_router;