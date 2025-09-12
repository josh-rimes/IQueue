import dotenv from "dotenv";
import { checkEmailsForQueueUpdates } from "./services/emailService.js";
import { getAllWatches } from "./controllers/watchController.js";

dotenv.config();

// Worker interval (ms)
const CHECK_INTERVAL = process.env.WORKER_INTERVAL || 15000; // 15s default

let workerStarted = false;

export function runWorker() {
    if (workerStarted) {
        console.log("Worker already running, skipping duplicate start...");
        return;
    }
    workerStarted = true;

    console.log("Checking for updates...");

    setInterval(async () => {
        const watches = getAllWatches(); // current in-memory watches
        if (!watches.length) {
            console.log("No watches to check right now...");
            return;
        }

        for (const watch of watches) {
            console.log(`Checking updates for ${watch.userEmail} / ${watch.eventUrl}`);

            
            if (watch.status !== "ready") {
                const result = await checkEmailsForQueueUpdates(watch.userEmail);
                watch.status = result.status;
            }

            // TODO: If result indicates near front of queue, send push notification
            // Placeholder result log
            console.log(`Status for ${watch.userEmail}:`, result);
        }
    }, CHECK_INTERVAL);
}

runWorker();