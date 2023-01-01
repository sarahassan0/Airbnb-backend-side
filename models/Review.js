const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
    {
        review: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        unit: {
            type: mongoose.Types.ObjectId,
            ref: 'Unit',
            required: true
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;