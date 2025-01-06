const getLastPageNoFromHeaderLink = require('./getLastPageNoFromHeaderLink');
const getGitApiHeaders = require('./getGitApiHeaders');
const { urlParamsToJSON } = require('./parseURLParams');
const setRepoField = require('./setRepoField');
module.exports = {
    getLastPageNoFromHeaderLink,
    getGitApiHeaders,
    urlParamsToJSON,
    setRepoField,
}