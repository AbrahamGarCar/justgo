const { response } = require('express');
const Restaurante = require('../models/restaurante');


// cambios
const getRestaurantes = async(req, res = response) => {

    const restaurantes = await Restaurante.find().populate('usuario', 'nombre');

    res.json({
        ok: true,
        restaurantes
    });

}

const crearRestaurante = async(req, res = response) => {

    const uid = req.uid;
    const restaurante = new Restaurante({
        usuario: uid,
        ...req.body
    });


    try {
        const restauranteDB = await restaurante.save();
        res.json({
            ok: true,
            restaurante: restauranteDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


}

const actualizarRestaurante = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const restaurante = await Restaurante.findById(id);

        if (!restaurante) {
            return res.status(404).json({
                ok: false,
                msg: 'hospital no encontrado por id',
            });
        }

        const cambiosRestaurante = {
            ...req.body,
            usuario: uid
        }

        const restauranteActualizado = await Restaurante.findByIdAndUpdate(id, cambiosRestaurante, { new: true });

        res.json({
            ok: true,
            restaurante: restauranteActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const borrarRestaurante = async(req, res = response) => {
    const id = req.params.id;

    try {

        const restaurante = await Restaurante.findById(id);

        if (!restaurante) {
            return res.status(404).json({
                ok: false,
                msg: 'hospital no encontrado por id',
            });
        }

        await Restaurante.findByIdAndDelete(id);


        res.json({
            ok: true,
            msg: 'Hospital eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

module.exports = {
     getRestaurantes,
     crearRestaurante,
     actualizarRestaurante,
     borrarRestaurante,
};