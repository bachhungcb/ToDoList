const client = require('./src/config/databaseConfig.js');

const dbName = 'List';

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const db = client.db(dbName);
    const collection = db.collection('ToDoList');
    await collection.insertOne({ title: 'Jackie Robinson' });
    console.log("Inserted a document into the ToDoList collection.");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
