export interface PullRequest {
    _id: string;
    repo: string;
    pull_id: number;
    node_id: string;
    number: number;
    state: string;
    locked: boolean;
    title: string;
    user: {
      login: string;
      id: number;
      node_id: string;
      avatar_url: string;
      gravatar_id: string;
      type: string;
      site_admin: boolean;
      _id: string;
    };
    body: string;
    labels: Array<any>;
    milestone: any;
    active_lock_reason: any;
    created_at: string;
    updated_at: string;
    closed_at: any;
    merged_at: any;
    merge_commit_sha: string;
    assignee: any;
    assignees: Array<any>;
    requested_reviewers: Array<any>;
    requested_teams: Array<any>;
    head: {
      label: string;
      ref: string;
      sha: string;
      user: {
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string;
        type: string;
        site_admin: boolean;
        _id: string;
      };
    };
    base: {
      label: string;
      ref: string;
      sha: string;
      user: {
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string;
        type: string;
        site_admin: boolean;
        _id: string;
      };
    };
    __v: number;
  }
  