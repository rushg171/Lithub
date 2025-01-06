const RepoService = require("../services/repoService");

const controller = {
    list : async function (req, res) {
        try {
            const {page, per_page} = req.query;
            const repoList = await RepoService.list(page, per_page);
            res.json(repoList);
        } catch (error) {
            console.log(error);
            return res.status(400).send('Error processing your request');
        }
    }
}

module.exports = controller;