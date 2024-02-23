const express = require('express');
const router = express.Router();

const pool = require('../base_de_datos');

router.get('/add', (req, res) => {
    res.render('notas/add');
});

router.post('/add', (req, res) => {
    res.send('recibido');
});

module.exports = router;