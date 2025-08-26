import { Router } from "express";
import { getPortfolioItems, createPortfolioItem, deletePortfolioItem } from "../controllers/portfolioController.js";
import upload from "../middleware/upload.js";  // for image uploads
import authenticate from "../middleware/authenticate.js"; // restrict admin

const router = Router();

// GET all portfolio items
router.get("/", getPortfolioItems);

// POST a new portfolio item (with image upload, only admin allowed)
router.post("/", authenticate, upload.single("image"), createPortfolioItem);

// DELETE portfolio item
router.delete("/:id", authenticate, deletePortfolioItem);

export default router;
