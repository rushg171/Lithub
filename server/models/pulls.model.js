const mongoose = require("mongoose");
const ReposModel = require("./repos.model");

const UserSchema = new mongoose.Schema({
  login: { type: String, required: false },
  id: { type: Number, required: false },
  node_id: { type: String, required: false },
  avatar_url: { type: String },
  gravatar_id: { type: String },
  type: { type: String, required: false },
  site_admin: { type: Boolean, required: false },
});

const LabelSchema = new mongoose.Schema({
  id: { type: Number, required: false },
  node_id: { type: String, required: false },
  name: { type: String, required: false },
  description: { type: String },
  color: { type: String },
  default: { type: Boolean },
});

const MilestoneSchema = new mongoose.Schema({
  id: { type: Number, required: false },
  node_id: { type: String, required: false },
  number: { type: Number, required: false },
  state: { type: String, required: false },
  title: { type: String, required: false },
  description: { type: String },
  creator: UserSchema,
  open_issues: { type: Number },
  closed_issues: { type: Number },
  created_at: { type: Date },
  updated_at: { type: Date },
  closed_at: { type: Date },
  due_on: { type: Date },
});

const TeamSchema = new mongoose.Schema({
  id: { type: Number, required: false },
  node_id: { type: String, required: false },
  name: { type: String, required: false },
  slug: { type: String, required: false },
  description: { type: String },
  privacy: { type: String },
  permission: { type: String },
  notification_setting: { type: String },
  parent: { type: mongoose.Schema.Types.Mixed }, // Adjust if parent structure is known
});

const PullRequestSchema = new mongoose.Schema({
  repo: {type: mongoose.Schema.Types.ObjectId, ref: ReposModel},
  pull_id: { type: Number, required: true, unique: true },
  node_id: { type: String, required: false },
  number: { type: Number, required: false },
  state: { type: String, required: false },
  locked: { type: Boolean, required: false },
  title: { type: String, required: false },
  user: UserSchema,
  body: { type: String },
  labels: [LabelSchema],
  milestone: MilestoneSchema,
  active_lock_reason: { type: String },
  created_at: { type: Date, required: false },
  updated_at: { type: Date, required: false },
  closed_at: { type: Date },
  merged_at: { type: Date },
  merge_commit_sha: { type: String },
  assignee: UserSchema,
  assignees: [UserSchema],
  requested_reviewers: [UserSchema],
  requested_teams: [TeamSchema],
  head: {
    label: { type: String },
    ref: { type: String },
    sha: { type: String },
    user: UserSchema,
  },
  base: {
    label: { type: String },
    ref: { type: String },
    sha: { type: String },
    user: UserSchema,
  },
});

module.exports = mongoose.model("pull-requests", PullRequestSchema);
