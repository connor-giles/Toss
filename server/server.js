const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('./express.js');


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

const port = process.env.PORT || 3001;

const app = express.init();

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   if(req.method == 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//     return res.status(200).json({});
//   }
//   next();
// })


app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
