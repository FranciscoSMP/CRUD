const mysql = require('mysql');

const {base_de_datos} = require('./keys');

const pool = mysql.createPool(base_de_datos);

pool.getConnection((err, connection) => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST'){
        console.error('DATABASE CONNECTION WAS CLOSED');
    }
    if (err.code === 'ER_CON_COUNT_ERROR'){
        console.error('DATABASE HAS TO MANY CONNECTIONS');
    }
});