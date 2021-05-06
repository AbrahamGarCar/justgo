const { Schema, model } = require('mongoose');


const MenuSchema = Schema({
    img: {
        type: String,

    },
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true,
        unique: true
    },
    restaurante: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurante'
    }


});

MenuSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})
module.exports = model('Menu', MenuSchema);