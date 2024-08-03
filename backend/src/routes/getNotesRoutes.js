/*--------------INIT SETTING------------ */
const express = require("express");
const getNotes = require('../controller/getNotesController.js');
const get_notes_router = express.Router();

/*--------------CODE HERE------------ */
get_notes_router.get("/today", getNotes.getNotesFromDay);

module.exports = get_notes_router;