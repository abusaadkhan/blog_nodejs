//Ans 2 middleware created to check wheater user is authenticated or not 



import config from "../config/config.js";
import asyncHandler from "../service/asyncHandler.js";
import CustomError from "../utils/CustomError.js";
import JWT from 'jsonwebtoken'
import User from "../models/user.schema.js";


export const isLoggedIn = asyncHandler(async(req,res,next)=>{
    let token
    if(req.cookies.token || (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))){
        token = req.cookies.token || req.headers.authorization.split(' ')[1]
        if(!token){
            throw new CustomError('Not authorize to access this resource',400)
        }
        try{
            
            const decodeJwtPayload = JWT.verify(token,config.JWT_SECRET)
            req.user = await User.findById(decodeJwtPayload._id,"name email role")
            next()
        }
        catch(error){
            throw new CustomError('Not authorize to access',400)
        }
    }
    
})

export const authorize = (...requiredRoles) => asyncHandler(async(req,res,next)=>{
    if(!requiredRoles.includes(req.user.role)){
        throw new CustomError('not authorize',400)
    }
    next()
})