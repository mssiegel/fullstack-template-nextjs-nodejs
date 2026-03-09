import express from "express";
const app = express();
const port = 8000;
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use((err, req, res, next) => {
    res.status(500).json({
        status: 500,
        message: "There was an error",
        error: err.message,
    });
});
app.listen(port, () => {
    console.log(`Server running at http//localhost:${port}`);
});
