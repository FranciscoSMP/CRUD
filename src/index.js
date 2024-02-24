const express = require('express');
const morgan = require('morgan');
const {engine} = require('express-handlebars');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

// Middlewares

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Variables Globales

app.use((req, res, next) => {
   next(); 
});
  
// Routes   

app.use(require('./routes/index'));
app.use(require('./routes/autenticacion'));
app.use('/notas', require('./routes/notas'));

// Public

app.use(express.static(path.join(__dirname, 'public')));

// Starting

app.listen(app.get('port'), () => {
    console.log('Servidor en el puerto', app.get('port'));
})