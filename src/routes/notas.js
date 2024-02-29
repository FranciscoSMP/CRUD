const express = require('express'); // Importa Express para el enrutamiento.
const router = express.Router(); // Crea un nuevo enrutador de Express.

const pool = require('../base_de_datos'); // Importa la conexión a la base de datos.
const { isLoggedIn } = require('../lib/auth'); // Importa el middleware para verificar si el usuario ha iniciado sesión.

// Ruta para mostrar el formulario de agregar una nueva nota.

router.get('/add', isLoggedIn, (req, res) => {
    res.render('notas/add'); // Renderiza la vista para agregar una nueva nota.
});

// Ruta para procesar el formulario de agregar una nueva nota.

router.post('/add', isLoggedIn, async (req, res) => {
    const { titulo, nota } = req.body; // Obtiene el título y la nota del cuerpo de la solicitud.
    const nuevaNota = {
        titulo,
        nota,
        usuario_id: req.user.id // Asigna el ID del usuario actual a la nueva nota.
    };
    await pool.query('INSERT INTO notas set ?', [nuevaNota]); // Inserta la nueva nota en la base de datos.
    req.flash('success', 'Nota guardada correctamente');
    res.redirect('/notas'); // Redirige a la página de notas.
});

// Ruta para mostrar la lista de notas del usuario actual.

router.get('/', isLoggedIn, async (req, res) => {
    const notas = await pool.query('SELECT * FROM notas WHERE usuario_id = ?', [req.user.id]); // Obtiene todas las notas del usuario actual.
    res.render('notas/lista', { notas }); // Renderiza la vista de lista de notas con los datos obtenidos.
}); 

// Ruta para eliminar una nota específica.

router.get('/eliminar/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params; // Obtiene el ID de la nota a eliminar de los parámetros de la URL.
    await pool.query('DELETE FROM notas WHERE ID = ?', [id]); // Elimina la nota de la base de datos.
    req.flash('success', 'Nota removida correctamente');
    res.redirect('/notas'); // Redirige a la página de notas.
});

// Ruta para mostrar el formulario de edición de una nota.

router.get('/editar/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params; // Obtiene el ID de la nota a editar de los parámetros de la URL.
    const notas = await pool.query('SELECT * FROM notas WHERE id = ?', [id]); // Obtiene la información de la nota a editar.
    res.render('notas/editar', { nota: notas[0] }); // Renderiza la vista de edición de notas con la información obtenida.
});

// Ruta para procesar el formulario de edición de una nota.

router.post('/editar/:id', isLoggedIn, async (req, res) =>{
    const { id } = req.params; // Obtiene el ID de la nota a editar de los parámetros de la URL.
    const { titulo, nota } = req.body; // Obtiene el título y la nota editada del cuerpo de la solicitud.
    const nuevaNota = {
        titulo,
        nota
    };
    await pool.query('UPDATE notas set ? WHERE id = ?', [nuevaNota, id]); // Actualiza la nota en la base de datos.
    req.flash('success', 'Nota actualizada correctamente');
    res.redirect('/notas'); // Redirige a la página de notas.
});

// Exporta el enrutador para su uso en otras partes de la aplicación.

module.exports = router; 
