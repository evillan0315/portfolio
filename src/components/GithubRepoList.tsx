import { useState, useEffect } from "react";
import { Button, Card, CardContent, Typography, Grid, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import axios from "axios";

// Type for a GitHub repo
interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  private: boolean;
  created_at: string;
  updated_at: string;
}

const GitHubRepoList = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get("/api/cloud/github");
        setRepos(response.data);
      } catch (error) {
        console.error("Error fetching GitHub repositories:", error);
      }
    };
    fetchRepos();
  }, []);

  const handleRepoClick = (repo: GitHubRepo) => {
    setSelectedRepo(repo);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRepo(null);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        GitHub Repositories
      </Typography>

      <Grid container spacing={3}>
        {repos.map((repo) => (
          <Grid item xs={12} sm={6} md={4} key={repo.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{repo.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {repo.description || "No description available."}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleRepoClick(repo)}
                  sx={{ mt: 2 }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for individual repo details */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{selectedRepo?.name}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            <strong>Description:</strong> {selectedRepo?.description || "No description available."}
          </Typography>
          <Typography variant="body1">
            <strong>Created At:</strong> {new Date(selectedRepo?.created_at).toLocaleDateString()}
          </Typography>
          <Typography variant="body1">
            <strong>Updated At:</strong> {new Date(selectedRepo?.updated_at).toLocaleDateString()}
          </Typography>
          <Typography variant="body1">
            <strong>Private:</strong> {selectedRepo?.private ? "Yes" : "No"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
          <Button
            onClick={() => window.open(selectedRepo?.html_url, "_blank")}
            color="primary"
            variant="contained"
          >
            Open in GitHub
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GitHubRepoList;
