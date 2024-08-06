import { Router } from "express";
import {
  publishVideo,
  getAllvideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
} from "../controllers/video.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

// video routes.

const router = Router();

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
router.route("/:videoId").post(getVideoById);
router
  .route("/update-video/:videoId")
  .post(verifyJWT, upload.single("thumbnail"), updateVideo);

router.route("/delete-video/:videoId").post(verifyJWT, deleteVideo);

router
  .route("/toggle-published-Status/:videoId")
  .post(verifyJWT, togglePublishStatus);

export default router;
