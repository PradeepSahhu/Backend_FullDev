import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createTweet,
  getUserTweets,
  updateTweet,
  deleteTweet,
} from "../controllers/tweets.controllers.js";

const router = Router();
router.use(verifyJWT);

router.route("/createTweet").post(createTweet);
router.route("/getUserTweets").post(getUserTweets);
router.route("/updateTweet").post(updateTweet);
router.route("/deleteTweet").post(deleteTweet);

export default router;
