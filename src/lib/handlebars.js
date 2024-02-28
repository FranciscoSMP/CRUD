// Importando la función format de la biblioteca timeago.js para formatear timestamps.

const { format } = require('timeago.js');

// Objeto llamado helpers.

const helpers = {};

// Define una función timeago dentro del objeto helpers que toma un timestamp como argumento.

helpers.timeago = (timestamp) => {

  // Retornando timestamp fromateada  por la función format.

  return format(timestamp);
};

// Exportando el objeto helpers para que pueda ser utilizado por otros módulos.

module.exports = helpers;
