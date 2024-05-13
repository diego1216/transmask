const express = require('express');
const router = express.Router();


// Define la ruta para el login
router.get('/', (req, res) => {
    res.render('login');
  });
  

module.exports = router;