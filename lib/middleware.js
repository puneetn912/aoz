var express = require('express');

module.exports = (app) => {
  var session = require('express-session');
  var mongoose = require('mongoose');
  var passport = require('passport');
  var flash = require('connect-flash');
  var MongoStore = require('connect-mongo')(session);
  var methodOverride = require('method-override');
  var helmet = require('helmet');
  var compression = require('compression');
  var dotenv = require('dotenv');



  var passportHelper = require('./passport');

  switch (process.env.NODE_ENV) {
    case 'dev ':
      dotenv.config({ path: './.dev.env' });
      break;
    case 'stage ':
      dotenv.config({ path: './.stage.env' });
      break;
    case 'prod ':
      dotenv.config({ path: './.prod.env' });
      break;
    case 'dev':
      dotenv.config({ path: './.dev.env' });
      break;
    case 'stage':
      dotenv.config({ path: './.stage.env' });
      break;
    case 'prod':
      dotenv.config({ path: './.prod.env' });
      break;
    default:
      break;
  }

  mongoose.Promise = global.Promise;
  // if (process.env.DB_USER) {
  //   mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`,{ useNewUrlParser: true });
  // } else {
  //   mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`,{ useNewUrlParser: true });
  // }

  mongoose.connect(`mongodb://localhost:27017/djfresh`,{ useNewUrlParser: true });
  // mongoose.connect(process.env.DB_TEST,{ useNewUrlParser: true });
  // mongoose.connect(process.env.DB_LIVE,{ useNewUrlParser: true });
  app.use(session({
    secret: process.env.APP_SECRET,
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 2 * 24 * 60 * 60
    })
  }));

  app.use(helmet());
  app.use(compression());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  app.use(methodOverride('_method'));

  passportHelper(passport);
};

