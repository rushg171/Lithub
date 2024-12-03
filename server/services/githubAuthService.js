const axios = require("axios");
const {urlParamsToJSON} = require("../helpers/parseURLParams");
const GithubAuthService = {
    baseUrl: "https://github.com/login/oauth",

    getAccessToken: async function(code){
        try {
            const clientId = process.env.GITHUB_CLIENT_ID;
            const clientSecret = process.env.GITHUB_CLIENT_SECRET;
            const scopes = ['repo', 'read:user', 'user:email', 'read:org'];
            if(!code || !clientId || !clientSecret){
                return Error("Code or Client cred missing!");
            }
            const requestUrl = `${this.baseUrl}/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&scope=${scopes.join(' ')}`
            const headers = {
                'Accept': 'application/json', // Tells the server you expect JSON in response
            }
            const response = await axios.get(requestUrl, headers);
            if(response.status != 200) return Error("failed access token reques");
            const parsedData = urlParamsToJSON(response.data);
            return parsedData;
        } catch (error) {
            console.error(error);
        }
        
    }
}

module.exports = GithubAuthService;