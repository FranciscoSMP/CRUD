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
    res.send('recibido');
});

module.exports = router;