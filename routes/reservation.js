const express = require('express');
const {addReservation}=require('../controllers/reservationControl');
const userAuth = require('../middlewares/userAuth')

const router = express.Router();


router.post("/",userAuth, addReservation);



module.exports = router;
