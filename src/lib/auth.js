// Módulo que exporta dos funciones middleware para la autenticación de usuarios.

module.exports = {

    // Esta función middleware comprueba si el usuario está autenticado.

    isLoggedIn(req, res, next) {
        
        // Si el usuario está autenticado, pasa al siguiente middleware.

        if (req.isAuthenticated()) {
            return next();
        }
        
        // Si el usuario no está autenticado, redirige a la página de inicio de sesión.

        return res.redirect('/login');
    },

    // Esta función middleware comprueba si el usuario no está autenticado.

    isNotLoggedIn(req, res, next) {
        
        // Si el usuario no está autenticado, pasa al siguiente middleware.

        if (!req.isAuthenticated()) {
            return next();
        }
        
        // Si el usuario está autenticado, redirige a la página de perfil.
        
        return res.redirect('perfil');
    }
};
