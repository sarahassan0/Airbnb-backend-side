const reservationModel = require("../models/Reservation");
const UnitModel = require('../models/Unit');

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
            !reservation.payerEmail ||
            !reservation.captureId
        ) {
            res.status(400).json("Fields Required");
        } else {
            let completedReservation = await reservationModel.create(reservation);
            await UnitModel.findByIdAndUpdate(reservation.unit, { available: false })
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
                        captureId: reserve.captureId,
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
                        captureId: reserve.captureId,
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

const deleteReservation = async (req, res, next) => {
    const _id = req.params.id;
    try {
        let reservation = await reservationModel.findById(_id)
        console.log(reservation.user, "   == ",req.userID)
        if (reservation.user == req.userID) {
            let reservation1 = await reservationModel.findByIdAndDelete(_id)
            await UnitModel.findByIdAndUpdate(reservation.unit, { available: true })

            res.status(200).json('reservation has been deleted');
        } else res.status(403).json(`this user cannot cancel this reservation`);
    } catch (err) {
        res.status(400).json(`Cannot delete User with ID ${_id}.Error: ${err} `);
    }

}
module.exports = { addReservation, getReservations, deleteReservation };
