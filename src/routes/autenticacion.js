const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

router.get('/registro', isNotLoggedIn, (req, res) => {
    res.render('auth/registro');
});

router.post('/registro', isNotLoggedIn, passport.authenticate('registro.local', {
    successRedirect: '/perfil',
    failureRedirect: '/registro',
    failureFlash: true
}));

router.get('/login', isNotLoggedIn, (req, res) => {
    res.render('auth/login');
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('login.local', {
        successRedirect: '/perfil',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/perfil', isLoggedIn, (req, res) => {
    res.render('perfil');
});

router.get('/logout', isLoggedIn, (req, res, next) => {
    req.logOut(req.user, err => {
        if(err) return next(err);
        res.redirect('/login');
    });
});

module.exports = router;