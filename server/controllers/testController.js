/* Dependencies */
import TestSchemaObj from '../models/testModel.js';

/* Retrieve all the directory, sample_airbnb*/
export const getNames = async (req, res) => {
    /* Add your code. Make sure to send the documents as a JSON response.*/
    await TestSchemaObj.find({}, (err, data) => {
      if (err)
        return res.status(200).send({
          message: err.message || "An unknown error occurred",
        });
      res.json(data);
    });
  };