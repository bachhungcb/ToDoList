const express = require("express");
const cors = require("cors");

const notesRouter = require('./src/routes/CRUDRoutes.js');
const getNotesRouter = require('./src/routes/getNotesRoutes.js');
const app = express();

app.use(express.json());
app.use(cors());

app.use("/", notesRouter);
app.use("/app", getNotesRouter);

app.listen(5000, () => {
  console.log("server running on localhost:5000");
});