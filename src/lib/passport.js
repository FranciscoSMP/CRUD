const passport = require('passport'); // Importa Passport para la autenticación.
const LocalStrategy = require('passport-local').Strategy; // Importa la estrategia de autenticación local de Passport.

const pool = require('../base_de_datos'); // Importa la conexión a la base de datos.
const helpers = require('./helpers'); // Importa funciones útiles.

// Configuración de la estrategia de autenticación para iniciar sesión.

passport.use('login.local', new LocalStrategy({
    usernameField: 'nombre_usuario', // Campo del formulario para el nombre de usuario.
    passwordField: 'contrasenia', // Campo del formulario para la contraseña.
    passReqToCallback: true // Pasa el objeto de solicitud a la función de verificación.
}, async (req, nombre_usuario, contrasenia, done) => { // Función de verificación de inicio de sesión.
    const rows = await pool.query('SELECT * FROM usuarios WHERE nombre_usuario = ?', [nombre_usuario]); // Busca el usuario en la base de datos.
    if (rows.length > 0) { // Si el usuario existe.
        const user = rows[0]; // Obtiene el primer usuario encontrado.
        const validPassword = await helpers.compararContrasenia(contrasenia, user.contrasenia); // Verifica la contraseña.
        if (validPassword) { // Si la contraseña es válida.
            done(null, user, req.flash('success', 'Welcome ' + user.nombre_usuario)); // Llama a done() para indicar autenticación exitosa.
        } else {
            done(null, false, req.flash('message', 'Contraseña Incorrecta')); // Llama a done() para indicar contraseña incorrecta.
        }
    } else {
        return done(null, false, req.flash('message', 'El usuario no existe')); // Llama a done() para indicar que el usuario no existe.
    }
}));

// Configuración de la estrategia de autenticación para registro de usuarios.

passport.use('registro.local', new LocalStrategy({
    usernameField: 'nombre_usuario', // Campo del formulario para el nombre de usuario.
    passwordField: 'contrasenia', // Campo del formulario para la contraseña.
    passReqToCallback: true // Pasa el objeto de solicitud a la función de registro.
}, async (req, nombre_usuario, contrasenia, done) => { // Función de registro de usuario.
    const { correo_electronico } = req.body; // Extrae el correo electrónico del cuerpo de la solicitud.
    let nuevoUsuario = { // Crea un nuevo usuario.
        nombre_usuario,
        contrasenia,
        correo_electronico
    };
    nuevoUsuario.contrasenia = await helpers.cifrarContrasenia(contrasenia); // Cifra la contraseña.
    const result = await pool.query('INSERT INTO usuarios SET ? ', [nuevoUsuario]); // Inserta el nuevo usuario en la base de datos.
    nuevoUsuario.id = result.insertId; // Obtiene el ID del nuevo usuario.
    return done(null, nuevoUsuario); // Llama a done() para indicar que el usuario se ha registrado correctamente.
}));

// Serialización del usuario para almacenar en la sesión.

passport.serializeUser((user, done) => {
    done(null, user.id); // Almacena el ID del usuario en la sesión.
});

// Deserialización del usuario para recuperar de la sesión.

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM usuarios Where id = ?', [id]); // Busca al usuario en la base de datos por su ID.
    done(null, rows[0]); // Retorna el usuario encontrado.
});
