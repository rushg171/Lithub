const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  login: { type: String, required: false },
  id: { type: Number, required: false },
  node_id: { type: String, required: false },
  avatar_url: { type: String, required: false },
  gravatar_id: { type: String, default: "" },
  type: { type: String, required: false },
  site_admin: { type: Boolean, required: false },
});

const LabelSchema = new mongoose.Schema({
  id: { type: Number, required: false },
  node_id: { type: String, required: false },
  name: { type: String, required: false },
  description: { type: String, required: false },
  color: { type: String, required: false },
  default: { type: Boolean, required: false },
});

const MilestoneSchema = new mongoose.Schema({
  id: { type: Number, required: false },
  node_id: { type: String, required: false },
  number: { type: Number, required: false },
  state: { type: String, required: false },
  title: { type: String, required: false },
  description: { type: String, default: null },
  creator: { type: UserSchema, required: false },
  open_issues: { type: Number, required: false },
  closed_issues: { type: Number, required: false },
  created_at: { type: Date, required: false },
  updated_at: { type: Date, required: false },
  closed_at: { type: Date, default: null },
  due_on: { type: Date, default: null },
});

const PullRequestSchema = new mongoose.Schema({
  diff_url: { type: String, required: false },
  patch_url: { type: String, required: false },
});

const IssueSchema = new mongoose.Schema({
  issue_id: { type: Number, required: true, unique: true },
  node_id: { type: String, required: false },
  number: { type: Number, required: false },
  state: { type: String, required: false },
  title: { type: String, required: false },
  body: { type: String, default: null },
  user: { type: UserSchema, required: false },
  labels: { type: [LabelSchema], required: false },
  assignee: { type: UserSchema, default: null },
  assignees: { type: [UserSchema], default: [] },
  milestone: { type: MilestoneSchema, default: null },
  locked: { type: Boolean, required: false },
  active_lock_reason: { type: String, default: null },
  comments: { type: Number, required: false },
  pull_request: { type: PullRequestSchema, default: null },
  closed_at: { type: Date, default: null },
  created_at: { type: Date, required: false },
  updated_at: { type: Date, required: false },
  closed_by: { type: UserSchema, default: null },
  author_association: { type: String, required: false },
  state_reason: { type: String, default: null },
});

module.exports = mongoose.model('issues', IssueSchema);
