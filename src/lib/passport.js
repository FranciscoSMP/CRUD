const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../base_de_datos');
const helpers = require('./helpers');

passport.use('login.local', new LocalStrategy({

    usernameField: 'nombre_usuario',
    passwordField: 'contrasenia',
    passReqToCallback: true

}, async (req, nombre_usuario, contrasenia, done) => {
    console.log(req.body);
    const rows = await pool.query('SELECT * FROM usuarios WHERE nombre_usuario = ?', [nombre_usuario]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.compararContrasenia(contrasenia, user.contrasenia);
        if (validPassword) {
            done(null, user, req.flash('success', 'Welcome ' + user.nombre_usuario));
        } else {
            done(null, false, req.flash('message', 'Contraseña Incorrecta'));
        }
    } else {
        return done(null, false, req.flash('message', 'El usuario no existe'));
    }
}));

passport.use('registro.local', new LocalStrategy({
    usernameField: 'nombre_usuario',
    passwordField: 'contrasenia',
    passReqToCallback: true
}, async (req, nombre_usuario, contrasenia, done) => {

    const { correo_electronico } = req.body;
    let nuevoUsuario = {
        nombre_usuario,
        contrasenia,
        correo_electronico
    };
    nuevoUsuario.contrasenia = await helpers.cifrarContrasenia(contrasenia);
    const result = await pool.query('INSERT INTO usuarios SET ? ', [nuevoUsuario]);
    nuevoUsuario.id = result.insertId;
    return done(null, nuevoUsuario);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM usuarios Where id = ?', [id]);
    done(null, rows[0]);
});
