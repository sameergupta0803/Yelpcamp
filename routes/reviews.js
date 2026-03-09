const express = require('express')
const router = express.Router({ mergeParams: true });//mergeParams used to connect the :id in this file
const catchAsync = require('../utils/catchAsync')
const { reviewSchema } = require('../schemas')
const { isLoggedIn } = require('../middleware')
const Campground = require('../models/campground')
const Review = require('../models/review')

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(',')
        console.log(msg)
        throw new ExpressError(msg, 400)
    }
    else {
        next();
    }
}

router.post('/', isLoggedIn, validateReview, catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    const review = new Review(req.body.review)
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Added the review successfully!')
    res.redirect(`/campgrounds/${id}`)
}))
router.delete('/:reviewId', isLoggedIn, catchAsync(async (req, res, next) => {
    const { id, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    req.flash('success', 'Deleted the review successfully!')
    res.redirect(`/campgrounds/${id}`);
}))
module.exports = router