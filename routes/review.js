const express = require('express');
const router = express.Router();
const userAuth = require('../middlewares/userAuth')
const {getReviewByUserID, setReview, getReviewByUnitID} = require('../controllers/reviewControl')

router.get('/', userAuth, getReviewByUserID);
router.post('/:unitID', userAuth, setReview);
router.get('/:unitID', getReviewByUnitID);
module.exports = router;