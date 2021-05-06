require('dotenv').config();
const path = require('path');

const express = require('express');

const Server = require('./sockets/server');
const server = new Server();

var cors = require('cors');

const { dbConnection } = require('./database/config');

//Crear el servidor espress
// const app = express();
// BodyParser
// server.app.use(bodyParser.urlencoded({ extended: true }));
// server.app.use(bodyParser.json());

server.app.use( express.json() );

//conigurar cors
server.app.use(cors({ origin: true, credentials: true }));

// Lectura y parseo del body
// server.app.use(express.json());

//Servidor
// server.app.get('*', (req, res) => {
//     res.sendFile( path( __dirname, 'public/index.html' ) );
// });


//Base de datos
dbConnection();

//Directorio Publico
// app.use(express.static(publicPath));
// BodyParser

server.app.use(express.static('public'));


//Ruta
server.app.use('/api/usuarios', require('./routes/usuarios'));
server.app.use('/api/restaurantes', require('./routes/restaurantes'));
server.app.use('/api/repartidores', require('./routes/repartidores'));
server.app.use('/api/propietarios', require('./routes/propietarios'));
server.app.use('/api/menus', require('./routes/menu'));
server.app.use('/api/login', require('./routes/auth'));
server.app.use('/api/todo', require('./routes/busquedas'));
server.app.use('/api/upload', require('./routes/uploads'));
server.app.use('/api/mapa', require('./routes/mapa'));
server.app.use('/api/compras', require('./routes/compras'));

// //Lo ultimo
server.app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});


server.start(() => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});