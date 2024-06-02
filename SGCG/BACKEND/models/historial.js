const mongoose = require('mongoose');

const formatDate = (date) => {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Enero es 0
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
};

const historialSchema = new mongoose.Schema({
    tipo: String,
    datos: mongoose.Schema.Types.Mixed,
    eliminado_el: {
        type: String,
        default: () => formatDate(new Date())
    }
}, {
    collection: 'historial'
});

historialSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    }
});

const Historial = mongoose.model('Historial', historialSchema);
module.exports = Historial;

