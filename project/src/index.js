// require("dotenv").config();
import dotenv from "dotenv";

import connectMongooseDb from "./db/index.js";

dotenv.config({
  path: "./env",
});

connectMongooseDb()
  .then(() => {
    app.on("error", (error) => {
      console.log("Express can't talk to the MongooseDb !!", error);
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `This Project is running on PORT: http:\\localhost:${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed !!", error);
  });

/*
import express from "express";
const app = express();

(async () => {
  try {
    await mongoose.connect(`${process.env.MOGODB_URL}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("can't talk to DB", error);
      throw error;
    });
    app.listen(process.env.PORT, () => {
      console.log(`App is listening on PORT : ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
})();
*/
// CORS - corss origin resource sharing.
