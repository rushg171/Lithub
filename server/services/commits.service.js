const CommitsModel = require("../models/commits.model");
const GithubService = require("./githubService");
const setRepoField = require("../helpers/setRepoField") 

const CommmitService = {
    createMultiple: async function (commits) {
        try {
            const result = await CommitsModel.create(commits);
            return result;
        } catch (error) {
            console.log(error)
        }
    },

    findAll: async (page, perPage)=>{
        if(!perPage) perPage = 10;
        if(!page) page = 1;
        try {
            return await CommitsModel.find({},null,{limit: perPage, skip: perPage*(page-1)});
        } catch (error) {
            console.log(error);
        }
    },

    createForRepo: async function (repoId, repoFullName, accessToken) {
        try {
            const lastPage = await GithubService.getLastPageForCommitsByRepo(accessToken, repoFullName);
            console.log("lastpage", lastPage);
            let totalCommits = 0;
            for (let page = 1; page <= lastPage; page++) {
                let commits = await GithubService.getCommitsByRepo(accessToken, repoFullName, page);
                commits = setRepoField(repoId, commits);
                const uploadResult = await this.createMultiple(commits);
                totalCommits+=uploadResult?.length;
            }
            return {createdCommits: totalCommits};
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = CommmitService;