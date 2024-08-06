import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    Credential: true,
  })
); // to implement configuration files or middleware

// to limit the json data to 16kb
app.use(
  express.json({
    limit: "16kb",
  })
);

// to encode the url like + for spacing or %20 for spacing
//extended = object inside objects.

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

//pdf, images , favicon, all these static assests will be stored in our server i.e. inside public folder.

app.use(express.static("public"));

//accessing users cookes from its browser into my server and performing (CRUD) operation.

app.use(cookieParser());

// (err, req,res,next) = next is used by middleware for middleware, if used res then no further next is executed

//routes import

import userRouter from "./routes/user.routes.js";
import videoRouter from "./routes/video.routes.js";

// routes declaration

app.use("/api/v1/users", userRouter);
app.use("/api/v1/videos", videoRouter);

export { app };
