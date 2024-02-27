const express = require('express');
const router = express.Router();

const passport = require('passport');

router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', (req, res) => {
    console.log(req.body);
});

// router.post('/signup', passport.authenticate('registro.local', {
//     successRedirect: '/perfil',
//     failureRedirect: '/registro',
//     failureFlash: true
// }));

// router.get('/perfil', (req, res) => {
//     res.send('este es tu perfil');
// });

module.exports = router;