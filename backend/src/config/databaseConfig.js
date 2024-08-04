const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;

const connectToDatabase = async () => {
  try {
    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log("Connected successfully to MongoDB server");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit the process if connection fails
  }
};

const getDb = () => {
  if (!db) {
    throw new Error("Database not connected");
  }
  return db;
};

module.exports = { connectToDatabase, getDb };
