const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GithubIntegrationsSchema = new Schema({
  githubId: { type: Number, required: true, unique: true },
  name: { type: String },
  username: { type: String },
  email: { type: String },
  profileUrl: { type: String },
  avatarUrl: { type: String },
  accessToken: { type: String },
  includedRepos: {type: [Number], default: [], required: false},
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("github-integrations", GithubIntegrationsSchema);