const reservationModel = require("../models/Reservation");

const addReservation = async (req, res, next) => {
    console.log(new Date());
    let reservation = req.body;

    try {
        if (!reservation.user || !req.userID || reservation.user !== req.userID) {
            console.log(reservation.user);
            console.log(req.userID);

            res.status(401).json("Unauthorized User");
        } else if (
            !reservation.unit ||
            !reservation.date ||
            !reservation.numberOfDays ||
            !reservation.pricePerNight ||
            !reservation.totalPrice ||
            !reservation.paymentId ||
            !reservation.payerEmail
        ) {
            res.status(400).json("Fields Required");
        } else {
            let completedReservation = await reservationModel.create(reservation);
            res.status(201).json(completedReservation);
        }
    } catch (err) {
        res.status(400).json(`Unable to complete reservation . Error: ${err}`);
    }
};

const getReservations = async (req, res, next) => {
    console.log(new Date());
    let lang = req.query.lang || "en";
    try {
        {
            let allReservation = await reservationModel
                .find({ user: req.userID })
                .populate("unit");
            let resReservations;
            if (lang === "ar") {
                resReservations = allReservation.map((reserve) => {
                    return {
                        _id: reserve._id,
                        user: reserve.user,
                        date: reserve.date,
                        numberOfDays: reserve.numberOfDays,
                        pricePerNight: reserve.pricePerNight,
                        totalPrice: reserve.totalPrice,
                        paymentId: reserve.paymentId,
                        payerEmail: reserve.payerEmail,
                        unit: {
                            _id: reserve.unit._id,
                            images: reserve.unit.images,
                            host: reserve.unit.host,
                            hostLang: reserve.unit.hostLang,
                            location: reserve.unit.ArabicUnit.location,
                            title: reserve.unit.ArabicUnit.title,
                            unitType: reserve.unit.ArabicUnit.unitType,
                            placeType: reserve.unit.ArabicUnit.placeType,
                            rate: reserve.unit.rate,
                        }
                    };
                });
            } else if (lang === "en") {
                resReservations = allReservation.map((reserve) => {
                    return {
                        _id: reserve._id,
                        user: reserve.user,
                        date: reserve.date,
                        numberOfDays: reserve.numberOfDays,
                        pricePerNight: reserve.pricePerNight,
                        totalPrice: reserve.totalPrice,
                        paymentId: reserve.paymentId,
                        payerEmail: reserve.payerEmail,
                        unit: {
                            _id: reserve.unit._id,
                            images: reserve.unit.images,
                            host: reserve.unit.host,
                            hostLang: reserve.unit.hostLang,
                            location: reserve.unit.EnglishUnit.location,
                            title: reserve.unit.EnglishUnit.title,
                            unitType: reserve.unit.EnglishUnit.unitType,
                            placeType: reserve.unit.EnglishUnit.placeType,
                            rate: reserve.unit.rate,
                        }
                    };
                });
            }
            res.status(201).json(resReservations);
        }
    } catch (err) {
        res.status(400).json(`Unable to complete reservation . Error: ${err}`);
    }
};

module.exports = { addReservation, getReservations };
