export interface GitHubRepo {
  id?: number;
  name: string;
  repoName?: string;
  description: string;
  html_url?: string;
  private?: boolean;
  isPrivate?: boolean;
  created_at: string;
  updated_at: string;
  website?: string;
  topics?: [];
  action?: string;
  homepage?: string;
  full_name?: string;
  owner?: any;
}
