/*
    Restaurantes
    ruta: '/api/hospitales'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getRestaurantes, crearRestaurante, actualizarRestaurante, borrarRestaurante } = require('../controllers/restaurantes');

const router = Router();


router.get('/', getRestaurantes);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del restaurante es necesario').not().isEmpty(),
        validarCampos
    ],
    crearRestaurante);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del restaurante es necesario').not().isEmpty(),
        validarCampos
    ],
    actualizarRestaurante);

router.delete('/:id', validarJWT, borrarRestaurante);






module.exports = router;