const express = require('express');
const router = express.Router();
const Convenio = require('../models/convenio');
const Renovacion = require('../models/renovacion');

// Renovar un convenio por ID
router.put('/:id', async (req, res) => {
    try {
        const { vigencia } = req.body;
        if (!vigencia) {
            return res.status(400).send({ message: "La nueva vigencia es requerida" });
        }

        const convenioActual = await Convenio.findById(req.params.id);
        if (!convenioActual) {
            return res.status(404).send({ message: "Convenio no encontrado" });
        }

        // Crear una entrada en el modelo de renovación
        const renovacionEntry = new Renovacion({
            convenio: convenioActual._id,
            fechaRenovacion: new Date(),
            nuevaVigencia: new Date(vigencia)
        });

        await renovacionEntry.save();

        // Actualizar vigencia en el convenio
        convenioActual.vigencia = new Date(vigencia);
        await convenioActual.save();

        res.send(convenioActual);
    } catch (error) {
        console.error('Error al renovar el convenio:', error);
        res.status(400).send({ message: "Error al renovar el convenio", error });
    }
});

// Obtener historial de renovaciones por ID de convenio
router.get('/historial/:convenioId', async (req, res) => {
    try {
        const historial = await Renovacion.find({ convenio: req.params.convenioId }).sort({ fechaRenovacion: -1 });
        res.send(historial);
    } catch (error) {
        console.error('Error al obtener el historial de renovaciones:', error);
        res.status(400).send({ message: "Error al obtener el historial de renovaciones", error });
    }
});

module.exports = router;
