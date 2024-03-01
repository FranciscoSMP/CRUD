// Importación del módulo bcrypt para cifrar y comparar contraseñas de forma segura.

const bcrypt = require('bcryptjs');

// Declaración de un objeto llamado 'helpers' para contener las funciones relacionadas con el cifrado de contraseñas.

const helpers = {};

// Función asincrónica para cifrar una contraseña.

helpers.cifrarContrasenia = async (contrasenia) => {
    
    // Generación de un 'salt' (valor aleatorio) para fortalecer el cifrado.

    const salt = await bcrypt.genSalt(10);
    
    // Cifrado de la contraseña utilizando el 'salt' generado.
    
    const hash = await bcrypt.hash(contrasenia, salt);
    
    // Devolución del hash cifrado.
    
    return hash;
};

// Función asincrónica para comparar una contraseña proporcionada con una contraseña cifrada guardada.

helpers.compararContrasenia = async (contrasenia, savedPassword) => {
    try {
        
        // Comparación de la contraseña proporcionada con la contraseña cifrada guardada.

        return await bcrypt.compare(contrasenia, savedPassword);
    } catch (e) {
        
        // Manejo de errores en caso de que ocurra alguna excepción durante la comparación.

        console.log(e);
    }
};

// Exportación del objeto 'helpers' para que pueda ser utilizado en otros módulos de Node.js.

module.exports = helpers;
