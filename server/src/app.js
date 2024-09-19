const connectToDb = require("./utils/connectTodb.js");
const express = require("express");
const cookieParser = require("cookie-parser");
const usersRouter = require("./routes/users.router.js");
require('dotenv').config();

const cors = require("cors");

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/users", usersRouter);

app.listen(3000,() => {
    console.log("server is running on port 3000")
    connectToDb();
});