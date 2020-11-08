/* Import mongoose and define any variables needed to create the schema */
mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model('testDB', testSchema);
