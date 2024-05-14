

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

// Importa las rutas específicas

const index = require('./index');
const login = require('./login');
const register = require('./register');
const registrousuario = require('./registrousuario');
const logout = require('./logout');
const textoCifrado = require('./textoCifrado');
const cifrado = require('./cifrado');

// Configura las rutas

router.use('/', index);
router.use('/login', login);
router.use('/register', register);
router.use('/registrousuario', registrousuario);
router.use('/logout', logout);
router.use('/textoCifrado', textoCifrado);
router.use('/cifrado', cifrado);


module.exports = router;