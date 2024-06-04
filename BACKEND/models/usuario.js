const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    email: { type: String, unique: true, required: true },
    contrasena: { type: String, required: true },
    rol: { type: String, required: true }
}, {
    collection: 'usuarios'
});

usuarioSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;
        delete ret.contrasena;
        return ret;
    }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;