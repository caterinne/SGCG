const express = require('express');
const Historial = require('../models/historial');

const router = express.Router();

// Obtener todos los registros del historial
router.get('/', async (req, res) => {
    try {
        const historial = await Historial.find({});
        res.send(historial);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
