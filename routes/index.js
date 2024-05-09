// routes/index.js
const express = require('express');
const router = express.Router();

// Rutas públicas
router.get('/', (req, res) => {
  res.render('index', { title: req.user != null ? `Ponte la máscara que quieras ${req.user.nombre}` : '', user: req.user != null ? `${req.user.nombre}` : ''});
});

module.exports = router;