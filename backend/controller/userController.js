const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel.js')



//     @Register new user
//     @POST/api/users
//     @public
const registerUser = asyncHandler(async(req,res) => {
     const {name,email,password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all Fields')
    }
    // Check  if user exists
    const userExists = await User.findOne({email})
    if(userExists){
        
    }
    res.json({message:"Register User"})
})

//     Authenticate a user
//     POST/api/users/login
//     public
const loginUser =asyncHandler(async (req,res) => {
   
    res.json({message:"Login User"})
})

//     Get user data
//     GET/api/users/me
//     public
const getMe =asyncHandler(async (req,res) => {
    res.json({message:"User data display"})
})



module.exports ={
    registerUser,
    loginUser,
    getMe

}