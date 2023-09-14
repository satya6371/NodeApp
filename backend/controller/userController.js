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
        res.status(400)
        throw new Error("User already exists")
    }
    // Hass the password
    const salt =await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    // Create user
    const user = await User.create({
        name,
        email,
        password:hashedPassword
    })
    if (user) {
        res.status(201).json({
            _id:user .id,
            name:user.name,
            emali:user.email,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error("INvalid user data")
    }
    res.json({message:"Register User"})
})

//     Authenticate a user
//     POST/api/users/login
//     public
const loginUser =asyncHandler(async (req,res) => {
    const {email,password} = req.body
    // Check for user email
    const user = await User.findOne({email})
    if (user &&(await bcrypt.compare(password,user.password))){
        res.json({
             _id:user .id,
            name:user.name,
            emali:user.email,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid Credentials")
    }
})
 
//     Get user data
//     GET/api/users/me
//     Private
const getMe =asyncHandler(async (req,res) => {
    res.json({message:"User data display"})
})
// Generate JWT
const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}

module.exports ={
    registerUser,
    loginUser,
    getMe

}