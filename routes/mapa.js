const { Router } = require('express');
const router = Router();
const Server = require('../sockets/server');

const Mapa = require('../classes/mapa');
const mapa = new Mapa();

router.get('/', (req, res) => {
    console.log('entre a ruta mapa');
    res.json(mapa.getMarcadores());
});

router.post('/mensajes/:id', (req, res) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;

    server.io.in(id).emit('mensaje-privado', payload);

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });

});


// Servicio para obtener todos los IDs de los usuarios
router.get('/usuarios', (req, res) => {

    const server = Server.instance;

    server.io.clients((err, clientes) => {

        if (err) {
            return res.json({
                ok: false,
                err
            })
        }


        res.json({
            ok: true,
            clientes
        });


    });

});

// Obtener usuarios y sus nombres
router.get('/usuarios/detalle', (req, res) => {


    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    });


});



module.exports = router;