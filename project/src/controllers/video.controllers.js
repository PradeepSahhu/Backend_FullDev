import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandlerDB } from "../utils/asyncHandlerDB.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Video } from "../models/video.models.js";
import { User } from "../models/user.models.js";

const publishVideo = asyncHandlerDB(async (req, res) => {
  const { title, description } = req.body;
  console.log(title);
  console.log(description);

  if (!title && !description) {
    return new ApiError(401, "Title and Description are required in the video");
  }

  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(401, "Can't find the user ");
  }

  //   const videoLocalPath = req.file?.path;
  const videoLocalPath = req.files?.videoName[0]?.path;

  //   console.log(req.file);
  //   console.log("The name of the file is " + videoLocalPath);

  if (!videoLocalPath) {
    throw new ApiError(400, "video not found");
  }

  let thumbnailLocalPath;

  if (
    req.files &&
    Array.isArray(req.files.thumbnail) &&
    req.files.thumbnail.length > 0
  ) {
    thumbnailLocalPath = req.files?.thumbnail[0]?.path;
  }

  const videoUploaded = await uploadOnCloudinary(videoLocalPath);
  const thumbnailUploaded = await uploadOnCloudinary(thumbnailLocalPath);

  if (!videoUploaded) {
    throw new ApiError(500, "Somethign went wrong while uploading your video");
  }

  if (!thumbnailUploaded) {
    throw new ApiError(500, "Somethign went wront while upload your thumbnail");
  }

  const { url, duration } = videoUploaded;
  //   console.log(url, duration);

  //   console.log("The video uploaded response" + videoUploaded);

  const video = await Video.create({
    videoFile: url,
    thumbnail: thumbnailUploaded?.url || "",
    owner: user,
    title,
    description,
    duration: duration / 60 + 0.1 * (duration % 60),
    isPublished: true,
  });

  const videoUpload = await Video.findById(video._id);

  if (!videoUpload) {
    throw new ApiError(401, "video can't be uploaded in the schema");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, videoUploaded, "Successfully uploaded the media ")
    );
});

const getAllvideos = asyncHandlerDB(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  //TODO: get all videos based on query, sort, pagination
  console.table([page, limit, sortBy, query, sortType, userId]);

  const filter = {};

  //did with chatgpt...

  if (userId) {
    filter.userId = userId;
  }
  //did with chatgpt...
  if (query) {
    filter.$text = { $search: query };
  }

  const options = {
    page,
    limit,
    sort: { [sortBy]: parseInt(sortType, 1) }, // this line did with chatgpt...
  };
  const ress = await Video.find({});
  console.table(ress);

  var myAggregate = Video.aggregate([{ $match: filter }]);
  // const result = await Video.find(myAggregate, options);
  const result = await Video.aggregatePaginate(myAggregate, options);

  console.log(result);

  res
    .status(200)
    .json(
      new ApiResponse(200, result, "successfully fetched the Video Records")
    );
});

const getVideoById = asyncHandlerDB(async (req, res) => {
  const { videoId } = req.params;

  //TODO: get video by id

  console.log(req.params);

  const foundvideo = await Video.findById(videoId);

  res
    .status(200)
    .json(new ApiResponse(200, foundvideo, "Successfully found the video"));
});

const updateVideo = asyncHandlerDB(async (req, res) => {
  const { videoId } = req.params;
  //TODO: update video details like title, description, thumbnail

  // console.log(req.user);
  console.log(req.body);

  const { title, description } = req.body;
  // console.log(videoId);
  // console.log(req.file);
  const thumbnailLocalPath = req.file?.path;
  console.table([title, description, thumbnailLocalPath]);

  if (!title && !description && !thumbnailLocalPath) {
    throw new ApiError(
      400,
      "At least title, description or thumbnail is required to be updated"
    );
  }

  let updatedThumbnail;

  updatedThumbnail = await uploadOnCloudinary(thumbnailLocalPath);

  if (!updatedThumbnail) {
    throw new ApiError(500, "Can't upload the updated thumbnail");
  }

  const video = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: {
        title: title,
        description: description,
        thumbnail: updatedThumbnail.url,
      },
    },
    { new: true }
  );

  console.log(video);

  res
    .status(200)
    .json(new ApiResponse(200, video, "Successfully updated the video"));
});

const deleteVideo = asyncHandlerDB(async (req, res) => {
  const { videoId } = req.params;

  //TODO: delete video

  const status = await Video.findByIdAndDelete(videoId);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        videoId == status._id,
        `video with id ${videoId} has been successfully deleted`
      )
    );
});

const togglePublishStatus = asyncHandlerDB(async (req, res) => {
  const { videoId } = req.params;

  if (!videoId) {
    throw new ApiError(401, "No videoId is provided");
  }

  const info = await Video.findById(videoId);

  const video = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: {
        isPublished: !info.isPublished,
      },
    },
    { new: true }
  );

  console.table([video.isPublished]);

  res
    .status(200)
    .json(new ApiResponse(200, video, "Successfully toggled the isPublished"));
});

export {
  publishVideo,
  getAllvideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
