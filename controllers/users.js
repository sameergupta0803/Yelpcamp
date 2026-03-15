const User = require('../models/user')
module.exports.renderRegisterForm = (req, res) => {
    res.render('users/register')
}
module.exports.register = async (req, res) => {
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
}
module.exports.renderLoginForm = (req, res) => {
    res.render('users/login')
}
module.exports.login = (req, res) => {
    const url = res.locals.returnTo || '/campgrounds';
    req.flash('success', 'Welcome back!');
    res.redirect(url);
}
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash('sucess', 'Goodbye!');
        res.redirect('/campgrounds');
    });
}