const mongoose = require('mongoose');

const UnitSchema = mongoose.Schema({
    ArabicUnit: {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        location: {
            country: { type: String, required: true },
            city: { type: String, required: true },
        },
        unitType: { type: String, required: true },
        placeType: { type: String, enum: ['مكان خاص', "غرفة مشتركة", "غرفة خاصة"] },
        advantages: [{ type: String, required: true }],
        about: [
            {
                head: String,
                subHead: String,
                icon: String
            },
            {
                head: String,
                subHead: String,
                icon: String
            },
            {
                head: String,
                subHead: String,
                icon: String
            }
        ]
    },
    EnglishUnit: {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        location: {
            country: { type: String, required: true },
            city: { type: String, required: true },
        },
        unitType: { type: String, required: true },
        placeType: { type: String, required: true, enum: ['Entire place', 'Shared room', 'Private room'] },
        advantages: [{ type: String, required: true }],
        about: [
            {
                head: String,
                subHead: String,
                icon: String
            },
            {
                head: String,
                subHead: String,
                icon: String
            },
            {
                head: String,
                subHead: String,
                icon: String
            }
        ]
    },
    date: {
        start: String,
        end: String
    },
    rate: {
        type: String,
        required: true
    },
    navigations: { Latitude: Number, Longitude: Number },
    numberOfRates: { type: Number, required: true },
    pricePerNight: { type: Number, required: true },
    guestsNumber: { type: Number, required: true },
    images: [{ type: String, required: true }],
    host: { type: mongoose.Types.ObjectId, ref: 'User' },
    hostLang: { type: String, required: true },
    catName: { type: String, required: true }
})

const UnitModel = mongoose.model('Unit', UnitSchema);

module.exports = UnitModel;