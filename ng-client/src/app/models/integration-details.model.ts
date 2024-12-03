export interface IntegrationDetails{
    _id :string;
    githubId: number;
  name: string;
  username: string;
  email: string;
  profileUrl: string;
  avatarUrl: string;
  accessToken: string;
  includedRepos: number[];
  createdAt: Date;
}