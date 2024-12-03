const axios = require("axios");

const GithubService = {
    baseUrl: "https://api.github.com",

    getUserDetails: async function(accessToken) {
        try {
            const headers = {
                "Authorization": `Bearer ${accessToken}`,
                "Accept": "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28"
            }
            const requrestUrl = `${this.baseUrl}/user`
    
            const response = await axios.get(requrestUrl, {headers});
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    //get all org for a user
    getAllOrgsForUser: async function (accessToken) {
        try {
            const headers = {
                "Authorization": `Bearer ${accessToken}`,
                "Accept": "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28"
            }
            const requrestUrl = `${this.baseUrl}/user/orgs`;
    
            const response = await axios.get(requrestUrl, {headers});
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    getReposForOrg: async function (orgName, accessToken) {
        try {
            const headers = {
                "Authorization": `Bearer ${accessToken}`,
                "Accept": "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28"
            }
            const requrestUrl = `${this.baseUrl}/orgs/${orgName}/repos`
    
            const response = await axios.get(requrestUrl, {headers});
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    getReposForAllOrgs: async function (accessToken) {
        try {
            const allOrgs = await this.getAllOrgsForUser(accessToken);
            const allOrgsRepos = []
            for(let org of allOrgs){
                const repos = await this.getReposForOrg(org.login, accessToken);
                allOrgsRepos.push(...repos);
            }
            return allOrgsRepos;
        } catch (error) {
            console.error(error);
        }
    },

    getInsights: async function (repoIds, accessToken) {
        try {
            const headers = {
                "Authorization": `Bearer ${accessToken}`,
                "Accept": "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28"
            }

            let allCounts = repoIds.map(async repoId=>{
                const requrestUrl = `${this.baseUrl}/repositories/${repoId}`;
                const repo = (await axios.get(requrestUrl, {headers})).data;

                // Fetch commit count, pull count, and issue count concurrently
                const [commitCount, pullCount, issueCount] = await Promise.all([
                    this.getTotalCommitsCount(repo, accessToken),
                    this.getTotalPullReqCount(repo, accessToken),
                    this.getTotalIssuesCount(repo, accessToken),
                ]);
                
                return {
                    id: repo.id,
                    full_name: repo.full_name,
                    commitCount,
                    pullCount,
                    issueCount,
                }
            });
            let result = await Promise.all(allCounts);
            console.log(result);
            return result;
        } catch (error) {
            console.error(error);
        }
    },

    getTotalCommitsCount: async function (repo, accessToken) {
        try {
                
            const url = 'https://api.github.com/graphql';
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            };

            const query = {
                query: `
                {
                repository(owner: "${repo.owner.login}", name: "${repo.name}") {
                    defaultBranchRef {
                    target {
                        ... on Commit {
                        history {
                            totalCount
                        }
                        }
                    }
                    }
                }
                }`
            };

            const response = await axios.post(url, query, { headers });
            const totalCommits = response.data.data.repository.defaultBranchRef.target.history.totalCount;
            
            return totalCommits;
        } catch (error) {
            
        }
        
    },

    getTotalPullReqCount: async function (repo, accessToken) {
        try {
            const headers = {
                "Authorization": `Bearer ${accessToken}`,
                "Accept": "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28"
            }

            const requrestUrl = `${this.baseUrl}/repos/${repo.full_name}/pulls?per_page=100&page=1`;
    
            const pullRequests = (await axios.get(requrestUrl, {headers})).data;
            return pullRequests.length;
        } catch (error) {
            console.error(error);
        }
    },

    getTotalIssuesCount: async function (repo, accessToken) {
        try {
            const headers = {
                "Authorization": `Bearer ${accessToken}`,
                "Accept": "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28"
            }

            
            const requrestUrl = `${this.baseUrl}/repos/${repo.full_name}/issues?per_page=100&page=1`;
    
            const issues = (await axios.get(requrestUrl, {headers})).data;
            return issues.length;
        } catch (error) {
            console.error(error);
        }
    }


}

module.exports = GithubService;
