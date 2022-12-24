const express = require('express');
const { addReservation, getReservations } = require('../controllers/reservationControl');
const userAuth = require('../middlewares/userAuth')

const router = express.Router();


router.post("/", userAuth, addReservation);
router.get("/", getReservations);


module.exports = router;
