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

module.exports = {
    createNotesService
}