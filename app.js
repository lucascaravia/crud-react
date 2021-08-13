const  CreateError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const session = require('express-session');
const {verifyUser, verifyAdmin} = require('./middlewares/auth');

dotenv.config();
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const registro = require('./routes/registro');
const productos = require('./routes/productos');
const usuarios = require('./routes/usuarios');
const login = require('./routes/login');

const adminIndex = require('./routes/admin/adminIndex');
const adminUsuarios = require('./routes/admin/adminUsuarios')
const adminProductos = require('./routes/admin/adminProductos')
const adminEmpleados = require('./routes/admin/adminEmpleados')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret : 'secretPass',
  cookie : {maxAge: null},
  resave: true,
  saveUninitialized : false
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/registro', registro);
app.use('/productos', productos);
app.use('/usuarios',verifyUser, usuarios)
app.use('/login', login)
app.use ('/admin/adminIndex', verifyAdmin,adminIndex )
app.use('/admin/adminProductos' ,adminProductos)
app.use('/admin/adminUsuarios',adminUsuarios)
app.use('/admin/adminEmpleados',adminEmpleados)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next( CreateError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
