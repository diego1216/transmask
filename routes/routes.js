

const express = require('express');
const router = express.Router();

// Importa las rutas específicas

const index = require('./index');
const login = require('./login');
const register = require('./register');
const registrousuario = require('./registrousuario');

// Configura las rutas

router.use('/', index);
router.use('/login', login);
router.use('/register', register);
router.use('/registrousuario', registrousuario);


module.exports = router;