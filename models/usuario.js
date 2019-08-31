var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol correcto'
};


var usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'Nombre es obligatorio'] },
    email: { type: String, unique: true, required: [true, 'El correo es obligatorio'] },
    password: { type: String, required: [true, 'Password es obligatorio'] },
    img: { type: String, required: false },
    role: { type: String, required: true, default: 'USER-ROLE', enum: rolesValidos },

});
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('Usuario', usuarioSchema);