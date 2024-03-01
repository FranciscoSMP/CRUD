// Se requieren los módulos necesarios.

const mysql = require('mysql'); // Módulo para interactuar con MySQL.
const { promisify } = require('util'); // Módulo para convertir funciones de devolución de llamada en promesas.

// Se importa la configuración de la base de datos desde un archivo externo.

const { base_de_datos } = require('./keys');

// Se crea un pool de conexiones utilizando la configuración de la base de datos.

const pool = mysql.createPool(base_de_datos);

// Función de devolución de llamada para manejar posibles errores de conexión.

pool.getConnection((err, connection) => {
    
    // Si hay un error, se manejan diferentes casos.

    if(err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('LA CONEXIÓN DE LA BASE DE DATOS SE CERRÓ');
        }
        if (err.code === 'ER_CON_COUNT_ERROR'){
            console.error('LA BASE DE DATOS TIENE MUCHAS CONEXIONES');
        }
        if (err.code === 'ECONNREFUSED'){
            console.error('CONEXIÓN DE LA BASE DE DATOS RECHAZADA');
        }
    }

    // Si hay una conexión, se libera.

    if (connection) connection.release();
    console.log('La Base de Datos está Conectada');

    return;
});

// Se convierten las consultas del pool en promesas para su manejo asíncrono.

pool.query = promisify(pool.query);

// Se exporta el pool de conexiones para que pueda ser utilizado en otros módulos.

module.exports = pool;
