const mongoose = require("mongoose");
const Blogs = require("../models/blogModel");
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        // required: true,
    },
    email:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required: true,
        minlength:6
    },
    accountID:{
        type:String,
        // required: true,
    },
    dob:{
        type:String,
        // required: true,
    },
    gender:{
        type:String,
        // required: true,
    },
    phone:{
        type:String,
        // required: true,
    },
    blogs:[{
        type:mongoose.Types.ObjectId, 
        ref:"Blogs" 
    }]
}, {timestamps:true});

const userModel = mongoose.model("Users",userSchema);
module.exports = userModel;