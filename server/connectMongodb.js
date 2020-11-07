'use strict';

/*import all libraries */
const config = require('./config/config.js');
mongoose = require('mongoose');

/* Connect to your database using mongoose */
const connectToDatabase = () => {
  const link = config.db.uri_TossData;
  mongoose
    .connect(link, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch((error) => console.error(error));
  mongoose.set('useCreateIndex', true);
  mongoose.set('useFindAndModify', false);
  return mongoose.connection;
};

module.exports = connectToDatabase;
