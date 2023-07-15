const model  = require("../models/userModel");
const crypto = require('crypto');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// app.use(cookieParser());

/*const isAuth=(req,res,next)=>{
    const {token} = req.cookies;
    if(token){
      next();
    }
    else{
      return res.status(401).json({message:"Please Log In first!"});
    }
  };
  */

const getAllUsers = async (req, res)=>{
    let users;
    try{
        users = await model.find()
    }
    catch(e){
    return console.log(e);
    }
    if(users == 0){
        console.log("No users Found!");
        return res.json("No users Found!")
    }
    else{
        return res.status(200).json({users});
    }
}


const signup = async (req,res)=>{
    const { username, email, password } = req.body;
    let existingUser;
    try{
        existingUser = await model.findOne({email});
    }
    catch(err){
    return res.status(500).json({message:"Error accessing DB data!"});
    }
    if(existingUser){
        return res.status(409).json({message: "User with same email already exists!"});
    }
    const p = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const newUser = await model.create({username:p.username,email:p.email,password:hashedPassword,accountID:`${crypto.randomUUID()}_${p.email}`, blogs:[]});
     
    try{
        newUser.save();
    }
    catch(e){
    return console.log("couldn't save the data");  
    }
    console.log("New user data saved!");
    return res.status(201).json({newUser})
}


const login = async (req,res)=>{
    const {email , password} = req.body;
    let existingUser;
    try{
        existingUser = await model.findOne({email});
    }
    catch(err){
    return res.status(500).json({message:"Error accessing DB data!"});
    }
    if(!(existingUser)){
        console.log(`User tried logging in with credentials: ${email} , ${password}`);
        return res.status(204).json({message: "No User with this email exists!"});
    }
    const isPassCorrect = bcrypt.compareSync(password,existingUser.password);
    if(!isPassCorrect){
        return res.status(401).json("Incorrect Password!");
    }
    //const token = jwt.sign({_id:user._id}, process.env.SECRETKEY);
    //res.cookie("token",token,{httpOnly:true, expires: new Date(Date.now() + 60 * 1000 * 14400)});
    return res.status(200).json({message:"Login Successfull!"})
}

const logout = (req,res)=>{
    // res.cookie("token",null,{expires: new Date(Date.now()),httpOnly:true,});
    res.redirect('/login');
 
};
  

module.exports = {getAllUsers,signup,login, logout};
