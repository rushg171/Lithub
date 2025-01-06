export interface Commit {
    _id: string;
    repo: string;
    sha: string;
    node_id: string;
    commit: {
      author: {
        name: string;
        email: string;
        date: string;
        _id: string;
      };
      committer: {
        name: string;
        email: string;
        date: string;
        _id: string;
      };
      message: string;
      tree: {
        sha: string;
        _id: string;
      };
      comment_count: number;
      verification: {
        verified: boolean;
        reason: string;
        signature: string;
        payload: string;
        verified_at: string;
        _id: string;
      };
      _id: string;
    };
    author: {
      login: string;
      id: number;
      node_id: string;
      avatar_url: string;
      gravatar_id: string;
      type: string;
      site_admin: boolean;
      _id: string;
    };
    committer: {
      login: string;
      id: number;
      node_id: string;
      avatar_url: string;
      gravatar_id: string;
      type: string;
      site_admin: boolean;
      _id: string;
    };
    parents: Array<{
      sha: string;
      _id: string;
    }>;
    __v: number;
  }
  