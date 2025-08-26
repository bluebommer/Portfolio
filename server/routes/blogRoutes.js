import express from "express";
import { getBlogs, addBlog, deleteBlog } from "../controllers/blogController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "Uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

const router = express.Router();

router.get("/", getBlogs);
router.post(
  "/",
  authenticate,
  upload.fields([{ name: "image", maxCount: 1 }, { name: "video", maxCount: 1 }]),
  addBlog
);
router.delete("/:id", authenticate, deleteBlog);

export default router;