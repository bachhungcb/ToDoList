const { ObjectId } = require('mongodb');
const Notes = require('../model/notes.model');

const createNotesService = async(title, content, date) => {
    try{
        let result = await Notes.create({
            title: title,
            content: content,
            date: date
        })

        return result;
    }catch(err){
        console.log(err);
        return null;
    }
}

const deleteNotesService = async (id) =>{
    try{
        const result = await Notes.findByIdAndDelete(id);
        return result;
    }catch(err){
        console.log(err);
        return null;
    }
}

const updateNotesService = async (id, title, content, date) => {
    const inputDate = date ? new Date(date) : new Date();
    try {   
      const result = await Notes.findByIdAndUpdate(
        id, 
        {
          title: title, 
          content: content,
          date: inputDate
        },
        { new: true, runValidators: true }
      );
      
      if (!result) {
        throw new Error("Note not found");
      }
      
      return result;
    } catch (err) {
      console.error("Error in updateNotesService:", err);
      throw err;
    }
  };

module.exports = {
    createNotesService,
    deleteNotesService,
    updateNotesService
}