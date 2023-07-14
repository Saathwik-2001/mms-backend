const express = require("express");
const mongoose  = require("mongoose");
const userRoute = require("./routes/userRoute");
require("dotenv").config();
const cors = require("cors");
const blogRoute = require("./routes/blogRoute");

mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log("DB Connected")})
.catch((e)=>{console.log("Error")});

const app = express();
app.use(cors({
    origin:["http://localhost:5000","https://mms-backend-v1.onrender.com","https://mms-backend-v1.onrender.com"]
}));
app.use(express.json());
app.use(express.static("public"))
app.use("/api/users",userRoute);
app.use("/api/blogs", blogRoute);

app.listen(process.env.PORT,()=>{
    console.log(`Server Initiated at http://localhost:${process.env.PORT}`);
})