const Review = require('../models/Review');
const User = require('../models/User');
const Unit = require('../models/Unit');


exports.getReviewByUserID = async (req, res, next) => {
    try {
        const reviews = await Review.find({ user: req.userID }).populate(['user', 'unit']);
        res.status(200).json(reviews);
    }
    catch (err) {
        res.status(400).json(err);
    }
};

exports.getReviewByUnitID = async (req, res, next) => {
    try {
        const reviews = await Review.find({ unit: req.params.unitID }).populate(['user']);
        res.status(200).json(reviews);
    }
    catch (err) {
        res.status(400).json(err);
    }
}

exports.setReview = async (req, res, next) => {
    try {

        let review = req.body
        review.user = req.userID;
        review.unit = req.params.unitID;
        let reviewDoc = await Review.create(review);
        let unit = await Unit.findById(req.params.unitID);
        unit?.reviews?.push(reviewDoc._id);
        unit.numberOfRates += 1;

        unit.sumOfRates += reviewDoc.rating;
        unit.avgRating = Math.round(unit.sumOfRates / unit.numberOfRates * 10) / 10

        await unit.save();
        res.status(200).json(reviewDoc);

    } catch (err) {
        res.status(400).json(err.message);
    }
}