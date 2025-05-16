// Importamos Express para manejar rutas
const express = require('express');
// Creamos un enrutador de Express para definir las rutas de la aplicación
const router = express.Router();

// Importamos Passport para la autenticación de usuarios
const passport = require('passport');

// Importamos productos para su uso
const Producto = require('../models/producto');


// Ruta para la página principal (Home)
router.get('/', (req, res, next) => {
    res.render('index'); // Renderiza la vista 'index.ejs'
});

// Ruta para la página de ventas
router.get('/ventas', (req, res, next) => {
    res.render('ventas'); // Renderiza la vista 'ventas.ejs'
});

// Ruta para la página de productos
router.get('/productos', async (req, res) => {
    try {
      const productos = await Producto.find({ activo: true });
      console.log('Productos encontrados:', productos); // <<<<< Agrega esto
  
      res.render('productos', { productos });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener productos');
    }
  });
  
  
// Ruta para mostrar el formulario de registro (signup)
router.get('/signup', (req, res, next) => {
    res.render('signup'); // Renderiza la vista 'signup.ejs'
});

//

// Ruta para procesar el formulario de registro
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // Si el registro es exitoso, redirige a la página de perfil
    failureRedirect: '/signup', // Si hay un error, redirige de nuevo al formulario de registro
    passReqToCallback: true // Permite pasar la solicitud (req) a la estrategia de autenticación
}));

// Ruta para mostrar el formulario de inicio de sesión (signin)
router.get('/signin', (req, res, next) => {
    res.render('signin'); // Renderiza la vista 'signin.ejs'
});

// Ruta para procesar el inicio de sesión
router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/profile', // Si la autenticación es exitosa, redirige al perfil del usuario
    failureRedirect: '/signin', // Si falla, redirige al formulario de inicio de sesión
    passReqToCallback: true // Permite pasar la solicitud a la estrategia de autenticación
}));

// Ruta para la página de perfil, solo accesible si el usuario está autenticado
router.get('/profile', isAuthenticated, (req, res, next) => {
    res.render('profile'); // Renderiza la vista 'profile.ejs'
});

// Ruta para cerrar sesión
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err); // Si hay un error al cerrar sesión, pásalo al manejador de errores
        }
        res.redirect('/'); // Redirige a la página principal después de cerrar sesión
    });
});

// Función middleware para verificar si el usuario está autenticado
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { // Comprueba si el usuario ha iniciado sesión
        return next(); // Si está autenticado, permite continuar con la solicitud
    }
    res.redirect('/'); // Si no está autenticado, redirige a la página principal
}


// Exportamos el enrutador para que pueda ser utilizado en el servidor principal
module.exports = router;