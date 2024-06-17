const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const renovacionSchema = new Schema({
    convenio: { type: Schema.Types.ObjectId, ref: 'Convenio', required: true },
    fechaRenovacion: { type: Date, required: true },
    nuevaVigencia: { type: Date, required: true }
});

module.exports = mongoose.model('Renovacion', renovacionSchema);
