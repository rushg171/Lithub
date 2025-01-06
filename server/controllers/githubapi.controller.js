const GithubService = require('../services/githubService');

const controller = {
    repoSearch: async (req, res)=>{
        try {
            const {search_term} = req.query;
            const searchResults = await GithubService.getReposBySearch(search_term);
            res.status(200).json(searchResults);
        } catch (error) {
            console.log(error);
            res.status(401).send(error.message);
        }
    },
}

module.exports = controller;