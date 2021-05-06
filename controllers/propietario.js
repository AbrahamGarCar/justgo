const { response } = require('express');
const bcrypt = require('bcryptjs');

const Propietario = require('../models/propietario');
const { generarJWT } = require('../helpers/jwt');

const getPropietarios = async(req, res) => {
    const desde = Number(req.query.desde) || 0;


    const [propietarios, total] = await Promise.all([
        Propietario
        .find({}, 'nombre email role google img')
        .skip(desde)
        .limit(5),
        Propietario.countDocuments()
    ]);

    res.json({
        ok: true,
        propietarios,
        total
    });
}

const crearPropietario = async(req, res = response) => {
    console.log(req.body);
    const { email, password } = req.body;



    try {
        const existeEmail = await Propietario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }
        const propietario = new Propietario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        propietario.password = bcrypt.hashSync(password, salt);

        //Guardar usuario
        await propietario.save();

        //Generar el TOKEN - JWT
        const token = await generarJWT(propietario.id);

        res.json({
            ok: true,
            propietario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado.. revisar logs'
        });
    }

}

const actulizaPropietario = async(req, res = response) => {
    const uid = req.params.id;


    try {
        const propietarioDB = await Propietario.findById(uid);

        if (!propietarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        // Actualizaciones
        const { password, google, email, ...campos } = req.body;

        if (propietarioDB.email !== email) {

            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        if (!propietarioDB.google) {
            campos.email = email;
        } else if (propietarioDB.email !== email) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario de Google no pueden cambiar su correo'
            });
        }
        const propietarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuario: propietarioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const borrarPropietario = async(req, res = response) => {
    const uid = req.params.id;

    try {

        const propietarioDB = await Propietario.findById(uid);

        if (!propietarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        await Propietario.findByIdAndDelete(uid);

        res.status(200).json({
            ok: true,
            msg: 'Propietario eliminado'
        });

    } catch (error) {
        console.log(error);
        res, status(500).json({
            ok: false,
            msg: 'Error con deste de la desta'
        });

    }
}

module.exports = {
    getPropietarios,
    crearPropietario,
    actulizaPropietario,
    borrarPropietario
}