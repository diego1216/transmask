
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
const indexRouter = require('./routes/index');
app.use('/', indexRouter);
const port = 4000;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
