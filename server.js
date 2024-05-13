const express = require('express');
const app = express();
const usuarios = require('./modelos/usuariosmodel');
const session = require('express-session');
const path = require('path');
const router = require('./routes/routes');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middlewares/authMiddleware');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
dotenv.config();

app.use(session({
  secret:  process.env.ACCESS_TOKEN_SECRET,
  resave: false,
  saveUninitialized: false
}));


app.use(flash());



// Passport.js

app.use(passport.initialize());
app.use(passport.session());

// Configurar estrategia de autenticación local
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await usuarios.obtenerPorNombre(username);
      if (!user) {
        return done(null, false, { message: 'Usuario incorrecto.' });
      }
      const passwordMatch = await authMiddleware.comparePassword(password, user.contraseña);
      if (!passwordMatch) {
        return done(null, false, { message: 'Contraseña incorrecta.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  await usuarios.obtenerPorId(id).then((user) => {
    done(null, user);
  }).catch((error) => {
    done(error, null);
  });
});






app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal');
});


app.use(passport.initialize());
app.use(passport.session());

// Incluye las rutas desde el archivo de rutas
app.use('/', router);

// Configura el motor de plantillas Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Puerto en el que escucha el servidor
const port = 4000;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
