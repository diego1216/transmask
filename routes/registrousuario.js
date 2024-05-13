
const express = require('express');
const router = express.Router();
const usuarioController = require('../controladores/control_usuarios');


router.post('/', usuarioController.registrarUsuario);

module.exports = router;

