export interface RepoInsights{
    id: number;
    full_name: string;
    commitCount?: number; // Optional, as it's missing in some entries
    pullCount?: number;
    issueCount?: number;     
}