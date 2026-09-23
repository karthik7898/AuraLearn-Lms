
require("dotenv").config(); 

const express = require("express");
const connectDb = require("./Config/db");
const courseRoute = require("./Routes/courseRoute");
const authRoute = require("./Routes/authRoute");

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Vary", "Origin");
    }
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }
    next();
});

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});

app.use("/api/courses",courseRoute)
app.use("/api/auth",authRoute)

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

connectDb().catch((error) => {
    console.error("MongoDB connection failed:", error.message);
});
