const path = require('path'),
  express = require('express'),
  mongoose = require('mongoose'),
  morgan = require('morgan'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  AppError = require('./utils/appError'),
  globalErrorHandler = require('./controllers/errorController'),
  xss = require('xss-clean'),
  rateLimit = require('express-rate-limit'),
  helmet = require('helmet'),
  cookieParser = require('cookie-parser'),
  mongoSanitize = require('express-mongo-sanitize');
  responseRouter = require('./routes/responseRouter'),
  tossRouter = require('./routes/tossRouter'),
  userRouter = require('./routes/userRouter');
  dotenv = require('dotenv');

module.exports.init = () => {
    mongoose.connect(process.env.DB_URI || require('./config/config').db.uri_TossData, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('DB connection successful!'))
    .catch((err) => SVGForeignObjectElement.log('ERROR'));
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);

    // initialize app
    const app = express();

    app.use(
      cors({
        credentials: true,
        origin: require('./config/domain').DOMAIN.name
      })
    );

    // enable request logging for development debugging
    app.use(morgan('dev'));

    // body parsing middleware
    app.use(bodyParser.json());
    app.use(cookieParser());

    // Data sanitization against NoSQL query injection
    app.use(mongoSanitize());

    // Data sanitization against XSS
    app.use(xss());

    // TEST
    app.use((req, res, next) => {
        //console.log(req.cookies);
        next();
    });

    // add a router
    app.use('/response', responseRouter);
    app.use('/toss', tossRouter);
    app.use('/user', userRouter);

    app.use(globalErrorHandler);

    if (process.env.NODE_ENV === 'production') {
        // Serve any static files
        app.use(express.static(path.join(__dirname, '../client/build')));

        // Handle React routing, return all requests to React app
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
        });
    }

    return app
}

