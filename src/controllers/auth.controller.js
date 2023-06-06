import CustomError from "../utils/CustomError.js";
import asyncHandler from "../service/asyncHandler.js";
import User from "../models/user.schema.js";
import config from "../config/config.js";

import JWT from "jsonwebtoken";

export const cookieOptions = {
    expires: new Date(Date.now() + 3*24*60*60*1000),
    httpOnly: true
}

export const signUp = asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body

    if(!name || !email || !password){
        throw new CustomError('please provide all field',400)
    }

    const existingUser = await User.findOne({email:email})

    if(existingUser){
        throw new CustomError('User already exit',400)
    }

    const user = await User.create({
        name:name,
        email:email,
        password:password
    })

    if(!user){
        throw new CustomError('user creation fails',400)
    }
   

    //using JWT token to sign up the user(ans 6)

    const token = JWT.sign({user}, config.JWT_SECRET, {expiresIn: config.JWT_EXPIRY})
    user.password = undefined

  

    res.cookie('token',token,cookieOptions)
  

    res.status(200).json({
        success: true,
        message: 'sign up successfull',
        //ask/note: although user is recieved but  token WAS recieved as undefined, after 6 hr its is recieving dont know how"
        token,
        user
    })


})

export const logIn = asyncHandler(async(req,res)=>{
    const {email,password} = req.body

    if(!email || !password){
        throw new CustomError('please provide email and password',400)
    }

    const user = await User.findOne({email:email}).select('+password')
    //console.log("USER BEFORE PASSWORD MATCHED:",user)

    if(!user){
        throw new CustomError('user not found, please verify your email',400)
    }

    const isPasswordMatched = await user.comparePassword(password)

    if(isPasswordMatched){
        // using JWT token for log in(ans 6)
        const token = JWT.sign({user}, config.JWT_SECRET, {expiresIn: config.JWT_EXPIRY})

      
        user.password = undefined
        res.cookie('token',token,cookieOptions)
        //ask: if we dont write return here then throw will execute or not??
        return res.status(200).json({
            success: true,
            message: 'user login successfull',
            token,
            user
        })
    }

    throw new CustomError('password is incorrect',400)


})

export const logOut = asyncHandler(async(req,res)=>{
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'User Logged out successfully'
    })
})