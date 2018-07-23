var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var cors = require('cors');

var doctorSignup = require('./routes/doctorSignUp.route');
var patientRegs = require('./routes/patientRegs.route');
var patientCurrentCondition = require('./routes/patientCurrentCondition.route');
var patientHistoricalDisease = require('./routes/patientHistoricalDisease.route');

var app = express();

/******** Database connection ************/
var config = require('./config/dbConfig');
mongoose.connect(config.database,{ useNewUrlParser: true });
app.set('superSecret', config.secret);
/******** Close Database connection ************/

/******** Authentication  **********/
var apiRoutes = express.Router();
var doctorSignUpModel = require('./model/doctorSignUp.model');
apiRoutes.post('/authenticate', function (req, res) {
  doctorSignUpModel.findOne({
    email: req.body.email
  }, function (error, user) {
    if (error) {
      throw error;
    }
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        var payload = {
          admin: user.admin
        }
        var token = jwt.sign(payload, app.get('superSecret'), {
          expiresIn: 86400 // expires in 24 hours
        });
        res.json({
          success: true,
          data:user,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  });
});

apiRoutes.use(function (req, res, next) {
  var token = req.body.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, app.get('superSecret'), function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });

  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }

});
/******** End Authentication  **********/

// view engine setup
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/**** REST SERVICE END POINTS *****/
app.use('/api', doctorSignup);
app.use('/api', apiRoutes);
app.use('/api', patientRegs);
app.use('/api', patientCurrentCondition);
app.use('/api', patientHistoricalDisease);
/**** END REST SERVICE END POINTS *****/

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
