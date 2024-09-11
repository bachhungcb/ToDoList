const Users = require("../model/users.model");

const registerUsersService = async (name, email, password) =>{
    try{
        let result = await Users.create({
            name: name,
            email: email,
            password: password,
            role: "user"
        })

        return result;
    }catch(err){
        console.log(err);
        return null;
    }
}

module.exports ={
    registerUsersService,
}
