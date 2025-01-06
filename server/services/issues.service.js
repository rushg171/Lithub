const Issues = require("../models/issues.model");
const GithubService = require("./githubService");
const setRepoField = require("../helpers/setRepoField") 

const IssueService = {
    createMultiple: async function (issues) {
        try {
            const result = await Issues.create(issues);
            return result;
        } catch (error) {
            console.log(error)
        }
    },

    createForRepo: async function (repoId, repoFullName, accessToken) {
        try {
            const lastPage = await GithubService.getLastPageForIssuesByRepo(accessToken, repoFullName);
            console.log("lastpage", lastPage);
            let totalIssues = 0;
            for (let page = 1; page <= lastPage; page++) {
                let issues = await GithubService.getIssuesByRepo(accessToken, repoFullName, page);
                for(const issue of issues){
                    issue["issue_id"]=issue.id;
                }
                issues = setRepoField(repoId, issues);

                const uploadResult = await this.createMultiple(issues);
                totalIssues+=uploadResult?.length;
            }
            return {createdIssues: totalIssues};
        } catch (error) {
            console.log(error)
        }
    },

    findAll: async (page, perPage)=>{
        if(!perPage) perPage = 10;
        if(!page) page = 1;
        try {
            return await Issues.find({},null,{limit: perPage, skip: perPage*(page-1)});
        } catch (error) {
            console.log(error);
        }
    },
}

module.exports = IssueService;