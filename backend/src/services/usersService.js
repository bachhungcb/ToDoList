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
        return null;
    }
}

const loginUsersService = async (email, password) =>{
    try{
        //fetch user by email
        const user = await Users.findOne({email: email});
        if(user){
            //compare password
            const isMatchedPassword = await bcrypt.compare(
                password, user.password
            )
            if(!isMatchedPassword){
                return{
                    EC: 2,
                    EM: "Email/Password không hợp lệ"
                }
            }else{
                //create an access token 
                return "create an access token";
            }
        }else{
            return {
                EC: 1,
                EM: "Email/Password không hợp lệ"
            }
        }
    }catch(err){
        console.log(err);
        return null;
    }
}

module.exports ={
    registerUsersService,
    loginUsersService
}
