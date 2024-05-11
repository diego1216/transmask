// routes/routes.js

const express = require('express');
const router = express.Router();

// Importa las rutas específicas

const index = require('./index');
const login = require('./login');
const register = require('./register');
// Configura las rutas

router.use('/', index);
router.use('/login', login);
router.use('/register', register);

module.exports = router;