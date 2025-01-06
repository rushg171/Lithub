export interface IntegrationDetails {
  _id: string;
  githubId: number;
  name: string;
  username: string;
  email: string;
  profileUrl: string;
  avatarUrl: string;
  accessToken: string;
  includedRepos: { id: number, full_name: string }[];
  createdAt: Date;
}