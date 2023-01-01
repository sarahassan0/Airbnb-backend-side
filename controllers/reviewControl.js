const Review = require('../models/Review');
const User = require('../models/User');
const Unit = require('../models/Unit');


exports.getReviewByUserID = async (req, res, next) => {
    try {
        const review = await Review.findOne({ user: req.userID }).populate(['user', 'unit']);
        res.status(200).json(review);
    }
    catch (err) {
        res.status(400).json(err);
    }
};

exports.getReviewByUnitID = async (req, res, next)=>{
    try{
        const reviews = await Review.find({unit: req.params.unitID});
        res.status(200).json(reviews);
    }
    catch(err){
        res.status(400).json(err);
    }
}

exports.setReview = async (req, res, next) => {
    try {
        // let alreadyReviewedThisUnit = await Review.findOne({user: req.userID, unit: req.params.unitID})
        
        // if(alreadyReviewedThisUnit){
        //     res.status(201).json(alreadyReviewedThisUnit);
        // }else{
            let review = req.body
            review.user = req.userID;
            review.unit = req.params.unitID;
            let reviewDoc = await Review.create(review);
            let unit = await Unit.findById(req.params.unitID);
            unit.reviews?.push(reviewDoc._id);
            unit.numberOfRates+=1;
            unit.sumOfRates+=reviewDoc.rating;
            unit.avgRating = Math.round(unit.sumOfRates/unit.numberOfRates * 10) /10
            await unit.save();
            res.status(200).json(reviewDoc);
        // }
    } catch (err) {
        res.status(400).json(err.message);
    }
}