const express = require('express');
const router = express.Router();

const pool = require('../base_de_datos');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('notas/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
    const { titulo, nota } = req.body;
    const nuevaNota = {
        titulo,
        nota,
        usuario_id: req.user.id
    };
    await pool.query('INSERT INTO notas set ?', [nuevaNota]);
    req.flash('success', 'Nota guardada correctamente');
    res.redirect('/notas');
});

router.get('/', isLoggedIn, async (req, res) => {
    const notas = await pool.query('SELECT * FROM notas WHERE usuario_id = ?', [req.user.id]);
    res.render('notas/lista', { notas });
}); 

router.get('/eliminar/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM notas WHERE ID = ?', [id]);
    req.flash('success', 'Nota removida correctamente');
    res.redirect('/notas');
});

router.get('/editar/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const notas = await pool.query('SELECT * FROM notas WHERE id = ?', [id]);
    res.render('notas/editar', {nota: notas[0]});
});

router.post('/editar/:id', isLoggedIn, async (req, res) =>{
    const { id } = req.params;
    const { titulo, nota } = req.body;
    const nuevaNota = {
        titulo,
        nota
    };
    await pool.query('UPDATE notas set ? WHERE id = ?', [nuevaNota, id]);
    req.flash('success', 'Nota actualizada correctamente');
    res.redirect('/notas');
});

module.exports = router;