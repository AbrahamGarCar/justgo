/*
    Ruta:/api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getPropietarios, crearPropietario, actulizaPropietario, borrarPropietario } = require('../controllers/propietario');
const { validarJWT, validarADMIN_ROLE_o_MismoUsuario } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getPropietarios);

router.post(
    '/', [
        check('nombre', 'El nombre es oblidatorio').not().isEmpty(),
        check('password', 'La contraseña es oblidatoria').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ],
    crearPropietario);

router.put('/:id', [
        validarJWT,
        validarADMIN_ROLE_o_MismoUsuario,
        check('nombre', 'El nombre es oblidatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actulizaPropietario);

router.delete('/:id', [validarJWT, validarADMIN_ROLE_o_MismoUsuario], borrarPropietario);

module.exports = router;