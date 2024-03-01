// Se requieren los módulos necesarios.

const express = require('express'); // Framework para crear aplicaciones web.
const morgan = require('morgan'); // Middleware para el registro de solicitudes HTTP.
const {engine} = require('express-handlebars'); // Motor de plantillas para Express.
const path = require('path'); // Módulo para manejar rutas de archivos y directorios.
const session = require('express-session'); // Middleware para manejar sesiones de usuario.
const flash = require('connect-flash'); // Middleware para mostrar mensajes flash.
const MySQLStore = require('express-mysql-session')(session); // Almacén de sesiones en MySQL.
const passport = require('passport'); // Middleware para autenticación de usuarios.

const { base_de_datos } = require('./keys'); // Importación de la configuración de la base de datos.

// Inicializaciones.

const app = express(); // Creación de la aplicación Express.
require('./lib/passport'); // Importación de la configuración de Passport.

// Configuraciones de la aplicación.

app.set('port', process.env.PORT || 4000); // Configuración del puerto del servidor.
app.set('views', path.join(__dirname, 'views')); // Configuración del directorio de vistas.
app.engine('.hbs', engine({ // Configuración del motor de plantillas Handlebars.
    defaultLayout: 'main', // Plantilla predeterminada.
    layoutsDir: path.join(app.get('views'), 'layouts'), // Directorio de plantillas.
    partialsDir: path.join(app.get('views'), 'partials'), // Directorio de fragmentos de plantilla.
    extname: '.hbs', // Extensión de archivo de plantilla.
    helpers: require('./lib/handlebars') // Ayudantes de Handlebars personalizados.
}));
app.set('view engine', '.hbs'); // Configuración del motor de plantillas predeterminado.

// Middlewares.

app.use(session({ // Middleware de manejo de sesiones.
    secret: 'mysqlnodesession', // Clave secreta para firmar las cookies de sesión.
    resave: false, // No volver a guardar la sesión si no ha cambiado.
    saveUninitialized: false, // No guardar sesiones vacías en el almacén.
    store: new MySQLStore(base_de_datos) // Almacén de sesiones en MySQL.
}));
app.use(flash()); // Middleware para mostrar mensajes flash.
app.use(morgan('dev')); // Middleware para el registro de solicitudes HTTP en desarrollo.
app.use(express.urlencoded({extended: false})); // Middleware para analizar el cuerpo de solicitudes codificadas en URL.
app.use(express.json()); // Middleware para analizar el cuerpo de solicitudes JSON.
app.use(passport.initialize()); // Middleware de inicialización de Passport.
app.use(passport.session()); // Middleware de sesión de Passport.

// Variables Globales.

app.use((req, res, next) => { // Middleware para configurar variables globales.
    app.locals.success = req.flash('success'); // Mensajes de éxito.
    app.locals.message = req.flash('message'); // Mensajes generales.
    app.locals.user = req.user; // Datos del usuario autenticado.
    next(); // Llama a la siguiente función en la cadena de middlewares.
});
  
// Rutas.   

app.use(require('./routes/index')); // Rutas para la página de inicio.
app.use(require('./routes/autenticacion')); // Rutas para la autenticación de usuarios.
app.use('/notas', require('./routes/notas')); // Rutas para la gestión de notas.

// Public.

app.use(express.static(path.join(__dirname, 'public'))); // Middleware para servir archivos estáticos

// Inicar la Aplicación

app.listen(app.get('port'), () => { // Iniciar el servidor.
    console.log('Servidor en el puerto', app.get('port')); // Mensaje de inicio del servidor.
});
