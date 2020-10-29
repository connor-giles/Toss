"use strict";

/*import all libraries */
import config from "./config.js";
import mongoose from "mongoose";

/* Connects the TOSS db using mongoose */
const connectToTossDatabase = () => {
  const link = config.db.uri;
  mongoose
    .connect(link, { useNewUrlParser: true, useUnifiedTopology: true})
    .catch((error) => console.error(error));
  mongoose.set("useCreateIndex", true);
  mongoose.set("useFindAndModify", false);
  return mongoose.connection;
};

export { connectToTossDatabase };