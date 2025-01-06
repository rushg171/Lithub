const Repos = require("../models/repos.model");
const CommmitService = require("./commits.service");
const IssueService = require("./issues.service");
const PullService = require("./pulls.service");


const RepoService = {
    checkIfExists: async (repoId)=>{
        try {
            const result = await Repos.countDocuments({repo_id:repoId});
            return result;
        } catch (error) {
            console.log(error);
        }
    },

    create: async (repo, userId, accessToken)=>{
        try {
            repo.user = userId;
            const result = await Repos.create(repo);
            console.log("CREATED NEW REPO!");
            const commitsUploadResult = await CommmitService.createForRepo(result._id, result.full_name, accessToken);
            const pullsUploadResult = await PullService.createForRepo(result._id, result.full_name, accessToken);
            const issuesUploadResult = await IssueService.createForRepo(result._id, result.full_name, accessToken);
            console.log(commitsUploadResult);
            console.log(pullsUploadResult);
            console.log(issuesUploadResult);
            return result;
        } catch (error) {
            console.log(error)
        }
    },

    list: async (page, perPage)=>{
        if(!perPage) perPage = 10;
        if(!page) page = 1;
        try {
            return await Repos.find({},null,{limit: perPage, skip: perPage*(page-1)});
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = RepoService;