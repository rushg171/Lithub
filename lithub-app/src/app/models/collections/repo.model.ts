interface Owner {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    type: string;
    site_admin: boolean;
  }
  
  interface Permissions {
    admin: boolean;
    push: boolean;
    pull: boolean;
  }
  
export interface CollectionRepository {
    owner: Owner;
    permissions: Permissions;
    _id: string;
    user: string;
    repo_id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    description: string | null;
    fork: boolean;
    language: string | null;
    forks_count: number;
    stargazers_count: number;
    watchers_count: number;
    size: number;
    default_branch: string;
    open_issues_count: number;
    is_template: boolean;
    topics: string[];
    has_issues: boolean;
    has_projects: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    has_downloads: boolean;
    has_discussions: boolean;
    archived: boolean;
    disabled: boolean;
    visibility: string;
    pushed_at: string; // ISO date string
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
    __v: number;
  }
  