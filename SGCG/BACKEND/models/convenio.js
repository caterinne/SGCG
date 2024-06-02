const mongoose = require('mongoose');

const convenioSchema = new mongoose.Schema({
    nombre_convenio: String,
    tipo_convenio: String,
    alcance: String,
    vigencia: {
        type: Date,
        required: true
    },
    ano_firma: String,
    tipo_firma: String,
    cupos: String,
    documentos: String,
    coordinador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coordinador'
    }
}, {
    collection: 'convenios',
});

convenioSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    }
});

const Convenio = mongoose.model('Convenio', convenioSchema);
module.exports = Convenio;
