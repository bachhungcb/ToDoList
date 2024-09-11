const express = require("express");
const cors = require("cors");
const app = express();

const connection = require('./src/config/databaseConfig.js');
const notesRouter = require('./src/routes/notesRoutes.js');
const usersRoutes = require('./src/routes/usersRoutes.js');
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/notes", notesRouter);
app.use("/users", usersRoutes);

(async () =>{
  try{
    await connection();

    app.listen(PORT, ()=>{
      console.log(`Backend Nodejs App listening on port ${PORT}`);
    })
  }catch(err){
    console.log(">>Error connect to DB: ", err);
  }
})();
