const mongoose  = require("mongoose");
const Users = require("../models/userModel");
const blogSchema = mongoose.Schema({
    title:{
        type:String,
        //required:true
    },
    description:{
        type:String,
        //required:true
    },
    image:{
        type:String,
        //required:true
    },
    email:{
        type:String,
        //required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"Users"
    }
}, {timestamps:true});

const blogModel = mongoose.model("Blogs", blogSchema);

module.exports = blogModel;