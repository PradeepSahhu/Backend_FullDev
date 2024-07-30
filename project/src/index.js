// require("dotenv").config();
import dotenv from "dotenv";

import connectMongooseDb from "./db/index.js";

dotenv.config({
  path: "./env",
});

connectMongooseDb();

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
