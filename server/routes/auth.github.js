const express = require("express");
const router = express.Router();
const GithubAuthController = require("../controllers/auth.github");

router.get("/connect", GithubAuthController.redirectToAuthorize);
router.get("/callback", GithubAuthController.callback);

module.exports = router;