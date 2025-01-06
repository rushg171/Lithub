const express = require("express");
require('dotenv').config();
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDatabase = require("./databaseConnection");
const authRouter = require("./routes/auth.github");
const integrationRouter = require("./routes/github.route")
const reposRouter = require("./routes/repos.route")
const collectionRouter = require("./routes/collections.route")
const cookieParser = require("cookie-parser");

connectDatabase();
app.use(cors({
  origin: 'http://localhost:4200',  // Replace with your frontend URL
  credentials: true,               // Allow credentials (cookies)
}));
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/auth/github", authRouter);
app.use("/github-integration", integrationRouter);
app.use("/collections/repos", reposRouter);
app.use("/collections", collectionRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server listening on port:" + PORT));