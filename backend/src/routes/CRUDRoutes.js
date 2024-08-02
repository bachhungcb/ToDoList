//Routes for CRUD here
/*--------------INIT SETTING------------ */
const express = require("express");
const addNotes = require('../controller/CRUDNotesController.js');
const notes_router = express.Router();

/*--------------CODE HERE------------ */
notes_router.post("/app/notes", addNotes.createNote);//kho noi
notes_router.get("/app/notes", addNotes.getNotes);
notes_router.delete("/app/notes/:id", addNotes.deleteNotes);
notes_router.put("/app/notes/:id", addNotes.updateNote);

module.exports = notes_router;