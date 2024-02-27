const bcrypt = require('bcryptjs');

const helpers = {};

helpers.cifrarContrasenia = async (contrasenia) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(contrasenia, salt);
    return hash;
};

helpers.compararContrasenia = async (contrasenia, savedPassword) => {
    try {
        return await bcrypt.compare(contrasenia, savedPassword);
    } catch (e) {
        console.log(e);
    }
};

module.exports = helpers;