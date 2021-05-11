
const UsuariosLista = require('./usuarios-lista');
const Usuario = require('../classes/usuario');


const usuariosConectados = new UsuariosLista();

const Mapa = require('../classes/mapa');
const mapa = new Mapa();

// Eventos de mapa
const mapaSockets = (cliente, io) => {
    //recibe posicion
    cliente.on('marcador-nuevo', (marcador) => {
        console.log('agregar marcador');
        mapa.agregarMarcador(marcador);
        //emite a todos la posicion menos al que lo mando
        cliente.broadcast.emit('marcador-nuevo', marcador);
    });

    cliente.on('marcador-borrar', (id) => {
        mapa.borrarMarcador(id);
        cliente.broadcast.emit('marcador-borrar', id);
    });

    cliente.on('marcador-mover', (marcador) => {
        console.log(marcador);
        mapa.moverMarcador(marcador);
        cliente.broadcast.emit('marcador-mover', marcador);
    });
}

const conectarCliente = (cliente, io) => {
    console.log('conecte de cliente');
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
    // io.emit('usuarios-activos', usuariosConectados.getLista() );

}

const desconectar = (cliente, io) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', usuariosConectados.getLista());
    });
}

// Escuchar mensajes
const mensaje = (cliente, io) => {
    cliente.on('mensaje', (payload) => {
        console.log('Mensaje recibido', payload);
        io.emit('mensaje-nuevo', payload);
    });
}

// Configurar usuario
const configurarUsuario = (cliente, io) => {
    cliente.on('configurar-usuario', (payload, callback = Function) => {
        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        io.emit('usuarios-activos', usuariosConectados.getLista());
       
        // callback({
        //     ok: true,
        //     mensaje: `Usuario ${ payload.nombre }, configurado`
        // });
    });
}

// Obtener Usuarios
const obtenerUsuarios = (cliente, io) => {
    cliente.on('obtener-usuarios', () => {
        // Emite al cliente que acaba de entrar.
        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
    });
}

module.exports = {
    mapaSockets,
    conectarCliente,
    desconectar,
    mensaje,
    configurarUsuario,
    obtenerUsuarios
}