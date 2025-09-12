import express from "express";
import {
    getWatches,
    createWatch,
    deleteWatch,
} from "../controllers/watchController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticate, getWatches); // GET /api/watches
router.post("/", authenticate, createWatch); // POST /api/watches
router.delete("/:id", authenticate, deleteWatch) // DELETE /api/watches/:id

export default router;