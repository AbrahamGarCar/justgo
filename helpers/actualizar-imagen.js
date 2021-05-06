const fs = require('fs');


const Usuario = require('../models/repartidor');
const Motociclista = require('../models/repartidor');
const Restaurante = require('../models/restaurante');

const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        //borrar la imagen anterior
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async(tipo, id, nombreArchivo) => {

    switch (tipo) {
        case 'motociclistas':
            const medico = await Motociclista.findById(id);
            if (!medico) {
                console.log('No es un medico');
                return false;
            }

            pathViejo = `./uploads/medicos/${ medico.img }`;
            borrarImagen(pathViejo);

            medico.img = nombreArchivo;
            await medico.save();
            return true;
            break;

        case 'restaurantes':
            const hospital = await Restaurante.findById(id);
            if (!hospital) {
                console.log('No es un hospital');
                return false;
            }

            pathViejo = `./uploads/restaurantes/${ hospital.img }`;
            borrarImagen(pathViejo);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
            break;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No es un usuario');
                return false;
            }

            pathViejo = `./uploads/usuarioses/${ usuario.img }`;
            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            break;

            break;

        default:
            break;
    }

}

module.exports = {
    actualizarImagen
}