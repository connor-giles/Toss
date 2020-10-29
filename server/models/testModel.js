/* Import mongoose and define any variables needed to create the schema */
import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
    name: { type: String, required: true }
});



/* Use your schema to instantiate a Mongoose model
Export the model to make it available to other parts of your Node application */
//Check out - https://mongoosejs.com/docs/guide.html#models
export default mongoose.model('testSchema', testSchema);