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
            state: { type: String, required: true },
            city: { type: String },
        },
        unitType: { type: String, required: true },
        placeType: { type: String },
        advantages: {
            type: Array,
            _id: false,
        },
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
            state: { type: String, required: true },
            city: { type: String },
        },
        unitType: { type: String, required: true },
        placeType: { type: String, required: true },
        advantages: {
            type: Array,
            _id: false,
        },
    },
    date: {
        start: String,
        end: String
    },
    rate: {
        type: String,
        // required: true
    },
    navigations: { Latitude: Number, Longitude: Number },
    numberOfRates: { type: Number, required: true },
    avgRating:{type:Number},
    sumOfRates: { type: Number },
    reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
    pricePerNight: { type: Number, required: true },
    guestsNumber: { type: Number, required: true },
    images: [{ type: String, required: true }],
    host: { type: mongoose.Types.ObjectId, ref: 'User' },
    hostLang: { type: String, required: true },
    catName: { type: String, required: true },
    bedrooms: { type: Number },
    bathrooms: { type: Number },
    beds: { type: Number },
    available: { type: Boolean, default: true },
})

const UnitModel = mongoose.model('Unit', UnitSchema);

module.exports = UnitModel;