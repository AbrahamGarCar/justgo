const { response } = require('express');

const Menu = require('../models/menu');

const getMenus = async(req, res) => {
    const desde = Number(req.query.desde) || 0;


    const [menus, total] = await Promise.all([
        Menu
        .find({}, 'img nombre descripcion')
        .skip(desde)
        .limit(5),
        Menu.countDocuments()
    ]);

    res.json({
        ok: true,
        menus: menus,
        total
    });
}

const crearMenu = async(req, res = response) => {

    const uid = req.uid;
    const menu = new Menu({
        restaurante: uid,
        ...req.body
    });

    try {
        const menuDB = await menu.save();
        res.json({
            ok: true,
            menu: menuDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const actualizarMenu = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const menu = await Menu.findById(id);

        if (!menu) {
            return res.status(404).json({
                ok: false,
                msg: 'menu no encontrado por id',
            });
        }

        const cambiosMenu = {
            ...req.body,
            usuario: uid
        }

        const menuActualizado = await Menu.findByIdAndUpdate(id, cambiosMenu, { new: true });

        res.json({
            ok: true,
            menu: menuActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const borrarMenu = async(req, res = response) => {
    const id = req.params.id;

    try {

        const menu = await Menu.findById(id);

        if (!menu) {
            return res.status(404).json({
                ok: false,
                msg: 'menu no encontrado por id',
            });
        }

        await Menu.findByIdAndDelete(id);


        res.json({
            ok: true,
            msg: 'Menu eliminado'
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
    getMenus,
    crearMenu,
    actualizarMenu,
    borrarMenu
}