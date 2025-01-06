const mongoose = require("mongoose");
const GithubIntegrationUser = require("../models/github-integrations")

const Schema = mongoose.Schema;

const ReposSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: GithubIntegrationUser},
    repo_id: { type: Number, required: true, unique: true },
    node_id: { type: String },
    name: { type: String },
    full_name: { type: String },
    owner: {
        login: { type: String },
        id: { type: Number },
        node_id: { type: String },
        avatar_url: { type: String },
        gravatar_id: { type: String },
        type: { type: String },
        site_admin: { type: Boolean },
    },
    private: { type: Boolean },
    description: { type: String },
    fork: { type: Boolean },
    language: { type: String },
    forks_count: { type: Number },
    stargazers_count: { type: Number },
    watchers_count: { type: Number },
    size: { type: Number },
    default_branch: { type: String },
    open_issues_count: { type: Number },
    is_template: { type: Boolean },
    topics: { type: [String] },
    has_issues: { type: Boolean },
    has_projects: { type: Boolean },
    has_wiki: { type: Boolean },
    has_pages: { type: Boolean },
    has_downloads: { type: Boolean },
    has_discussions: { type: Boolean },
    archived: { type: Boolean },
    disabled: { type: Boolean },
    visibility: { type: String },
    pushed_at: { type: String },
    created_at: { type: String },
    updated_at: { type: String },
    permissions: {
        admin: { type: Boolean },
        push: { type: Boolean },
        pull: { type: Boolean },
    },
    security_and_analysis: {
        status: { type: String },
    },
});

module.exports = mongoose.model("repos", ReposSchema);
