const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");
const getAllBlogs = async (req, res) => {
    let blog;
    try {
        blog = await blogModel.find();
    }
    catch (e) {
        return console.log(e);
    }
    if (blog==0) {
        return res.json({ message: "No blog found in the DB!" });
    }
    return res.json( {blog} );
};

const postBlog = async (req, res) => {
    const { title, description, image, user } = req.body;
    let existingUser;
    try{
        existingUser = await userModel.findById(user);
    }
    catch(err){
        return console.log(err);
    }
    if( existingUser == 0){
        return res.json("Invalid User!");
    }
        const blog = new blogModel({ title, description, image, user });
    try {
        const session = await mongoose.startSession();  
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session});
        await session.commitTransaction();
    }
    catch (e) {
        return console.log(e);
    }
    return res.json({ message: "Blog saved successfully!", blog });
};

const updateBlog = async (req, res) => {
    const { title, description, image, user } = req.body;
    const blogID = req.params.id;
    let blog;
    try {
        blog = await blogModel.findByIdAndUpdate(blogID, { title: title, description: description, image: image });
    }
    catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.json("Couldn't update the blog!");
    }
    return await res.json({ blog });
}

const getBlogbyID = async(req,res)=>{
    const id = req.params.id;
    let blog;
    try{
        blog = await blogModel.findById(id);
    }
    catch(err){
        return console.log(err);
    }
    if(!blog){
        return res.json({message:"No blog found!"});
    }
    return res.json({blog});
}

const deleteBlog = async(req,res)=>{
    const id = req.params.id;
    let blog;
    try{
        blog = await blogModel.findByIdAndRemove(id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    }
    catch(err){
        return console.log(err);
    }
    if(!blog){
        return res.json({message:"No blog found!"});
    }
    return res.json({message:"Successfully Deleted!"});
}

const getBlogsOf = async(req,res)=>{
    const id = req.params.id;
    let blogs;
    try{
        blogs = await blogModel.find({user:id});
    }
    catch(err){
        return console.log(err);
    }
    if(blogs == 0){
        return res.json({message:"No blogs found!"});
    }
    return res.json({blogs});
}

module.exports = { getAllBlogs, postBlog, updateBlog, getBlogbyID, getBlogsOf, deleteBlog };