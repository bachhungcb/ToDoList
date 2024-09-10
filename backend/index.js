const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');

const notesRouter = require('./src/routes/CRUDRoutes.js');
const getNotesRouter = require('./src/routes/getNotesRoutes.js');
const usersRoutes = require('./src/routes/usersRoutes.js');
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/", notesRouter);
app.use("/app", getNotesRouter);
app.use("/users", usersRoutes)


mongoose.connect(process.env.MONGODB_URI,{
  dbName: process.env.DB_NAME
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.listen(PORT, () => {
      console.log(`Server running on localhost:${PORT}`);
});
