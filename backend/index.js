const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("IQueue backend is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listening on ${PORT}.`));