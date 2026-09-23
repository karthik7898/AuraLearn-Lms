
require("dotenv").config(); 

const express = require("express");
const connectDb = require("./Config/db");
const courseRoute = require("./Routes/courseRoute");
const authRoute = require("./Routes/authRoute");

const app = express();
app.use(express.json()); 



connectDb();

app.use("/api/courses",courseRoute)
app.use("/api/auth",authRoute)


app.listen(3000, () => {
    console.log("Listening to the PORT");
});
