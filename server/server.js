const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('./express.js');
const TossModel = require('./models/tossModel.js');
const Response = require('./models/responseModel.js');
const express = require('./config/express.js')
 
// Use env port or defaults
const port = process.env.PORT || 5000;

dotenv.config({ path: './config/config.env' });

/*
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
*/

const port = process.env.PORT || 3000;

const app = express.init();

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
