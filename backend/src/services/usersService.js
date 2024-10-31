const Users = require("../model/users.model");
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const saltRounds = 10;
require('dotenv').config();

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
                const payload = { //payload for access token
                    email: user.email,
                    name: user.name,
                    _id: user._id.toString(), //convert userId from ObjectId to String
                    role: user.role
                }
                //create an access token 
                const access_token = jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRE
                    }
                );
                return{ 
                EC: 0,
                access_token,
                user:{ //return req.user
                    email: user.email,
                    name: user.name,
                    _id: user._id.toString(),
                    role: user.role
                }};
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

const getUsersService = async (role) =>{
    try{
        if(role == 'admin'){
            const result = await Users.find({}).select("-password");
            return result;
        }else{
            return{
                EC: 3,
                EM: "User can not access this function"
            }
        }
    }catch(err){
        console.log(err);
        return null;
    }
}

module.exports ={
    registerUsersService,
    loginUsersService,
    getUsersService
}
