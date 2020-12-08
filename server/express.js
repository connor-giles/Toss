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

const responseRouter = require('./routes/responseRouter'),
  tossRouter = require('./routes/tossRouter'),
  userRouter = require('./routes/userRouter');
  dotenv = require('dotenv');

module.exports.init = () => {
  /* connect to database
        - reference README for db uri
  */
  console.log(process.env.DATABASE_URI)
  mongoose
    .connect(process.env.DB_URI || require('./config/config').db.uri_TossData, {
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
      origin: 'http://localhost:3000',
    })
  );

  // https headers
  app.use(helmet());

  // enable request logging for development debugging
  app.use(morgan('dev'));

  // // Limit requests from same API
  // const limiter = rateLimit({
  //   max: 100,
  //   windowMs: 60 * 60 * 1000,
  //   message: 'Too many requests from this IP, please try again in an hour!',
  // });
  // app.use('/', limiter);

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

  app.use('/', express.static('client/build'));
  app.use(express.static('client/build'));
  app.all('/*', (req, res) => {
    // res.status(201).json({message: "nothing here!"});
    res.sendFile(path.resolve("client/build/index.html"));
  });

  return app;
};
