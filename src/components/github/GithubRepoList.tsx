import { useState, useEffect } from "react";
import { 
  Card, CardContent, Typography, Grid, Dialog, DialogActions, DialogContent, DialogTitle, 
  Box, Tooltip, Stack, Pagination 
} from "@mui/material";

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// Icons
import VisibilityIcon from '@mui/icons-material/VisibilityRounded';
import SendIcon from '@mui/icons-material/OpenInNewRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';
import EditIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/DeleteForeverRounded';

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

interface GitHubRepoListProps {
  sortBy: "name" | "date"; // Sorting criteria
}

const GitHubRepoList: React.FC<GitHubRepoListProps> = ({ sortBy }) => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const reposPerPage = 6;

  useEffect(() => {
    fetchRepos();
  }, [sortBy]); // Re-fetch when sorting changes

  const fetchRepos = async () => {
    try {
      const response = await axios.get("/api/cloud/github");
      const sortedRepos = sortRepositories(response.data, sortBy);
      setRepos(sortedRepos);
    } catch (error) {
      console.error("Error fetching GitHub repositories:", error);
    }
  };

  // Sorting Function
  const sortRepositories = (repoList: GitHubRepo[], criteria: "name" | "date") => {
    return [...repoList].sort((a, b) => {
      if (criteria === "name") return a.name.localeCompare(b.name);
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  };

  // Open repo details dialog
  const handleRepoClick = (repo: GitHubRepo) => {
    setSelectedRepo(repo);
    setOpenDialog(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRepo(null);
  };

  // Handle repo deletion
  const handleDeleteRepo = async (repoId: number) => {
    if (!window.confirm("Are you sure you want to delete this repository?")) return;

    try {
      await axios.delete(`/api/cloud/github/${repoId}`);
      setRepos(repos.filter((repo) => repo.id !== repoId));
    } catch (error) {
      console.error("Error deleting repository:", error);
    }
  };

  // Handle repo update (stub function)
  const handleUpdateRepo = (repo: GitHubRepo) => {
    console.log("Update repo:", repo);
    // You can add functionality to open an edit dialog here.
  };

  // Handle pagination change
  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  // Get repos for current page
  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);

  return (
    <Box>
      <Grid container spacing={3}>
      
        {currentRepos.map((repo) => (
          <Grid item xs={12} sm={6} md={4} key={repo.id}>
            <Card sx={{height: "100%"}}>
              <CardContent>
                <Typography variant="h6">{repo.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {repo.description || "No description available."}
                </Typography>
                <Typography variant="caption" display="block" color="textSecondary">
                  Last Updated: {new Date(repo.updated_at).toLocaleDateString()}
                </Typography>

                {/* Icon Buttons */}
                <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
                  <Tooltip title="View Details">
                    <IconButton color="primary" onClick={() => handleRepoClick(repo)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Update Repository">
                    <IconButton color="info" onClick={() => handleUpdateRepo(repo)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Repository">
                    <IconButton color="error" onClick={() => handleDeleteRepo(repo.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination Component */}
      {repos.length > reposPerPage && (
        <Stack alignItems="center" mt={4}>
          <Pagination
            count={Math.ceil(repos.length / reposPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      )}

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
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" startIcon={<CloseIcon />} onClick={handleCloseDialog} color="primary">
              Close
            </Button>
            <Button variant="contained" endIcon={<SendIcon />} onClick={() => window.open(selectedRepo?.html_url, "_blank")} color="primary">
              Open in GitHub
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GitHubRepoList;

