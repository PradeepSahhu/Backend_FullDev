import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { asyncHandlerDB } from "../utils/asyncHandlerDB.js";

import { Playlist } from "../models/playlists.models.js";

const createPlaylist = asyncHandlerDB(async (req, res) => {
  const { name, description } = req.body;

  if ([name, description].some((field) => field?.trim() === "")) {
    throw new ApiError(401, `Name and Description can't be empty`);
  }

  const user = req.user;

  if (!user) {
    throw new ApiError(400, "User Authentication Required");
  }

  const playlist = await Playlist.create({
    name,
    description,
    owner: user,
  });

  res
    .status(200)
    .json(new ApiResponse(200, playlist, "Successfully created the Playlist"));

  //TODO: create playlist
});

const getUserPlaylists = asyncHandlerDB(async (req, res) => {
  const { userId } = req.params;
  //TODO: get user playlists
});

const getPlaylistById = asyncHandlerDB(async (req, res) => {
  const { playlistId } = req.params;
  //TODO: get playlist by id
});

const addVideoToPlaylist = asyncHandlerDB(async (req, res) => {
  const { playlistId, videoId } = req.params;
});

const removeVideoFromPlaylist = asyncHandlerDB(async (req, res) => {
  const { playlistId, videoId } = req.params;
  // TODO: remove video from playlist
});

const deletePlaylist = asyncHandlerDB(async (req, res) => {
  const { playlistId } = req.params;
  // TODO: delete playlist
});

const updatePlaylist = asyncHandlerDB(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;
  //TODO: update playlist
});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
