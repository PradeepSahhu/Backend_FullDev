import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { asyncHandlerDB } from "../utils/asyncHandlerDB.js";
import mongoose from "mongoose";

import { Tweet } from "../models/tweets.models.js";

const createTweet = asyncHandlerDB(async (req, res) => {
  //TODO: create tweet

  const { content } = req.body;

  console.log(req.body);

  if (!content) {
    throw new ApiError(401, "Can't Tweet without a message");
  }

  const owner = req.user;

  if (!owner) {
    throw new ApiError(401, "You are not authorized");
  }

  const tweet = await Tweet.create({
    content,
    owner,
  });

  const isTweeted = await Tweet.findById(tweet._id);

  if (!isTweeted) {
    throw new Api(401, "Can't tweeted");
  }

  res.status(200).json(200, tweet, "Successfully twitted");
});

const getUserTweets = asyncHandlerDB(async (req, res) => {
  // TODO: get user tweets

  const { userId } = req.body;
  //   console.log(userId);
  console.log(req.body);

  if (!userId) {
    throw new ApiError(401, "UserId must be entered ");
  }

  const allUserTweets = await Tweet.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    },
  ]);

  console.log(allUserTweets);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        allUserTweets,
        "Successfully fetched all the tweets of a user"
      )
    );
});

const updateTweet = asyncHandlerDB(async (req, res) => {
  //TODO: update tweet

  const { tweetId, content } = req.body;

  if (!tweetId) {
    throw new ApiError(401, "TweetId can't be empty");
  }

  const tweet = await Tweet.findByIdAndUpdate(
    tweetId,
    {
      $set: {
        content: content,
      },
    },
    {
      new: true,
    }
  );

  if (!tweet) {
    throw new ApiError(401, "Tweet can't be updated");
  }

  res
    .status(200)
    .json(new ApiResponse(200, tweet, "Successfully updated the Tweet"));
});

const deleteTweet = asyncHandlerDB(async (req, res) => {
  //TODO: delete tweet

  const { tweetId } = req.body;

  if (!tweetId) {
    throw new ApiError(401, "Tweetid can't be empty");
  }
  await Tweet.findByIdAndDelete(tweetId);

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Successfully deleted the tweet"));
});
export { createTweet, getUserTweets, updateTweet, deleteTweet };
