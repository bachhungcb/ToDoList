const express = require("express");
const cors = require("cors");

const { connectToDatabase } = require('./src/config/databaseConfig.js');
const notesRouter = require('./src/routes/CRUDRoutes.js');
const getNotesRouter = require('./src/routes/getNotesRoutes.js');
const PORT = process.env.PORT || 5000;

const app = express();


app.use(express.json());
app.use(cors());

app.use("/", notesRouter);
app.use("/app", getNotesRouter);


const startServer = async () => {
  await connectToDatabase(); // Connect to MongoDB before starting the server
  app.listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`);
  });
};

startServer();

process.on('SIGINT', async () => {
  await client.close();
  console.log("MongoDB connection closed due to app termination");
  process.exit(0);
});
