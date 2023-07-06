const express = require("express");
const Blogs = require("../controllers/blog-controller");
const blogModel = require("../models/blogModel");

const blogRoute = express();

blogRoute.get('/get/all', Blogs.getAllBlogs);
blogRoute.post('/add', Blogs.postBlog);
blogRoute.put('/update/:id', Blogs.updateBlog);
blogRoute.get('/get/:id', Blogs.getBlogbyID);
blogRoute.get('/get/user/:id', Blogs.getBlogsOf);
blogRoute.delete('/delete/:id', Blogs.deleteBlog);
module.exports = blogRoute;