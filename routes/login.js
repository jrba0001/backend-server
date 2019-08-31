var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;


// inicializar variables
var app = express();
var Usuario = require('../models/usuario');

app.post('/', (req, res) => {

    var body = req.body;


    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Problema con bd, error al buscar usuario',
                errors: err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas email',
                errors: err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas email',
                errors: err
            });
        }




        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas password',
                errors: err
            });
        }

        //crear un token
        usuarioDB.password = "mamoncete";
        var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 });


        res.status(201).json({
            ok: true,
            mensaje: 'login post correct',
            usuario: usuarioDB,
            token: token,
            id: usuarioDB._id
        });
    });
});



module.exports = app;