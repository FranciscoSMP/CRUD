const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use('registro.local', new LocalStrategy({
    usernameField: 'nombre_usuario',
    passwordField: 'contrasenia',
    passReqToCallback: true
}, async (req, nombre_usuario, contrasenia, done) => {

    console.log(req.body);

}));

// passport.serializeUser((usr, done) => {

// });