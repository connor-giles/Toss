const fs = require('fs');

const readJsonFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path + '.json', 'utf8', async (err, data) => {
      if (err) reject(err);
      const jsonData = JSON.parse(data);
      resolve(jsonData);
    });
  });
};

module.exports = readJsonFile;
