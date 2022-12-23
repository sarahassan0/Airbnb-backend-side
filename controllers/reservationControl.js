const reservationModel = require("../models/Reservation");

const addReservation = async (req, res, next) => {
    console.log(new Date());
    let reservation = req.body;

    try {
        if (!reservation.user || !req.userID || reservation.user !== req.userID) {
            console.log(reservation.user);
            console.log(req.userID);

            res.status(401).json("Unauthorized User");
        }
        else if (
            !reservation.unit ||
            !reservation.date ||
            !reservation.numberOfDays ||
            !reservation.pricePerNight ||
            !reservation.totalPrice ||
            !reservation.paymentId ||
            !reservation.payerEmail
        ) {
            res.status(400).json("Fields Required");

        }
        else {
            let completedReservation = await reservationModel.create(reservation);
            res.status(201).json(completedReservation);
        }
    } catch (err) {
        res.status(400).json(`Unable to complete reservation . Error: ${err}`);
    }
};

module.exports = { addReservation };
