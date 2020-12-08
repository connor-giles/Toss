const mongoose = require('mongoose');
const express = require('./express.js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: 'server/config/config.env' });

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED EXCEPTION! Shutting down...');
  process.exit(1);
});

const port = process.env.PORT;

//console.log(process.env)

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

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
