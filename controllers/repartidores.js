const { response } = require('express');
const Repartidor = require('../models/repartidor');

const getRepartidores = async(req, res = response) => {
    const medicos = await Repartidor.find().populate('usuario', 'nombre')
        .populate('restaurante', 'nombre')

    res.json({
        ok: true,
        medicos
    });

}

const crearRepartidores = async(req, res = response) => {

    const uid = req.uid;
    const repartidor = new Repartidor({
        usuario: uid,
        ...req.body
    });


    try {
        const repartidorDB = await repartidor.save();
        res.json({
            ok: true,
            repartidor: repartidorDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const actualizarRepartidor = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;


    try {

        const Repartidor = await Repartidor.findById(id);

        if (!Repartidor) {
            return res.status(404).json({
                ok: false,
                msg: 'medico no encontrado por id',
            });
        }

        const cambiosRepartidor = {
            ...req.body,
            usuario: uid,
        }

        const repartidorActualizado = await Repartidor.findByIdAndUpdate(id, cambiosRepartidor, { new: true });

        res.json({
            ok: true,
            repartidor: repartidorActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const borrarRepartidor = async(req, res = response) => {
    const id = req.params.id;

    try {

        const repartidor = await Repartidor.findById(id);

        if (!repartidor) {
            return res.status(404).json({
                ok: false,
                msg: 'hospital no encontrado por id',
            });
        }

        await Repartidor.findByIdAndDelete(id);


        res.json({
            ok: true,
            msg: 'Medico eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const getRepartidorById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const repartidor = await Repartidor.findById(id).populate('usuario', 'nombre')
            .populate('hospital', 'nombre')

        res.json({
            ok: true,
            repartidor: repartidor
        });

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

module.exports = {
    getRepartidores,
    crearRepartidores,
    actualizarRepartidor,
    borrarRepartidor,
    getRepartidorById
}