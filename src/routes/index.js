// Importación del módulo express para crear el enrutador.

const express = require('express');

// Creación de un enrutador utilizando el método Router de express.

const router = express.Router();

// Definición de la ruta GET para la raíz del sitio ('/').

router.get('/', (req, res) => {

    // Función de devolución de llamada para manejar la solicitud GET.
    // Renderiza la plantilla 'index' y la envía como respuesta al cliente.

    res.render('index');
});

// Exportación del enrutador para su uso en otros módulos de la aplicación.

module.exports = router;