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
    const { nombre, apellido, email, contrasena, rol } = req.body;

    try {
        const nuevoUsuario = new Usuario({
            nombre,
            apellido,
            email,
            contrasena, 
            rol,
        });

        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Error al crear usuario', error });
    }
});

// Actualizar un usuario por ID
router.put('/:id', async (req, res) => {
    try {
        const { contrasena, ...rest } = req.body;
        if (contrasena) {
            rest.contrasena = contrasena;
        }
        const usuario = await Usuario.findByIdAndUpdate(req.params.id, rest, { new: true, runValidators: true });
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


// Ruta de login
router.post('/login', async (req, res) => {
    const { email, contrasena } = req.body;

    try {
        const user = await Usuario.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        if (user.contrasena !== contrasena) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        res.json({
            email: user.email,
            rol: user.rol,
        });
    } catch (error) {
        console.error('Error del servidor:', error);
        res.status(500).json({ message: 'Error del servidor', error });
    }
});


module.exports = router;
