import axios from './axios.customize';

const createUserApi = async (name, email, password) =>{
    try{
        const URL_API = "/users/register";
        const data = {
            name, email, password
        }
        const result = await axios.post(URL_API, data);
        return result;
    }catch(err){
        return err;
    }
}

const loginUserApi = async (email, password) =>{
    try{
        const URL_API = "/users/login";
        const data = {
            email, password
        }
        const result = await axios.post(URL_API, data);
        return result;
    }catch(err){
        return err;
    }
}

const getUserApi = async () =>{
    try{
        const URL_API = "/users/user"; 
        const result = await axios.get(URL_API);
        return result;
    }catch(err){
        console.log(err);
        return null;
    }
}

export {
    createUserApi,
    loginUserApi,
    getUserApi
};