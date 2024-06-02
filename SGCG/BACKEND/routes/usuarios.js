const express = require('express');
const Usuario = require('../models/usuario');

const router = express.Router();

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find({});
        res.send(usuarios);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Obtener un usuario por ID
router.get('/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }
        res.send(usuario);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Crear un nuevo usuario
router.post('/crear', async (req, res) => {
    try {
        const usuario = new Usuario(req.body);
        await usuario.save();
        res.status(201).send(usuario);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Actualizar un usuario por ID
router.put('/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!usuario) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }
        res.send(usuario);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Eliminar un usuario por ID
router.delete('/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuario) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }
        res.send(usuario);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;