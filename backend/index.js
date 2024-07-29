const express = require("express");
require('dotenv').config()
const cors = require("cors");
const client = require('./src/config/databaseConfig.js');
const { ObjectId } = require("mongodb");

const dbName = process.env.DB_NAME;
const db = client.db(dbName);

const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/notes", async (req, res) => {//them moi mot notes
  const { Title, Content } = req.body;

  if (!Title || !Content) {
    return res.status(400).json({ message: "Please provide Title and Content" });
  }

  try {
    await client.connect();
    const collection = db.collection('ToDoList');
    const response = await collection.insertOne({ Title, Content });
    
    // Fetch the newly added note using the insertedId
    const newNote = await collection.findOne({ _id: response.insertedId });
    res.json(newNote);
  } catch (err) {
    res.status(500).send("Oops, something went wrong");
  } finally {
    await client.close();
  }
});



app.get("/api/notes", async (req, res) => { //lay cac notes co san tren db
    let result = [];
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();

      const collection = db.collection('ToDoList');
      result = await collection.find( {}, {}).toArray();
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }

    res.status(200).send(result);
});


app.delete("/api/notes/:id", async (req,res)=>{ //xoa mot notes
  const id = req.params.id;
  

  try{
    await client.connect();
    
    const collection = db.collection('ToDoList');
    await collection.deleteOne( {"_id": ObjectId(id)});
  }catch(err){
    console.log(err)
    res.send(404).send("Not Found");
  }finally{
    await client.close();
  }

  res.status(200).send("OK");
});

app.put("/api/notes/:id", async (req,res)=>{ //thay doi noi dung mot notes 
  const id = req.params.id;
  const {Title, Content} = req.body;

  try{
    await client.connect();
    const collection = db.collection('ToDoList');
    const updatedNote = await collection.updateOne( {"_id": ObjectId(id)}, 
                                {$set: {Title: Title, Content: Content}});
    const newlyUpdatedNote = await collection.findOne({"_id": ObjectId(id)});
    res.json(newlyUpdatedNote);
  }catch(err){
    console.log(err)
    res.send(404).send("Not Found");
  }finally{
    await client.close();
  }

})

app.listen(5000, () => {
  console.log("server running on localhost:5000");
});