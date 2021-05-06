//get todo
const { response } = require('express');

const Usuario = require('../models/usuario');
const Medico = require('../models/repartidor');
const Restaurante = require('../models/restaurante');

const getTodo = async(req, res = response) => {
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    const [usuarios, repartidores, restaurantes] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Restaurante.find({ nombre: regex }),
    ]);

    res.json({
        ok: true,
        usuarios,
        repartidores,
        restaurantes
    });
}

const getDocumentosColeccion = async(req, res = response) => {
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                .populate('usuario', 'nombre img')
                .populate('restaurante', 'nombre img');
            break;

        case 'rastaurantes':
            data = await Restaurante.find({ nombre: regex })
                .populate('usuario', 'nombre img');

            break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex });

            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/motociclista/restaurantes'
            });


    }

    res.status(200).json({
        ok: true,
        resultados: data
    });
}

module.exports = {
    getTodo,
    getDocumentosColeccion

}