const mongoose = require('mongoose');
const Historial = require('./historial');
const Coordinador = require('./coordinador');
const Convenio = require('./convenio');

const institucionSchema = new mongoose.Schema({
    nombre_institucion: String,
    tipo_institucion: String,
    departamento: String,
    pais: String
}, {
    collection: 'instituciones'
});

institucionSchema.pre('findOneAndDelete', async function(next) {
    try {
        const institucion = await this.model.findOne(this.getQuery());

        if (institucion) {
            const coordinadores = await Coordinador.find({ institucion: institucion._id });
            const convenios = await Convenio.find({ coordinador: { $in: coordinadores.map(coord => coord._id) } });

            const historialEntry = new Historial({
                tipo: 'Institucion',
                datos: {
                    institucion: institucion.toObject({ transform: removeVersionKey }),
                    coordinadores: coordinadores.map(coord => coord.toObject({ transform: removeVersionKey })),
                    convenios: convenios.map(conv => conv.toObject({ transform: removeVersionKey }))
                }
            });

            await historialEntry.save();
            await Coordinador.deleteMany({ institucion: institucion._id });
            await Convenio.deleteMany({ coordinador: { $in: coordinadores.map(coord => coord._id) } });
        }

        next();
    } catch (error) {
        next(error);
    }
});

institucionSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    }
});

function removeVersionKey(doc, ret, options) {
    delete ret.__v;
    return ret;
}

const Institucion = mongoose.model('Institucion', institucionSchema);
module.exports = Institucion;