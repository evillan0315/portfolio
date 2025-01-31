import React, { useState, useEffect, useCallback } from "react";

// MUI components
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import IconButton from "@mui/material/IconButton";

// Icons
import VisibilityIcon from "@mui/icons-material/VisibilityRounded";
import EditIcon from "@mui/icons-material/EditRounded";
import DeleteIcon from "@mui/icons-material/DeleteForeverRounded";
import axios from "axios";
import GithubDialogComponent from "./DialogComponent";
import { GitHubRepo } from "@/types/github";
// Type for a GitHub repo

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

  const fetchRepos = useCallback(async () => {
	  try {
	    const response = await axios.get("/api/cloud/github");
	    const sortedRepos = sortRepositories(response.data, sortBy);
	    setRepos(sortedRepos);
	  } catch (error) {
	    console.error("Error fetching GitHub repositories:", error);
	  }
	}, [sortBy]); // Dependencies

	useEffect(() => {
	  fetchRepos();
	}, [fetchRepos]); // Now `fetchRepo

  // Sorting Function
  const sortRepositories = (
    repoList: GitHubRepo[],
    criteria: "name" | "date"
  ) => {
    return [...repoList].sort((a, b) => {
      if (criteria === "name") return a.name.localeCompare(b.name);
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
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
    if (!window.confirm("Are you sure you want to delete this repository?"))
      return;

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
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  // Get repos for current page
  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);
  //if (!selectedRepo) return null; // Handle null case
  return (
    <Box>
      <Grid container spacing={3}>
        {currentRepos.map((repo) => (
          <Grid key={repo.id} size={4}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6">{repo.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {repo.description || "No description available."}
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  color="textSecondary"
                >
                  Last Updated: {new Date(repo.updated_at).toLocaleDateString()}
                </Typography>

                {/* Icon Buttons */}
                <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
                  <Tooltip title="View Details">
                    <IconButton
                      color="primary"
                      onClick={() => handleRepoClick(repo)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Update Repository">
                    <IconButton
                      color="info"
                      onClick={() => handleUpdateRepo(repo)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Repository">
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteRepo(repo.id)}
                    >
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
      <GithubDialogComponent
        selectedRepo={selectedRepo as GitHubRepo}
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
      />
      {/*       <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{selectedRepo?.name}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            <strong>Description:</strong>{" "}
            {selectedRepo?.description || "No description available."}
          </Typography>
          <Typography variant="body1">
            <strong>Created At:</strong>{" "}
            {DateTime.fromISO(selectedRepo.created_at).toLocaleString(
              DateTime.DATETIME_MED
            )}
          </Typography>
          <Typography variant="body1">
            <strong>Updated At:</strong>{" "}
            {DateTime.fromISO(selectedRepo?.updated_at).toLocaleString(
              DateTime.DATETIME_MED
            )}
          </Typography>
          <Typography variant="body1">
            <strong>Created At (Time Ago):</strong>{" "}
            {DateTime.fromISO(selectedRepo?.created_at).toRelative()}
          </Typography>
          <Typography variant="body1">
            <strong>Updated At (Time Ago):</strong>{" "}
            {DateTime.fromISO(selectedRepo?.updated_at).toRelative()}
          </Typography>
          <Typography variant="body1">
            <strong>Private:</strong> {selectedRepo?.private ? "Yes" : "No"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<CloseIcon />}
              onClick={handleCloseDialog}
              color="primary"
            >
              Close
            </Button>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => window.open(selectedRepo?.html_url, "_blank")}
              color="primary"
            >
              Open in GitHub
            </Button>
          </Stack>
        </DialogActions>
      </Dialog> */}
    </Box>
  );
};

export default GitHubRepoList;
