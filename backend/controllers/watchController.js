//TODO: connect to Postgres
// Placeholder watch data list
let watches = [];

// GET all watches for user
export const getWatches = (req, res) => {
    const userEmail = req.user.email;
    const userWatches = watches.filter(w => w.userEmail === userEmail);
    res.json(userWatches);
};

// POST create a watch
export const createWatch = (req, res) => {
    const { eventUrl, thresholdType, thresholdValue } = req.body;
    const userEmail = req.user.email;

    if (!eventUrl) {
        return res.status(400).json({ error: "eventUrl is required" });
    }

    const newWatch = {
        id: Date.now().toString(),
        eventUrl,
        thresholdType,
        thresholdValue,
        userEmail,
        status: "pending...",
        createdAt: new Date(),
    };

    watches.push(newWatch);
    res.status(201).json(newWatch);
};

// DELETE a watch
export const deleteWatch = (req, res) => {
    const { id } = req.params;
    const index = watches.findIndex((w) => w.id === id);
    watches.splice(index, 1);
    res.json({ message: `Watch ${id} deleted` });
};