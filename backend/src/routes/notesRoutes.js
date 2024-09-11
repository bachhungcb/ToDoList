//Routes for CRUD here
/*--------------INIT SETTING------------ */
const express = require("express");
const addNotes = require('../controller/notesController.js');
const notes_router = express.Router();

/*--------------CODE HERE------------ */
notes_router.post("/", addNotes.createNote);//kho noi
notes_router.get("/", addNotes.getNotes);
notes_router.delete("/:id", addNotes.deleteNotes);
notes_router.put("/:id", addNotes.updateNote);

//notes_router.get("/today", )

module.exports = notes_router;
