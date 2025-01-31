export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  private: boolean;
  created_at: string;
  updated_at: string;
  website?: string;
  topics?: [];
  action?: string;
}
