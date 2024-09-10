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

const updateNotesService = async (id, title, content, date) =>{
    inputedDate = date? date: Date.now();
    try{   
        const result = await Notes.findByIdAndUpdate(id, {
            title: title, 
            content: content,
            date: inputedDate
        })
        return result;

    }catch(err){
        console.log(err);
    }
}

module.exports = {
    createNotesService,
    deleteNotesService,
    updateNotesService
}