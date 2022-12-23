const express = require("express");
const userAuth = require('../middlewares/userAuth')
const adminAuth = require('../middlewares/adminAuth')

require('dotenv').config();
const { addTemp, getTemp, deleteTemp, getAllTemps } = require('../controllers/tempUnitControl')


const router = express.Router();



// Handling clint requests

//add new Temp
router.post("/", userAuth, addTemp);



// get all Temps
router.get("/all", adminAuth, getAllTemps);

// get Temp by its ID
router.get("/:id", adminAuth, getTemp);

// Delete Temp by its ID
router.delete("/:id", adminAuth, deleteTemp);




module.exports = router;
