const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {dbConfig, cookieConfig} = require('./config');
const bodyParser = require('body-parser');
const cors = require('cors');
const {localStrategyHandler, serializeUser, deserializeUser, isValid} = require('./passport');
const mysql = require('mysql2/promise');
const PORT = process.env.PORT || 4000;
const path = require('path');
const loginController = require('./controllers/login-controller');
const VacationsController = require('./controllers/vacations-controller');


app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
    secret: 'my_secret_john_bryce!$@#$',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(dbConfig),
    cookie: cookieConfig
  }));

app.use(passport.initialize());
app.use(passport.session());

passport.use('local', new LocalStrategy(localStrategyHandler));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'firstData'
  }).then(connection => {
      global.mysqlConnection = connection;
      app.listen(PORT, () => {
            console.log(`app is on port: ${PORT}`);
      })
    ;
  })
app.use('/auth', loginController);
app.use('/vacations', VacationsController);
//app.use('*', isValid);

process.on('uncaughtException', (err, origin) => {
    console.log(err);
  });

