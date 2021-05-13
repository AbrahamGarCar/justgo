require('dotenv').config();

const express = require('express');

const http = require('http');

const socket = require('./socket');

class Server {

    constructor() {
        this._intance = Server;
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.httpServer = new http.Server(this.app);
        // this.io = socketIO(this.httpServer);
        this.io = require("socket.io")(this.httpServer, {
            cors: {
                // origin: true,
                // origin: "https://sanguine-fusion-300917.uc.r.appspot.com",
                // origin: "http://localhost:5000",
                origin:  "https://justgooo.herokuapp.com",
                // origin:  "http://localhost",
                methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
                credentials: true
            },
        });
        this.escucharSockets();
    }

    get instance() {
        return this._intance || (this._intance = new this());
    }


    escucharSockets() {

        console.log('Escuchando conexiones - sockets');

        this.io.on('connection', cliente => {

            // Conectar cliente
            socket.conectarCliente(cliente, this.io);

            // Configuracion de mapas
            socket.mapaSockets(cliente, this.io);

            // Configurar usuario
            socket.configurarUsuario(cliente, this.io);

            // Obtener usuarios activos
            socket.obtenerUsuarios(cliente, this.io);

            // Mensajes
            socket.mensaje(cliente, this.io);

            // Desconectar
            socket.desconectar(cliente, this.io);

        });

    }

    start(callback) {
        this.httpServer.listen(this.port, callback);
    }

}

module.exports = Server;