import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {} from "../controllers/tweets.controllers.js";

const router = Router();

export default router;
