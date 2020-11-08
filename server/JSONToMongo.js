'use strict';
/*
  Import modules/files you may need to correctly run the script.
 */

// TO RUN THIS FILE AND ADD THINGS TO THE DB RUN "node JSONToMongo.js"

const readJsonFile = require('./readFile/readFile.js');
const NameModel = require('./models/testModel.js');
const connectToDatabase = require('./connectMongodb.js');
mongoose = require('mongoose');

const connectToDB = () => {
  return connectToDatabase().on(
    'error',
    console.error.bind(console, 'MongoDB connection error:')
  );
};

const count = async () => {
  // This prints the count to the console
  // NameModel.countDocuments({}, (err, c) => console.log("count is", c))
  // This returns a promise that stores the count and has to be awaited
  const docCount = await NameModel.countDocuments({})
    .then((num) => {
      return num;
    })
    .catch((err) => {
      throw err;
    });
  return docCount;
};

const report = async (err, str) => {
  if (err) {
    throw err;
  }
  const c = await count();
  console.log(str, c);
};

const saveDataInDB = async (info) => {
  //save all clubs into the database
  return await new Promise(async (res, rej) => {
    NameModel.insertMany(info, async (err, docs) => {
      if (err) rej(err);
      res(docs);
    });
  });
};

// const deleteDataInDB = async () => {
//   //delete all clubs from the database
//   return await NameModel.deleteMany((err) => {
//     if (err) throw err;
//   });
// };
//

const main = async () => {
  connectToDB();
  /*
    Instantiate a mongoose model for each football club object in the JSON file,
    and then save it to your Mongo database
    //see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

    Remember that we needed to read in a file like we did in Bootcamp Assignment #1.
   */
    //delete the existing entries to start fresh
    //await deleteDataInDB();
    //checking if the documents have been deleted successfully
    //await report(null, "Documents deleted, there are now %d documents.");
    var path = "./server/test"
    //read file and return the data
    await readJsonFile(path)
      .then(async (info) => {
        //save the data into the database
        await saveDataInDB(info)
          .then(async (data) => {
            //check if the info data has been saved successfully
            await report(null, "There are now %d documents after adding.");
            mongoose.disconnect() 
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
};

main();
