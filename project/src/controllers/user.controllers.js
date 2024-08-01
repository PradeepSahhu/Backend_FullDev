import { asyncHandlerDB } from "../utils/asyncHandlerDB.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandlerDB(async (req, res) => {
  //!step 1: get data from the user and store it in variable
  // validation - not empty
  const { fullName, email, username, password } = req.body;
  console.log("fullname: ", fullName);
  console.log("Email id:", email);
  console.log("Username: ", username);
  console.log("password : ", password);

  // if (fullName === "") {
  //   throw new ApiError(400, "FullName is required");
  // }

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  //! check if user already exist :username and email.
  const existedUser = User.findOne({ $or: [{ username }, { email }] });

  if (existedUser) {
    throw new ApiError(409, "username or email already exists");
  }

  // checking for other things.
  console.log("**********************************");
  console.log(avatarLocalPath);
  console.log(req.body);
  console.log(existedUser);
  console.log("**********************************");
  // check for images , check for avatar
  const avatarLocalPath = req.files?.avatar[0]?.path;

  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }
  // upload them to cloudinary , avatar
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  //! create user object - create entry in db
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    username: username.toLowerCase(),
    email,
    password,
  });

  //! remove password and refresh token field from response.
  //! check for user creation
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (createdUser) {
    throw new ApiError(500, "Somthing went wrong while registering a user");
  }

  // return res, if user created
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registerUser };
