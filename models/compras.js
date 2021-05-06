const { Schema, model } = require('mongoose');

const ComprasSchema = Schema({
    created: {
        type: Date,
        default: Date.nows
    },
    usuario: {
        required: true,
        type:  Schema.Types.ObjectId,
    },
    platillos: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Compras', ComprasSchema);