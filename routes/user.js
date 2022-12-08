const express = require("express");
var bcrypt = require("bcrypt");
const userModel = require("../models/User");
var jwt = require("jsonwebtoken")
const userAuth = require('../middlewares/userAuth')
require('dotenv').config();
const { addUser, loginUser, getUser, deleteUser, updateUser } = require('../controllers/userControl')


const router = express.Router();



// Handling clint requests
//register new User

router.post("/", addUser);



// login User
router.post("/login", loginUser);



// get User by its ID
router.get("/", userAuth, getUser);


// Update User by its ID
router.patch("/:id", userAuth, updateUser);

// Delete User by its ID
router.delete("/:id", userAuth, deleteUser);




module.exports = router;
