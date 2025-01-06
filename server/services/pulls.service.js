const PullRequestModel = require("../models/pulls.model");
const GithubService = require("./githubService");
const setRepoField = require("../helpers/setRepoField") 

const PullService = {
    createMultiple: async function (pulls) {
        try {
            const result = await PullRequestModel.create(pulls);
            return result;
        } catch (error) {
            console.log(error)
        }
    },

    createForRepo: async function (repoId, repoFullName, accessToken) {
        try {
            const lastPage = await GithubService.getLastPageForPullsByRepo(accessToken, repoFullName);
            console.log("lastpage", lastPage);
            let totalPulls = 0;
            for (let page = 1; page <= lastPage; page++) {
                let pulls = await GithubService.getPullsByRepo(accessToken, repoFullName, page);
                for(const pull of pulls){
                    pull["pull_id"]=pull.id;
                }
                pulls = setRepoField(repoId, pulls);

                const uploadResult = await this.createMultiple(pulls);
                totalPulls+=uploadResult?.length;
            }
            return {createdPulls: totalPulls};
        } catch (error) {
            console.log(error)
        }

    },

    findAll: async (page, perPage)=>{
        if(!perPage) perPage = 10;
        if(!page) page = 1;
        try {
            return await PullRequestModel.find({},null,{limit: perPage, skip: perPage*(page-1)});
        } catch (error) {
            console.log(error);
        }
    },
}

module.exports = PullService;