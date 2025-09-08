//TODO: connect to Postgres
// Placeholder watch data list
let watches = [];

// Utility: expose watches for worker.js
export const getAllWatches = () => watches;

// GET all watches
export const getWatches = (req, res) => {
    res.json(watches);
};

// POST create a watch
export const createWatch = (req, res) => {
    const { eventUrl, thresholdType, thresholdValue, userEmail } = req.body;

    if (!eventUrl || !userEmail) {
        return res.status(400).json({ error: "eventUrl and userEmail are required" });
    }

    const newWatch = {
        id: Date.now().toString(),
        eventUrl,
        thresholdType,
        thresholdValue,
        userEmail,
        createdAt: new Date(),
    };

    watches.push(newWatch);
    res.status(201).json(newWatch);
};

// DELETE a watch
export const deleteWatch = (req, res) => {
    const { id } = req.params;
    watches = watches.filter((w) => w.id !== id);
    res.json({ message: `Watch ${id} deleted` });
};