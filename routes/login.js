const express = require('express');
const router = express.Router();
const passport = require('passport');
const authMiddleware = require('../middlewares/authMiddleware');


// Define la ruta para el login
router.get('/', (req, res) => {
   res.render('login', { title: '', user: req.user != null ? `${req.user.nombre}` : '' });
  });
  
  router.post('/', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
  }), async (req, res) => {
    // Si se autentica correctamente, crea un token JWT
    const token = authMiddleware.generateToken(req.user.id);

    console.log("se pudo autentificar");

    res.cookie('token', token, { httpOnly: true, secure: false });
    
    console.log("se autentifico correctamente el token jwt", token)
    res.redirect('/');
  });
  

module.exports = router;