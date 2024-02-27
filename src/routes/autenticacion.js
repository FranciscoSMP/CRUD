const express = require('express');
const router = express.Router();
const passport = require('../lib/passport');

router.get('/registro', (req, res) => {
    res.render('auth/registro');
});

router.post('/registro', (req, res) => {
    passport.authenticate('registro.local', {
        successRedirect: '/perfil',
        failureRedirect: '/registro',
        failureFlash: true
    });
    res.send('recibido');
});

router.get('/perfil', (req, res) => {
    res.send('este es tu perfil')
});

module.exports = router;