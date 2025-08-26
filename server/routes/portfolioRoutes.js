import express from "express";
import multer from "multer";
import path from "path";
import { authenticate } from "../middleware/authMiddleware.js";
import { addProject, getProjects, deleteProject } from "../controllers/projectController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "Uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.get("/", getProjects);
router.post(
  "/",
  authenticate,
  upload.fields([{ name: "image", maxCount: 1 }, { name: "video", maxCount: 1 }]),
  addProject
);
router.delete("/:id", authenticate, deleteProject);

export default router;
