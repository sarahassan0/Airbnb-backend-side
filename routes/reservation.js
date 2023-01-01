const express = require('express');
const { addReservation, getReservations ,deleteReservation} = require('../controllers/reservationControl');
const userAuth = require('../middlewares/userAuth')

const router = express.Router();


router.post("/", userAuth, addReservation);
router.get("/", userAuth, getReservations);
router.delete("/:id", userAuth, deleteReservation);



module.exports = router;
