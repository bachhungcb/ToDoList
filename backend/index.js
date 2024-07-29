const express = require("express");
require('dotenv').config()
const cors = require("cors");
const client = require('./src/config/databaseConfig.js');
const { ObjectId } = require("mongodb");

const dbName = process.env.DB_NAME;
const db = client.db(dbName);
const addNotes = require('./src/controller/CRUDNotesController.js');

const app = express();

app.use(express.json());
app.use(cors());


app.post("/api/notes", addNotes.createNote);//kho noi
app.get("/api/notes", addNotes.getNotes);
app.delete("/api/notes/:id", addNotes.deleteNotes);

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