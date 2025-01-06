const express = require("express");
const router = express.Router();
const CollectionController = require("../controllers/collection.controller")

router.get("/commits", CollectionController.getAllCommits);
router.get("/pulls", CollectionController.getAllPulls);
router.get("/issues", CollectionController.getAllIssues);
router.get("/integrations", CollectionController.getAllIntegrations);

module.exports = router;