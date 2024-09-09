const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

// Connect to MongoDB using Mongoose
const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,  // Timeout after 5s instead of 30s
    });
    console.log("Connected successfully to MongoDB server");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit the process if connection fails
  }
};

// Example Mongoose Schema and Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, default: 18 },
}, {
  timestamps: true,  // Automatically create `createdAt` and `updatedAt`
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

module.exports = { connectToDatabase, User };
