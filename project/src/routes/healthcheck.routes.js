import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {} from "../controllers/healthcheck.controllers.js";

const router = Router();

export default router;
