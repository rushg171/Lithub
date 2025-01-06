const IntegrationService = require("../services/integrationService");
const jwt = require("jsonwebtoken");
const GithubService = require("../services/githubService");
const RepoService = require("../services/repoService");

const controller = {
    get: async function(req, res) {
        try {
            const githubIntegration = await IntegrationService.findById(req.user.userId);
            res.json(githubIntegration);
          } catch (err) {
            console.error('JWT verification failed:', err);
            return res.status(401).send('Invalid or expired JWT');
          }
    },

    delete: async function (req, res) {
        try {
            const result = await IntegrationService.delete(req.user.userId);
            console.log(result)
            res.clearCookie("githubIntegrationToken")
            res.json(result);
          } catch (err) {
            console.error('JWT verification failed:', err);
            return res.status(401).send('Invalid or expired JWT');
          }
    },

    getAllOrgs: async function (req, res) {
      try {
          const user = await IntegrationService.findById(req.user.userId);
          if(!user) return res.status(400).send('No user found');
          const result = await GithubService.getAllOrgsForUser(user.accessToken);

          res.json(result);
        } catch (err) {
          console.error('JWT verification failed:', err);
          return res.status(401).send('Invalid or expired JWT');
        }
  },

  getReposForAllOrgs: async function (req, res) {
    try {
        const user = await IntegrationService.findById(req.user.userId);
        if(!user) return res.status(400).send('No user found');
        const result = await GithubService.getReposForAllOrgs(user.accessToken);

        res.json(result);
      } catch (err) {
        console.error('JWT verification failed:', err);
        return res.status(401).send('Invalid or expired JWT');
      }
  },

  getInsights: async function (req, res) {
    try {
        const user = await IntegrationService.findById(req.user.userId);
        if(!user) return res.status(400).send('No user found');
        const result = await IntegrationService.insights(user._id);
        res.json(result);
      } catch (err) {
        console.error('JWT verification failed:', err);
        return res.status(401).send('Invalid or expired JWT');
      }
  },

  updateIncludedRepos: async function (req, res) {

    try {
      const user = await IntegrationService.findById(req.user.userId);
      if(!user) return res.status(400).send('No user found');

      const {includedRepos} = req.body;
      console.log(includedRepos);

      
      const result = await IntegrationService.createRepoAndAddToList(user._id, includedRepos);

      res.json(result);
    } catch (err) {
      console.error('JWT verification failed:', err);
      return res.status(401).send('Invalid or expired JWT');
    }
  }
}

module.exports = controller;