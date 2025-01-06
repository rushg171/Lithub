const express = require("express");
const router = express.Router();
const IntegrationController = require("../controllers/githubUser.controller");
const authenticateUser = require("../middlewares/authanticate-user.middleware");
const GithubApiController = require("../controllers/githubapi.controller");


router.get("/", authenticateUser, IntegrationController.get);
router.delete("/", authenticateUser, IntegrationController.delete);
router.get("/all-orgs", authenticateUser, IntegrationController.getAllOrgs);
router.get("/repos-for-all-orgs", authenticateUser, IntegrationController.getReposForAllOrgs);
router.get("/repos-search",  GithubApiController.repoSearch);
router.get("/insights", authenticateUser, IntegrationController.getInsights)
router.patch("/included-repos", authenticateUser, IntegrationController.updateIncludedRepos);

module.exports = router;