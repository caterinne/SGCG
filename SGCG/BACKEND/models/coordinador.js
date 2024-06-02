const mongoose = require('mongoose');

const coordinadorSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    email: String,
    tipo_coordinador: String,
    institucion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Institucion'
    }
}, {
    collection: 'coordinadores'
});

coordinadorSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    }
});

const Coordinador = mongoose.model('Coordinador', coordinadorSchema);
module.exports = Coordinador;