const express = require('express');
const path = require('path');
const app = express();

// Importa las rutas
const router = require('./routes/routes');

app.use(express.static('public'));
app.use(express.json());

// Configura el motor de plantillas Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Define la ruta principal
app.get('/', (req, res) => {
  res.render('index');
});

// Define la ruta para el login
app.get('/login', (req, res) => {
  res.render('login');
});

// Incluye las rutas desde el archivo de rutas
app.use('/', router);

// Puerto en el que escucha el servidor
const port = 4000;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
