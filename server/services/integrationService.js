const GithubIntegrations = require("../models/github-integrations");
const GithubService = require("./githubService");

const IntegrationService = {
    createIntegration: async function(githubUser) {
        try {   
            const result = await GithubIntegrations.create(githubUser);
            console.log(result);
            return result;  
        } catch (error) {
            console.error(`Error in fetching document: ${error.message}`);
        } 
    },

    findById: async function (id){
        try {    
            const result = await GithubIntegrations.findById(id);
            return result;
        } catch (error) {
            console.error(`Error in fetching document: ${error.message}`);
        }
    },

    findByGithubId: async function (githubId) {
        try {
            const result = await GithubIntegrations.findOne({ githubId });
            console.log(result);
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
            console.log(insights);
            return insights;
        } catch (error) {
            console.error(`Error in fetching document: ${error.message}`);
            throw error;
        }
    }
    
    
}

module.exports = IntegrationService;