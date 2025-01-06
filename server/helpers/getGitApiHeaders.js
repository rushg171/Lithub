const getGitApiHeaders = (accessToken) =>{
 return {
    "Authorization": `Bearer ${accessToken}`,
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28"
}
}

module.exports = getGitApiHeaders;