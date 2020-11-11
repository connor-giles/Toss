const path = require('path'),
  express = require('express'),
  mongoose = require('mongoose'),
  morgan = require('morgan'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  testRouter = require('./routes/testRouter'),
  responseRouter = require('./routes/responseRouter'),
  tossRouter = require('./routes/tossRouter'),
  userRouter = require('./routes/userRouter');

  var cors = require('cors')
module.exports.init = () => {
  /* connect to database
        - reference README for db uri
  */
  mongoose.connect(
    process.env.DB_URI || require('./config/config').db.uri_TossData,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  mongoose.set('useCreateIndex', true);
  mongoose.set('useFindAndModify', false);

  // initialize app
  const app = express();

  app.use(cors());

  // enable request logging for development debugging
  app.use(morgan('dev'));

  app.use(cors());
  // body parsing middleware
  app.use(bodyParser.json());

  // add a router
  app.use('/api/test', testRouter);
  app.use('/response', responseRouter);
  app.use('/toss', tossRouter);
  app.use('/user', userRouter);
  app.all('*', (req, res, next) => {
    res.status(404).json({
      status: 'fail',
      message: `Can't find ${req.originalUrl} on this server!`,
    });
  });

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
