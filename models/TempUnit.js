const mongoose = require('mongoose');

const tempUnitSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    catName: { type: String, required: true },
    location: {
        country: { type: String, required: true },
        state: { type: String, required: true },
        city: { type: String },
    },
    unitType: { type: String, required: true },
    placeType: { type: String, required: true },
    advantages: [{ title: String, icon: String, _id: false, }],
    date: {
        start: Date,
        end: Date
    },
    pricePerNight: { type: Number, required: true },
    guestsNumber: { type: Number, required: true },
    host: { type: mongoose.Types.ObjectId, ref: 'User' },
    hostLang: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    beds: { type: Number, required: true },
    images: [{ type: String, }],
    available: { type: Boolean, default: true },
})

const TempUnitModel = mongoose.model('TempUnit', tempUnitSchema);

module.exports = TempUnitModel;