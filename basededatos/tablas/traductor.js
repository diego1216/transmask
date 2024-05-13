// app.js (o donde configures tu aplicación Express)
const express = require('express');
const path = require('path');
const app = express();

// Configurar las rutas estáticas
app.use(express.static(path.join(__dirname, 'public')));

// Configurar las rutas de la aplicación
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Resto de la configuración de tu aplicación...

// Puerto en el que escucha el servidor
const port = 4000;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
