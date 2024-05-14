const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Obtén el texto cifrado de la query string
    const textoCifrado = req.query.texto;
    // Renderiza la vista "texto-cifrado" y pasa el texto cifrado como dato
    res.render('textoCifrado', { textoCifrado });
});

module.exports = router;