require("dotenv").config();
const jwt = require ("jsonwebtoken");

const auth = (req,res,next)=>{
    const white_list = ["/", "/register", "/login"];

    if(white_list.find(item => `/users` + item === req.originalUrl)){
        next();
    }else{
        if(req.headers&&req.headers.authorization){
            const token = req.headers.authorization.split(' ')[1];
            //verify
            try{
                const decoded = jwt.verify(
                                    token,
                                    process.env.JWT_SECRET);
                req.user ={
                    email: decoded.email,
                    name: decoded.name,
                    _id: decoded._id, //get userId from token
                    role: decoded.role,
                    createdBy: "bachdam"
                }
                next();
            }catch(err){
               return res.status(401).json({
                message: "Token bị hết hạn hoặc không hợp lệ"
               })

            }
    
        }else{
            //return exception
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
    }
}

module.exports = auth;
