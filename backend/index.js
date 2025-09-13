import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import watchRoutes from "./routes/watchRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { runWorker } from "./worker.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/watches", watchRoutes);
app.use("api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("IQueue backend is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}.`)
    runWorker(); // Start worker
});