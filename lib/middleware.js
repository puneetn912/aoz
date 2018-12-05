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

    dotenv.config({ path: './.env' });
    mongoose.Promise = global.Promise;

    if (process.env.NODE_ENV == 'dev') {
        mongoose.connect(`mongodb://localhost:27017/reallive`,{ useNewUrlParser: true });
    } else if(process.env.NODE_ENV == 'stage'){
        mongoose.connect(process.env.DB_TEST,{ useNewUrlParser: true });
    } else if(process.env.NODE_ENV == 'prod'){
        mongoose.connect(process.env.DB_LIVE,{ useNewUrlParser: true });
    }

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

