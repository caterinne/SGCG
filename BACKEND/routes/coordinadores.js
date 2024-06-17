const express = require('express');
const Coordinador = require('../models/coordinador');
const Institucion = require('../models/institucion');

const router = express.Router();

// Obtener todos los coordinadores
router.get('/', async (req, res) => {
    try {
        const coordinadores = await Coordinador.find({}).populate('institucion');
        res.send(coordinadores);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Obtener un coordinador por ID
router.get('/:id', async (req, res) => {
    try {
        const coordinador = await Coordinador.findById(req.params.id).populate('institucion');
        if (!coordinador) {
            return res.status(404).send({ message: "Coordinador no encontrado" });
        }
        res.send(coordinador);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Agregar un coordinador utilizando el ID de la institución
router.post('/crear', async (req, res) => {
    try {
        const nuevaInstitucion = await Institucion.findById(req.body.institucion);
        if (!nuevaInstitucion) {
            return res.status(404).send({ message: "Institución no encontrada" });
        }

        const nuevoCoordinador = new Coordinador({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            tipo_coordinador: req.body.tipo_coordinador,
            email: req.body.email,
            institucion: nuevaInstitucion._id
        });

        await nuevoCoordinador.save();
        res.status(201).send(nuevoCoordinador);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Actualizar un coordinador por ID
router.put('/:id', async (req, res) => {
    try {
        const coordinador = await Coordinador.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!coordinador) {
            return res.status(404).send({ message: "Coordinador no encontrado" });
        }
        res.send(coordinador);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Eliminar un coordinador por ID
router.delete('/:id', async (req, res) => {
    try {
        const coordinador = await Coordinador.findByIdAndDelete(req.params.id);
        if (!coordinador) {
            return res.status(404).send({ message: "Coordinador no encontrado" });
        }
        res.send(coordinador);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Obtener coordinadores por ID de institución
router.get('/institucion/:institucionId', async (req, res) => {
    try {
        const coordinadores = await Coordinador.find({ institucion: req.params.institucionId });
        res.send(coordinadores);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;