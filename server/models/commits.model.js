const mongoose = require('mongoose');
const ReposModel = require('./repos.model');

const VerificationSchema = new mongoose.Schema({
  verified: { type: Boolean, required: false },
  reason: { type: String, required: false },
  signature: { type: String, default: null },
  payload: { type: String, default: null },
  verified_at: { type: Date, default: null },
});

const AuthorCommitterSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: false },
  date: { type: Date, required: false },
});

const TreeSchema = new mongoose.Schema({
  sha: { type: String, required: false },
});

const CommitObjectSchema = new mongoose.Schema({
  author: { type: AuthorCommitterSchema, required: false },
  committer: { type: AuthorCommitterSchema, required: false },
  message: { type: String, required: false },
  tree: { type: TreeSchema, required: false },
  comment_count: { type: Number, required: false },
  verification: { type: VerificationSchema, required: false },
});

const UserSchema = new mongoose.Schema({
  login: { type: String, required: false },
  id: { type: Number, required: false },
  node_id: { type: String, required: false },
  avatar_url: { type: String, required: false },
  gravatar_id: { type: String, default: "" },
  type: { type: String, required: false },
  site_admin: { type: Boolean, required: false },
});

const ParentSchema = new mongoose.Schema({
  sha: { type: String, required: false },
});

const CommitSchema = new mongoose.Schema({
  repo: { type: mongoose.Schema.Types.ObjectId, ref: ReposModel },
  sha: { type: String, required: false, unique: true },
  node_id: { type: String, required: false},
  commit: { type: CommitObjectSchema, required: false },
  author: { type: UserSchema, required: false },
  committer: { type: UserSchema, required: false },
  parents: { type: [ParentSchema], required: false },
});

module.exports = mongoose.model('Commits', CommitSchema);
