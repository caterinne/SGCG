const express = require('express');
const Convenio = require('../models/convenio');
const Historial = require('../models/historial');

const router = express.Router();

// Obtener convenios por vigencia próxima a expirar
router.get('/proximos-a-expirar', async (req, res) => {
    try {
        const hoy = new Date();
        const cincoDiasDespues = new Date();
        cincoDiasDespues.setDate(hoy.getDate() + 5); // Obtener fecha 5 días después

        const convenios = await Convenio.find({
            vigencia: {
                $gte: hoy, // Fecha de hoy o después
                $lte: cincoDiasDespues // Fecha dentro de los próximos 5 días
            }
        });

        res.send(convenios);
    } catch (error) {
        console.error('Error al obtener los convenios próximos a expirar:', error);
        res.status(500).send(error);
    }
});

// Obtener todos los convenios
router.get('/', async (req, res) => {
    try {
        const convenios = await Convenio.find({})
            .populate('coordinador')
            .populate({
                path: 'coordinador',
                populate: {
                    path: 'institucion',
                    model: 'Institucion'
                }
            });
        res.send(convenios);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Obtener un convenio por ID
router.get('/:id', async (req, res) => {
    try {
        const convenio = await Convenio.findById(req.params.id)
            .populate('coordinador')
            .populate({
                path: 'coordinador',
                populate: {
                    path: 'institucion',
                    model: 'Institucion'
                }
            });
        if (!convenio) {
            return res.status(404).send({ message: "Convenio no encontrado" });
        }
        res.send(convenio);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Agregar un convenio
router.post('/crear', async (req, res) => {
    try {
        const { vigencia, ...rest } = req.body;
        const nuevoConvenio = new Convenio({
            ...rest,
            vigencia: new Date(vigencia)
        });

        await nuevoConvenio.save();
        res.status(201).send(nuevoConvenio);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Actualizar un convenio por ID
router.put('/:id', async (req, res) => {
    try {
        const convenio = await Convenio.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!convenio) {
            return res.status(404).send({ message: "Convenio no encontrado" });
        }
        res.send(convenio);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Eliminar un convenio por ID
router.delete('/:id', async (req, res) => {
    try {
        const convenio = await Convenio.findByIdAndDelete(req.params.id)
            .populate('coordinador')
            .populate({
                path: 'coordinador',
                populate: {
                    path: 'institucion',
                    model: 'Institucion'
                }
            });

        if (!convenio) {
            return res.status(404).send({ message: "Convenio no encontrado" });
        }

        // Mover el convenio eliminado al historial
        const historialEntry = new Historial({
            tipo: 'Convenio',
            datos: {
                convenio: convenio.toObject()
            }
        });

        await historialEntry.save();

        res.send(convenio);
    } catch (error) {
        console.error('Error al eliminar el convenio:', error);
        res.status(500).send(error);
    }
});
module.exports = router;
