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

exports.getReviewByUnitID = async (req, res, next)=>{
    try{
        const reviews = await Review.find({unit: req.params.unitID}).populate(['user']);
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
            console.log("1111111")
            let unit = await Unit.findById(req.params.unitID);
            console.log("222222222")
            unit?.reviews?.push(reviewDoc._id);
            console.log("33333333")

            unit.numberOfRates+=1;
            console.log("444444444")

            unit.sumOfRates+=reviewDoc.rating;
            console.log("55555")

            unit.avgRating = Math.round(unit.sumOfRates/unit.numberOfRates * 10) /10
            console.log("666666")

            await unit.save();
            console.log("77777777777")

            res.status(200).json(reviewDoc);
        // }
    } catch (err) {
        res.status(400).json(err.message);
    }
}