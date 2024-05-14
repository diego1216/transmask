const express = require('express');
const router = express.Router();
const control_cifrado = require('../controladores/control_cifrado');

// Ruta para cifrar texto
router.post('/', control_cifrado.cifrarTexto);

  
module.exports = router;