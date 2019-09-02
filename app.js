// Archivo principal donde se configura nuestro servidor.
//requires  son librerias
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


// inicializar variables
var app = express();

// body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// importar rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var hospitalRoutes = require('./routes/hospital');
var medicoRoutes = require('./routes/medico');
var busquedaRoutes = require('./routes/busqueda');
var uploadRoutes = require('./routes/upload');
var imagenesRoutes = require('./routes/imagenes');





//conexion a bd
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB',
    (err, res) => {
        if (err) throw err;
        console.log('arrancado bd puerto 27017: \x1b[34m%s\x1b[0m', 'online');

    });

// rutas
app.use('/medico', medicoRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/upload', uploadRoutes);
app.use('/img', imagenesRoutes);
app.use('/', appRoutes);





// escuchar peticiones
app.listen(3000, () => {
    console.log('arrancado express puerto 3000: \x1b[34m%s\x1b[0m', 'online');
});