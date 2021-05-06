const { response } = require('express');
const bcrypt = require('bcryptjs');


const Usuario = require('../models/usuario');
const validarCampos = require('../middlewares/validar-campos');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');
const usuario = require('../models/usuario');

const login = async(req, res = response) => {
    const { email, password } = req.body;
    try {
        //Verificar email
        const usuarioDB = await Usuario.findOne({ email });
        console.log(usuarioDB);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no valido'
            });
        }

        //Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            });
        }

        //Generar el TOKEN - JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd(usuarioDB.role),
            nombre: usuarioDB.nombre,
            apellido: usuarioDB.apellido,
            tipo: usuarioDB.tipo,
            // nombre: 
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const googleSignIn = async(req, res = response) => {
    const googleToken = req.body.token;

    try {
        const { name, email, picture } = await googleVerify(googleToken);

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if (!usuarioDB) {
            //si no existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@',
                img: picture,
                google: true
            });
        } else {
            //existe usuario
            usuario = usuarioDB;
            usuario.google = true;
        }
        //Guardar en base de datos
        await usuario.save();

        //Generar el TOKEN - JWT
        const token = await generarJWT(usuario.id);


        res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd(usuario.role)

        });


    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto',
            error: error.body
        });

    }
}

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    //Generar el TOKEN - JWT
    const token = await generarJWT(uid);

    //Obtener el usuario por UID
    const usuario = await Usuario.findById(uid);

    res.json({
        ok: true,
        token: token,
        usuario,
        menu: getMenuFrontEnd(usuario.role)
    });
}



module.exports = {
    login,
    googleSignIn,
    renewToken
}