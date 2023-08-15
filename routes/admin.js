const express = require("express");
var bcrypt = require("bcrypt");
const adminModel = require("../models/Admin");
var jwt = require("jsonwebtoken")
const adminAuth = require('../middlewares/adminAuth')
require('dotenv').config();
const { addAdmin, loginAdmin, getAdmin, deleteAdmin, updateAdmin } = require('../controllers/adminControl')


const router = express.Router();



// Handling clint requests
//register new adminID

router.post("/", addAdmin);



// login Admin
router.post("/login", loginAdmin);



// get Admin by its ID
router.get("/", adminAuth, getAdmin);


// Update Admin by its ID
router.patch("/:id", adminAuth, updateAdmin);

// Delete Admin by its ID
router.delete("/:id", adminAuth, deleteAdmin);




module.exports = router;
