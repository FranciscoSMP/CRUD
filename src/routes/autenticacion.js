const express = require('express');
const router = express.Router();

const passport = require('passport');

router.get('/registro', (req, res) => {
    res.render('auth/registro');
});

router.post('/registro', passport.authenticate('registro.local', {
    successRedirect: '/perfil',
    failureRedirect: '/registro',
    failureFlash: true
}));

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', (req, res, next) => {
    passport.authenticate('login.local', {
        successRedirect: '/perfil',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/perfil', (req, res) => {
    res.send('este es tu perfil');
});

module.exports = router;