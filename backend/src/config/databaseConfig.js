const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

// Array to map connection states
const dbState = [
  { value: 0, label: "disconnected" },
  { value: 1, label: "connected" },
  { value: 2, label: "connecting" },
  { value: 3, label: "disconnecting" }
];

const connection = async () => {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(uri, {
      dbName: process.env.DB_NAME,  // Specify the database name
    });
    const state = Number(mongoose.connection.readyState);
    console.log(dbState.find(f => f.value === state).label, "to database"); // connected to db
  }
  catch (err) {
    console.log("Error connecting to the database:", err);
  }
};

module.exports = connection;
