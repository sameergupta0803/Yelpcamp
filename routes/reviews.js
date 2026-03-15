const express = require('express')
const router = express.Router({ mergeParams: true });//mergeParams used to connect the :id in this file
const catchAsync = require('../utils/catchAsync')
const reviews = require('../controllers/reviews')
const { isLoggedIn, validateReview, isReviewAuthor, canPostReview } = require('../middleware')
const Campground = require('../models/campground')
const Review = require('../models/review')

router.post('/', isLoggedIn, validateReview, canPostReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router