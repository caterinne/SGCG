const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    email: String,
    contrasena: String,
    rol: String
}, {
    collection: 'usuarios'
});

usuarioSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;