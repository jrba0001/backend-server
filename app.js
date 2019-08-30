// Archivo principal donde se configura nuestro servidor.
//requires  son librerias
var express = require('express');
var mongoose = require('mongoose')

// inicializar variables
var app = express();

//conexion a bd

mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB',
    (err, res) => {
        if (err) throw err;
        console.log('arrancado bd puerto 27017: \x1b[34m%s\x1b[0m', 'online');

    });

// rutas
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    });
});


// escuchar peticiones
app.listen(3000, () => {
    console.log('arrancado express puerto 3000: \x1b[34m%s\x1b[0m', 'online');
});