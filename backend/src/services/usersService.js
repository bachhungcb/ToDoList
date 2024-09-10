const Users = require("../model/users.model");

const createUsersService = async (name, email, password) =>{
    try{
        let result = await Users.create({
            name: name,
            email: email,
            password: password,
            role: "admin"
        })

        return result;
    }catch(err){
        console.log(err);
        return null;
    }
}

module.exports ={
    createUsersService,
}
