const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('./express.js');
const TossModel = require('./models/TossModel.js');
const Response = require('./models/responseModel.js');

dotenv.config({ path: './config/config.env' });

const DB_TD = process.env.DATABASE_URI;

mongoose
  .connect(DB_TD, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log(con.connections);
    console.log('DB connection successful');
  });

const port = process.env.PORT || 3000;

const app = express.init();

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
