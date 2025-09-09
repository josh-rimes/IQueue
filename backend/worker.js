import dotenv from "dotenv";
import { checkEmailsForQueueUpdates } from "./services/emailService.js";
import { getAllWatches } from "./controllers/watchController.js";
import { Expo } from "expo-server-sdk";

dotenv.config();
const expo = new Expo();

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

            const result = await checkEmailsForQueueUpdates(watch.userEmail);
            watch.status = result.status;

            // TODO: If result indicates near front of queue, send push notification
            // Placeholder result log
            console.log(`Status for ${watch.userEmail}:`, result);

            if (watch.status === "ready") {
                watch.status = "alerted";

                if (watch.expoPushToken && Expo.isExpoPushToken(watch.expoPushToken)) {
                    try {
                        await expo.sendPushNotificationsAsync([
                            {
                                to: watch.expoPushToken,
                                sound: "default",
                                body: `You're near the front of the queue for ${watch.eventUrl}`,
                                data: { watchId: watch.id },
                            },
                        ]);
                        console.log(`Notification sent to ${watch.userEmail}`);
                    } catch (err) {
                        console.error("Error sending notification:", err);
                    }
                }
            }
        }
    }, CHECK_INTERVAL);
}

runWorker();