const Users = require("../model/users.model");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const registerUsersService = async (name, email, password) =>{
    try{
        const usersExist = await Users.findOne({email: email});
        if(usersExist){
            return {exists: true };
        }else{
            const hashPassword = await bcrypt.hash(password, saltRounds);
            let result = await Users.create({
                name: name,
                email: email,
                password: hashPassword,
                role: "user"
            })
    
            return result;
        }
    }catch(err){
        console.log(err.code);
        return null;
    }
}

module.exports ={
    registerUsersService,
}
