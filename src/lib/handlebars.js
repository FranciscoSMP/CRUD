const { format } = require('timeago.js');

const helpers = {};

helpers.timeago = (timestamp) => {
  console.log(timestamp);
  return format(timestamp, 'es');
};

module.exports = helpers;