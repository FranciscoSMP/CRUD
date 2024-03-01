// Importación del módulo express para la creación de rutas.

const express = require('express');

// Creación de un enrutador utilizando el método Router de express.

const router = express.Router();

// Importación del módulo passport para la autenticación de usuarios.

const passport = require('passport');

// Importación de funciones de autenticación personalizadas desde el módulo 'auth'.

const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

// Ruta para mostrar el formulario de registro de usuarios.

router.get('/registro', isNotLoggedIn, (req, res) => {
    res.render('auth/registro'); // Renderiza la plantilla 'auth/registro'.
});

// Ruta para procesar el formulario de registro de usuarios.

router.post('/registro', isNotLoggedIn, passport.authenticate('registro.local', {
    successRedirect: '/perfil', // Redirige al perfil en caso de éxito.
    failureRedirect: '/registro', // Redirige de vuelta al registro en caso de fallo.
    failureFlash: true // Habilita mensajes flash para mostrar errores.
}));

// Ruta para mostrar el formulario de inicio de sesión.

router.get('/login', isNotLoggedIn, (req, res) => {
    res.render('auth/login'); // Renderiza la plantilla 'auth/login'.
});

// Ruta para procesar el formulario de inicio de sesión.

router.post('/login', isNotLoggedIn, (req, res, next) => {

    // Middleware de autenticación utilizando passport para iniciar sesión.
    
    passport.authenticate('login.local', {
        successRedirect: '/perfil', // Redirige al perfil en caso de éxito.
        failureRedirect: '/login', // Redirige de vuelta al inicio de sesión en caso de fallo.
        failureFlash: true // Habilita mensajes flash para mostrar errores.
    })(req, res, next); // Invoca el middleware con los parámetros req, res y next.
});

// Ruta para mostrar el perfil de usuario.

router.get('/perfil', isLoggedIn, (req, res) => {
    res.render('perfil'); // Renderiza la plantilla 'perfil'.
});

// Ruta para cerrar sesión.

router.get('/logout', isLoggedIn, (req, res, next) => {
    
    // Método logOut de passport para cerrar la sesión del usuario.

    req.logOut(req.user, err => {
        if(err) return next(err); // Manejo de errores.
        res.redirect('/login'); // Redirige al inicio de sesión después de cerrar sesión.
    });
});

// Exportación del enrutador para su uso en otros archivos.

module.exports = router;
