const model  = require("../models/userModel");
const crypto = require('crypto');
const bcrypt = require("bcryptjs");
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
    return console.log(err);
    }
    if(existingUser){
        return res.status(200).json({message: "User with same email already exists!"});
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
    return res.status(200).json({newUser})
}


const login = async (req,res)=>{
    const {email , password} = req.body;
    let existingUser;
    try{
        existingUser = await model.findOne({email});
    }
    catch(err){
    return console.log(err);
    }
    if(!(existingUser)){
        console.log(`User tried logging in with credentials: ${email} , ${password}`);
        return res.status(201).json({message: "No User with this email exists!"});
    }
    const isPassCorrect = bcrypt.compareSync(password,existingUser.password);
    if(!isPassCorrect){
        return res.json("Incorrect Password!");
    }
    return res.status(200).json({message:"Login Successfull!"})
}

module.exports = {getAllUsers,signup,login};
