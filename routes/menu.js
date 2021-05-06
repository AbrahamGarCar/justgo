/*
    Menus
    ruta: '/api/menu'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getMenus, crearMenu, actualizarMenu, borrarMenu } = require('../controllers/menu');

const router = Router();


router.get('/', getMenus);

router.post(
    '/', [
        validarJWT,
        check('nombre', 'El nombre del restaurante es necesario').not().isEmpty(),
        check('descripcion', 'La descripcion del platillo es necesario').not().isEmpty(),
        check('restaurante', 'El restaurante id debe de ser valido').isMongoId(),
        validarCampos
    ],
    crearMenu);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del restaurante es necesario').not().isEmpty(),
        check('descripcion', 'La descripcion del platillo es necesario').not().isEmpty(),
        check('restaurante', 'El restaurante id debe de ser valido').isMongoId(),
        validarCampos
    ],
    actualizarMenu);

router.delete('/:id', validarJWT, borrarMenu);






module.exports = router;