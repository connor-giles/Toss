const path = require('path'),
  express = require('express'),
  mongoose = require('mongoose'),
  morgan = require('morgan'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  AppError = require('./utils/appError'),
  globalErrorHandler = require('./controllers/errorController'),
  testRouter = require('./routes/testRouter'),
  responseRouter = require('./routes/responseRouter'),
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

  app.use(cors());

  // enable request logging for development debugging
  app.use(morgan('dev'));

  // body parsing middleware
  app.use(bodyParser.json());

  app.use((req, res, next) => {
    //console.log(req.headers);
    next();
  });

  // add a router
  app.use('/api/test', testRouter);
  app.use('/response', responseRouter);
  app.use('/toss', tossRouter);
  app.use('/user', userRouter);
  app.all('*', (req, res, next) => {
    //whenever something is passed into next, that data passed in is innately expected to be an error
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

  app.use(globalErrorHandler);

  // if (process.env.NODE_ENV === 'production') {
  //   // Serve any static files
  //   app.use(express.static(path.join(__dirname, '../../client/build')));

  //   // Handle React routing, return all requests to React app
  //   app.get('*', function (req, res) {
  //     res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
  //   });
  // }

  app.use('/', express.static('../client/build'));
  app.use(express.static('../client/build'));
  app.all('/*', (req, res) => {
    // res.status(201).json({message: "nothing here!"});
    res.sendFile(path.resolve("../client/build/index.html"));
  });

  return app;
};
