import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { asyncHandlerDB } from "../utils/asyncHandlerDB";
import { Subscription } from "../models/subscriptions.models.js";

const toggleSubscription = asyncHandlerDB(async (req, res) => {
  const { channelId } = req.params;
  // TODO: toggle subscription
  //! check it later either it is working or not.

  if (!channelId) {
    throw new ApiError(401, "No channelId is provided");
  }

  const channel = await Subscription.findByIdAndUpdate(
    channelId,
    {
      $unset: {
        subscriber: 1,
        channel: 1,
      },
    },
    { new: true }
  );

  if (!channel) {
    throw new ApiError(401, "No channel found with this channelId");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, channel, "Successfully toggled the subscription")
    );
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandlerDB(async (req, res) => {
  const { channelId } = req.params;

  if (!channelId) {
    throw new ApiError(401, "no channel exist withe the given channelId");
  }

  Subscription.aggregate([
    {
      $match: {
        channel: channelId,
      },
    },
  ]);

  res
    .status(200)
    .json(new ApiResponse(200, {}, "successfully returns all subscriber list"));
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandlerDB(async (req, res) => {
  const { subscriberId } = req.params;

  if (!subscriberId) {
    throw new ApiError(401, "no channel exist withe the given channelId");
  }

  Subscription.aggregate([
    {
      $match: {
        subscriber: subscriberId,
      },
    },
  ]);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        "Successfully returns all the subscribed channel list"
      )
    );
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
