var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var index = require('./routes/index');
var users = require('./routes/users');
var verify = require('./routes/verify');
var create = require('./routes/create');
var send = require('./routes/send');
var view = require('./routes/view');
var admin = require('./routes/admin');
var data = require('./routes/data');
var sendmoney = require('./routes/sendmoney');
var Preferences = require("preferences");
var prefs = new Preferences('cryptodoc');

var app = express();
app.locals.address = prefs.address;
app.locals.abi = prefs.abi;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/verify', verify);
app.use('/create', create);
app.use('/send', send);
app.use('/view', view);
app.use('/admin',admin);
app.use('/data',data);
app.use('/sendmoney',sendmoney);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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
