const express = require('express');
const path = require('path');
const app = express();
const router = require('./routes/routes')

app.use(express.static('public'));
app.use(express.json());


// Incluye las rutas desde el archivo de rutas
app.use('/', router);

// Configura el motor de plantillas Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Define la ruta principal
app.get('/', (req, res) => {
  res.render('index');
});

// Puerto en el que escucha el servidor
const port = 4000;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
