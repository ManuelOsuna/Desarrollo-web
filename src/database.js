// importar mongoose para conectarnos a MongoDB
const mongoose = require('mongoose');

// importamos la configuracion de las bases de datos desde el archivo keys.js
const { mongodb} = require('./keys');

// establecemos la conexion con la base de datos
mongoose.connect(mongodb.URI, {})
    .then(db => console.log('Base de datos conectada')) // mensaje de exito si la conexion es exitosa
    .catch(err => console.error(err)); // captura y muestra cualquier error de conexion
