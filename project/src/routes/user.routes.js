// study about:

import { Router } from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  refreshAccessTokens,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getUserChannelProfile,
  getWatchHistory,
} from "../controllers/user.controllers.js";

import {
  publishVideo,
  getAllvideos,
  getVideoById,
} from "../controllers/video.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// users routes.

//router.route(routeName,middleWare,controller)
router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);

router.route("/refresh-Token").post(refreshAccessTokens);
router.route("/changePassword").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateAccountDetails); // not post because then all the details will be updated
router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

router
  .route("/cover-image")
  .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);

router.route("/c/:username").get(verifyJWT, getUserChannelProfile);

router.route("/history").get(verifyJWT, getWatchHistory);

// video routes.

//controller remaining.
router.route("/video-upload").post(
  verifyJWT,
  upload.fields([
    { name: "videoName", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  publishVideo
);

router.route("/getAllVideos").get(getAllvideos);
router.route("/get-video").post(getVideoById);

export default router;
