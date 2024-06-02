const express = require('express');
const Institucion = require('../models/institucion');

const router = express.Router();

// Obtener todas las instituciones
router.get('/', async (req, res) => {
    try {
        const instituciones = await Institucion.find({});
        res.send(instituciones);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Obtener todas las instituciones con coordinadores asociados
router.get('/con-coordinadores', async (req, res) => {
    try {
        const instituciones = await Institucion.find({}).populate('coordinadores');
        res.send(instituciones);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Obtener una institución por ID
router.get('/:id', async (req, res) => {
    try {
        const institucion = await Institucion.findById(req.params.id);
        if (!institucion) {
            return res.status(404).send({ message: "Institución no encontrada" });
        }
        res.send(institucion);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Agregar una institución
router.post('/crear', async (req, res) => {
    try {
        const nuevaInstitucion = new Institucion(req.body);
        await nuevaInstitucion.save();
        res.status(201).send(nuevaInstitucion);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Actualizar una institución por ID
router.put('/:id', async (req, res) => {
    try {
        const institucion = await Institucion.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!institucion) {
            return res.status(404).send({ message: "Institución no encontrada" });
        }
        res.send(institucion);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Eliminar una institución por ID
router.delete('/:id', async (req, res) => {
    try {
        const institucion = await Institucion.findByIdAndDelete(req.params.id);
        if (!institucion) {
            return res.status(404).send({ message: "Institución no encontrada" });
        }
        res.send(institucion);
    } catch (error) {
        console.error('Error al eliminar la institución:', error);
        res.status(500).send(error);
    }
});

module.exports = router;