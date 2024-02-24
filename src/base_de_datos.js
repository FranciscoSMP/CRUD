const mysql = require('mysql');
const { promisify } = require('util');

const { base_de_datos } = require('./keys');

const pool = mysql.createPool(base_de_datos);

pool.getConnection((err, connection) => {
    
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

    if (connection) connection.release();
    console.log('La Base de Datos está Conectada');

    return;
});

// Promisify Pool Querys

pool.query = promisify(pool.query);

module.exports = pool;