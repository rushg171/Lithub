const axios = require("axios");
const { getGitApiHeaders: gitHeaders, getLastPageNoFromHeaderLink } = require("../helpers/index");


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

    getRepoByName: async function (accessToken, repoFullName) {
        try {
            const headers = {
                "Authorization": `Bearer ${accessToken}`,
                "Accept": "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28"
            }
            const requrestUrl = `${this.baseUrl}/repos/${repoFullName}`;
            const response = await axios.get(requrestUrl, {headers});
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    getCommitsByRepo: async function (accessToken, repoFullName, pageNo) {
        try {
            console.log("Commit Page", pageNo);
            const headers = gitHeaders(accessToken);
            const requrestUrl = `${this.baseUrl}/repos/${repoFullName}/commits?per_page=100&page=${pageNo}`;
            const response = await axios.get(requrestUrl, {headers});
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    getLastPageForCommitsByRepo: async function (accessToken, repoFullName) {
        try {
            const headers = gitHeaders(accessToken);
            const requrestUrl = `${this.baseUrl}/repos/${repoFullName}/commits?per_page=100&page=1`;
            const response = await axios.get(requrestUrl, {headers});
            if(!response.headers.link) return 1;
            return getLastPageNoFromHeaderLink(response.headers.link);
        } catch (error) {
            console.error(error);
        }
    },

    getLastPageForPullsByRepo: async function (accessToken, repoFullName) {
        try {
            const headers = gitHeaders(accessToken);
            const requrestUrl = `${this.baseUrl}/repos/${repoFullName}/pulls?per_page=100&page=1`;
            const response = await axios.get(requrestUrl, {headers});
            if(!response.headers.link) return 1;
            return getLastPageNoFromHeaderLink(response.headers.link);
        } catch (error) {
            console.error(error);
        }
    },

    getPullsByRepo: async function (accessToken, repoFullName, pageNo) {
        try {
            console.log("Pulls Page", pageNo);
            const headers = gitHeaders(accessToken);
            const requrestUrl = `${this.baseUrl}/repos/${repoFullName}/pulls?per_page=100&page=${pageNo}`;
            const response = await axios.get(requrestUrl, {headers});
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    getIssuesByRepo: async function (accessToken, repoFullName, pageNo) {
        try {
            console.log("Issues Page", pageNo);
            const headers = gitHeaders(accessToken);
            const requrestUrl = `${this.baseUrl}/repos/${repoFullName}/issues?per_page=100&page=${pageNo}`;
            const response = await axios.get(requrestUrl, {headers});
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    getLastPageForIssuesByRepo: async function (accessToken, repoFullName) {
        try {
            const headers = gitHeaders(accessToken);
            const requrestUrl = `${this.baseUrl}/repos/${repoFullName}/issues?per_page=100&page=1`;
            const response = await axios.get(requrestUrl, {headers});
            if(!response.headers.link) return 1;
            return getLastPageNoFromHeaderLink(response.headers.link);
        } catch (error) {
            console.error(error);
        }
    },

    //get all org for a user
    getAllOrgsForUser: async function (accessToken) {
        try {
            const headers = gitHeaders(accessToken)
            const requrestUrl = `${this.baseUrl}/user/orgs`;
    
            const response = await axios.get(requrestUrl, {headers});
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    getReposForOrg: async function (orgName, accessToken) {
        try {
            const headers = gitHeaders(accessToken)
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

    getInsights: async function (repos, accessToken) {
        try {
            const headers = {
                "Authorization": `Bearer ${accessToken}`,
                "Accept": "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28"
            }

            let allCounts = repos.map(async repoDetail=>{
                const requrestUrl = `${this.baseUrl}/repos/${repoDetail.full_name}`;
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
        const url = 'https://api.github.com/graphql';
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };

        const query = {
            query: `
            {
                repository(owner: "${repo.owner.login}", name: "${repo.name}") {
                    pullRequests {
                        totalCount
                    }
                }
            }`
        };

        try {
            const response = await axios.post(url, query, { headers });
            const totalPullRequests = response.data.data.repository.pullRequests.totalCount;
            return totalPullRequests;
        } catch (error) {
            console.error('Error fetching total pull requests:', error.response ? error.response.data : error.message);
            throw error;
        }
    },

    getTotalIssuesCount: async function (repo, accessToken) {
        const url = 'https://api.github.com/graphql';
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };

        const query = {
            query: `
            {
                repository(owner: "${repo.owner.login}", name: "${repo.name}") {
                    issues {
                        totalCount
                    }
                }
            }`
        };

        try {
            const response = await axios.post(url, query, { headers });
            const totalIssues = response.data.data.repository.issues.totalCount;
            return totalIssues;
        } catch (error) {
            console.error('Error fetching total issues:', error.response ? error.response.data : error.message);
            throw error;
        }
    },

    getReposBySearch: async function(searchTerm) {
        try {
            const headers = {
                // "Authorization": `Bearer ${accessToken}`,
                "Accept": "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28"
            }

            
            const requrestUrl = `${this.baseUrl}/search/repositories?q=${encodeURIComponent(searchTerm)}&per_page=10&page=1`;
    
            const searchResults = (await axios.get(requrestUrl, {headers})).data;
            return searchResults.items;
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = GithubService;
