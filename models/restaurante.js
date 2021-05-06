const { Schema, model } = require('mongoose');


const RestauranteSchema = Schema({
    img: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    horario: {
        type: String,
        required: true
    },
    propietario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Propietario'
    },

}, { collection: 'restaurantes' });

RestauranteSchema.method('toJSON', function() {
    const { __v, password, ...object } = this.toObject();
    return object;
})
module.exports = model('Restaurante', RestauranteSchema);