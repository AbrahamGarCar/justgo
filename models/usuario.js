const { Schema, model } = require('mongoose');

const LocacionShema = new Schema({
    lng:{
        type: Number,
        require: false
    },
    lat: {
        type: Number,
        require: false
    }
});


const UsuarioSchema = Schema({
    created: {
        type: Date,
        default: Date.now()
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'ADMIN'
    },
    tipo: {
        type: String,
        required: true,
        default: 'Cliente',  
    },
    img: {
        type: String,
    },
    // locacion: [
        
    //     LocacionShema
    // ],
    google: {
        type: Boolean,
        default: false
    }
});

UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Usuario', UsuarioSchema);