const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        unit:
        {
            type: mongoose.Schema.ObjectId,
            ref: "Product",
            required: true,
        },
        date: {
            type: {
                start: {
                    type: Date,
                },
                end: {
                    type: Date,
                }
            },
            required: true,
        },
        numberOfDays: {
            type: Number,
            required: true,

        },
        pricePerNight: {
            type: Number,
            required: true,

        },
        totalPrice: {
            type: Number,
            required: true,

        },
        paymentId: {
            type: String, required: true,

        },
        payerEmail: {
            type: String, required: true,
        }
    },
    { timestamp: true }
);

const reservationModel = mongoose.model("Reservation", reservationSchema);

module.exports = reservationModel;