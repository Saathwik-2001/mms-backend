const route = require("express");
const Router = route();
const AllUsers = require("../controllers/user-controller");


Router.get("/get/all",AllUsers.getAllUsers);
Router.post("/signup",AllUsers.signup);
Router.post("/login",AllUsers.login);
Router.get("/logout",AllUsers.logout);
module.exports = Router;