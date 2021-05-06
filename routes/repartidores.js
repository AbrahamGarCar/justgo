/*
    Hospitales
    ruta: '/api/motociclistas'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getRepartidores, crearRepartidores, actualizarRepartidor, borrarRepartidor, getRepartidorById } = require('../controllers/repartidores')

const router = Router();


router.get('/', getRepartidores);

router.post(
    '/', [
        validarJWT,
        check('nombre', 'El nombre del motociclista es necesario').not().isEmpty(),
        // check('restaurante', 'El restaurante id debe de ser valido').isMongoId(),
        validarCampos
    ],
    crearRepartidores);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del motociclista es necesario').not().isEmpty(),
        // check('restaurante', 'El restairante id debe de ser valido').isMongoId(),
        validarCampos
    ],
    actualizarRepartidor);

router.delete('/:id', validarJWT, borrarRepartidor);
router.get('/:id', validarJWT, getRepartidorById);






module.exports = router;