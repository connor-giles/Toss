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

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED EXCEPTION! Shutting down...');
  process.exit(1);
});

module.exports.init = () => {
  /* connect to database
        - reference README for db uri
  */
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

  if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../../client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
      res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
    });
  }

  return app;
};
