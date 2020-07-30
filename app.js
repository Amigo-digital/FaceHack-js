const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const hbs = require('hbs');

const userRouter = require('./routes/user');
const indexRouter = require('./routes/index');


mongoose.connect('mongodb://localhost:27017/FaceBase', {
   useNewUrlParser: true,  useUnifiedTopology: true
});

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')


app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({extended: false }));
app.use(session({
  secret: 'secret' 
}))
app.use((req, res, next) => {
  app.locals.user = req.session.authUser;
  next();
});
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/user', userRouter);

module.exports = app;
