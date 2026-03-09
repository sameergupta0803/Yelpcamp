const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../models/user')
const catchAsync = require('../utils/catchAsync')
router.get('/register', (req, res) => {
    res.render('users/register')
})
router.post('/register', catchAsync(async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email })
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, (err) => {
            if (err) return next(err)
            req.flash('success', 'Welcome to Yelpcamp!')
            res.redirect('/campgrounds')
        })

    }
    catch (e) {
        req.flash('error', e.message)
        res.redirect('/register')
    }
}))
router.get('/login', (req, res) => {
    res.render('users/login')
})
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Welcome back!')
    res.redirect('/campgrounds')
})
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash('sucess', 'Goodbye!');
        res.redirect('/campgrounds');
    });
})
module.exports = router