const express = require("express");
const router = express.Router();
const ReposController = require("../controllers/repos.controller")

router.get("/", ReposController.list)

module.exports = router;