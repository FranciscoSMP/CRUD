const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../base_de_datos');
const helpers = require('./helpers');

passport.use('registro.local', new LocalStrategy({
    usernameField: 'nombre_usuario',
    passwordField: 'contrasenia',
    passReqToCallback: true
}, async (req, nombre_usuario, contrasenia, done) => {

    const { correo_electronico } = req.body;
    let nuevoUsuario = {
        correo_electronico,
        nombre_usuario,
        contrasenia
    };
    nuevoUsuario.contrasenia = await helpers.cifrarContrasenia(contrasenia);
    const result = await pool.query('INSERT INTO usuarios SET ? ', nuevoUsuario);
    nuevoUsuario.id = result.insertId;
    return done(null, nuevoUsuario);
}));

// passport.serializeUser((usr, done) => {

// });