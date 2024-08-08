import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { asyncHandlerDB } from "../utils/asyncHandlerDB.js";
import { Comment } from "../models/comments.models.js";

const getVideoComments = asyncHandlerDB(async (req, res) => {
  //TODO: get all comments for a video
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;
});

const addComment = asyncHandlerDB(async (req, res) => {
  // TODO: add a comment to a video
});

const updateComment = asyncHandlerDB(async (req, res) => {
  // TODO: update a comment
});

const deleteComment = asyncHandlerDB(async (req, res) => {
  // TODO: delete a comment
});

export { getVideoComments, addComment, updateComment, deleteComment };
