const CommmitService = require("../services/commits.service");
const IntegrationService = require("../services/integrationService");
const IssueService = require("../services/issues.service");
const PullService = require("../services/pulls.service");

const controller = {
    getAllCommits : async function (req, res) {
        try {
            const {page, per_page} = req.query;
            
            const repoList = await CommmitService.findAll(page, per_page);
            res.json(repoList);
        } catch (error) {
            console.log(error);
            return res.status(400).send('Error processing your request');
        }
    },

    getAllPulls : async function (req, res) {
        try {
            const {page, per_page} = req.query;
            
            const repoList = await PullService.findAll(page, per_page);
            res.json(repoList);
        } catch (error) {
            console.log(error);
            return res.status(400).send('Error processing your request');
        }
    },

    getAllIssues : async function (req, res) {
        try {
            const {page, per_page} = req.query;
            
            const repoList = await IssueService.findAll(page, per_page);
            res.json(repoList);
        } catch (error) {
            console.log(error);
            return res.status(400).send('Error processing your request');
        }
    },

    getAllIntegrations : async function (req, res) {
        try {
            const {page, per_page} = req.query;
            
            const repoList = await IntegrationService.findAll(page, per_page);
            res.json(repoList);
        } catch (error) {
            console.log(error);
            return res.status(400).send('Error processing your request');
        }
    }
}

module.exports = controller;