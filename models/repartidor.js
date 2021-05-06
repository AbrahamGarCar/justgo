const { Schema, model } = require('mongoose');


const RepartidorSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    // restaurante: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Restaurante',
    //     required: true
    // }
});

RepartidorSchema.method('toJSON', function() {
    const { __v, password, ...object } = this.toObject();
    return object;
})
module.exports = model('Motociclista', RepartidorSchema);