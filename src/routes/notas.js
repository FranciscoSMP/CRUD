const express = require('express');
const router = express.Router();

const pool = require('../base_de_datos');

router.get('/add', (req, res) => {
    res.render('notas/add');
});

router.post('/add', async (req, res) => {
    const { titulo, nota } = req.body;
    const nuevaNota = {
        titulo,
        nota
    };
    await pool.query('INSERT INTO notas set ?', [nuevaNota]);
    res.redirect('/notas');
});

router.get('/', async (req, res) => {
    const notas = await pool.query('SELECT * FROM notas');
    res.render('notas/lista', { notas });
}); 

router.get('/eliminar/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM notas WHERE ID = ?', [id]);
    res.redirect('/notas');
});

router.get('/editar/:id', async (req, res) => {
    const { id } = req.params;
    const notas = await pool.query('SELECT * FROM notas WHERE id = ?', [id]);
    res.render('notas/editar', {nota: notas[0]});
});

router.post('/editar/:id', async (req, res) =>{
    const { id } = req.params;
    const { titulo, nota } = req.body;
    const nuevaNota = {
        titulo,
        nota
    };
    console.log(nuevaNota);
    await pool.query('UPDATE notas set ? WHERE id = ?', [nuevaNota, id]);
    req.flash('success', 'Link Updated Successfully');
    res.redirect('/notas');
});

module.exports = router;