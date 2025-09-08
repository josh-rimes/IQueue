import express from "express";
import {
    getWatches,
    createWatch,
    deleteWatch,
} from "../controllers/watchController.js";

const router = express.Router();

router.get("/", getWatches); // GET /api/watches
router.post("/", createWatch); // POST /api/watches
router.delete("/:id", deleteWatch) // DELETE /api/watches/:id

export default router;