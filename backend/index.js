const express = require("express");
require('dotenv').config()
const cors = require("cors");

const notesRouter = require('./src/routes/CRUDRoutes.js');
const app = express();

app.use(express.json());
app.use(cors());

app.use("/", notesRouter);

app.listen(5000, () => {
  console.log("server running on localhost:5000");
});