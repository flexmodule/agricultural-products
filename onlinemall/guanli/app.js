var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var register=require('./routes/register');
var login=require('./routes/login');
var product=require("./routes/product");
var detail=require("./routes/detail");
var mallIndex=require("./routes/mallindex");
var mallLogin=require("./routes/malllogin");
var mallRegister=require("./routes/mallregister");
var mallSellerlist=require("./routes/mallsellerlist");
var mallDetail=require("./routes/malldetail");
var mallSeller=require("./routes/mallseller");
var mallCast=require("./routes/mallcast");
var mallOrder=require("./routes/mallorder");
var mallBuy=require("./routes/mallbuy");
var superIndex=require("./routes/superindex");
var superLogin=require("./routes/superlogin");
var superRegister=require("./routes/superregister");
var session=require("express-session");
var app = express();



require("./database");
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    name: "usersessID",//sessionID，这个值可以随意编造
    secret:"dw3243dwdsgfh",//要存入cookie的码（随机生成的密钥）
    cookie: {maxAge: 1000*36000 }, //1小时
    resave: true,
    saveUninitialized: true
})); 

app.use('/', index);
app.use('/users', users);
app.use('/register',register);
app.use('/login',login);
app.use('/product',product);
app.use('/detail',detail);
app.use('/mallindex',mallIndex);
app.use('/malllogin',mallLogin);
app.use('/mallregister',mallRegister);
app.use('/mallsellerlist',mallSellerlist);
app.use('/malldetail',mallDetail);
app.use('/mallseller',mallSeller);
app.use('/mallcast',mallCast);
app.use('/mallorder',mallOrder);
app.use('/mallbuy',mallBuy);
app.use('/superindex',superIndex);
app.use('/superlogin',superLogin);
app.use('/superregister',superRegister);
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
