
const express = require('express');
const router = express.Router();
const control_cifrado = require('../controladores/control_cifrado');

// Rutas públicas
router.get('/', (req, res) => {
  // Obtener el título y el usuario
  const title = req.user != null ? `Ponte la máscara que quieras ${req.user.nombre}`: 'Bienvenido a transmask';
  const user = req.user != null ? `${req.user.nombre}` : '';
  
  // Llamar a la función del controlador y pasar el título y el usuario como parámetros
  control_cifrado.mostrarFormularioEnIndex(req, res, title, user);
});

module.exports = router;