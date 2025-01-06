const GithubIntegrations = require("../models/github-integrations");
const GithubService = require("./githubService");
const RepoService = require("./repoService");

const IntegrationService = {
    createIntegration: async function (githubUser) {
        try {
            const result = await GithubIntegrations.create(githubUser);
            console.log("User Created", result);
            return result;
        } catch (error) {
            console.error(`Error in fetching document: ${error.message}`);
        }
    },

    findAll: async function (perPage,page) {
        try {
            const result = await GithubIntegrations.find({},null,{limit: perPage, skip: perPage*(page-1)}).exec();
            return result;
        } catch (error) {
            console.error(`Error in fetching document: ${error.message}`);
        }
    },

    findById: async function (id) {
        try {
            const result = await GithubIntegrations.findById(id).exec();
            return result;
        } catch (error) {
            console.error(`Error in fetching document: ${error.message}`);
        }
    },

    findByGithubId: async function (githubId) {
        try {
            const result = await GithubIntegrations.findOne({ githubId });
            return result;
        } catch (error) {
            console.error(`Error in fetching document: ${error.message}`);
        }
    },

    delete: async function (id) {
        try {
            const result = await GithubIntegrations.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.error(`Error in fetching document: ${error.message}`);
            throw error;
        }
    },

    createRepoAndAddToList: async function (id, repos) {
        try {
            const listUpdateResult = await this.updateIncludedRepos(id, repos);
            for (const repo of repos) {
                const exists = await RepoService.checkIfExists(repo.id);
                if (!exists) {
                    const user = await this.findById(id);
                    if (!user) {
                        throw new Error(`User with ID ${id} not found.`);
                    }
                    const repository = await GithubService.getRepoByName(user.accessToken, repo.full_name);
                    repository["repo_id"] = repository.id;
                    delete repository.id;
                    const result = await RepoService.create(repository, user._id, user.accessToken);
                }
            }

            return listUpdateResult;
        } catch (error) {
            console.error(error);
        }
    },

    updateIncludedRepos: async function (id, repos) {
        try {
            const result = await GithubIntegrations.findByIdAndUpdate(id, { includedRepos: repos }, { new: true });
            return result;
        } catch (error) {
            console.error(`Error in fetching document: ${error.message}`);
            throw error;
        }
    },

    insights: async function (id) {
        try {
            const user = await this.findById(id);
            if (!user) {
                throw new Error(`User with ID ${id} not found.`);
            }
            const insights = await GithubService.getInsights(user.includedRepos, user.accessToken);
            return insights;
        } catch (error) {
            console.error(`Error in fetching document: ${error.message}`);
            throw error;
        }
    },

    findAll: async (page, perPage)=>{
        if(!perPage) perPage = 10;
        if(!page) page = 1;
        try {
            return await GithubIntegrations.find({},null,{limit: perPage, skip: perPage*(page-1)});
        } catch (error) {
            console.log(error);
        }
    },


}

module.exports = IntegrationService;