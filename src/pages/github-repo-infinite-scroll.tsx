import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Tooltip,
  Stack,
  CircularProgress,
} from "@mui/material";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
// Icons
import VisibilityIcon from "@mui/icons-material/VisibilityRounded";
import SendIcon from "@mui/icons-material/OpenInNewRounded";
import CloseIcon from "@mui/icons-material/CloseRounded";
import EditIcon from "@mui/icons-material/EditRounded";
import DeleteIcon from "@mui/icons-material/DeleteForeverRounded";

import axios from "axios";
import DateFormat from "@/components/DateFormat";

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

  // Infinite Scroll state
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  console.log(page);
  const reposPerPage = 6; // Load 6 repos at a time

  useEffect(() => {
    const fetchRepos = async (pageNumber: number) => {
      if (loading) return;
      setLoading(true);

      try {
        const response = await axios.get("/api/cloud/github");
        const sortedRepos = sortRepositories(response.data, sortBy);

        const newRepos = sortedRepos.slice(0, pageNumber * reposPerPage); // Simulating pagination from backend
        setRepos(newRepos);
      } catch (error) {
        console.error("Error fetching GitHub repositories:", error);
      } finally {
        setLoading(false);
      }
    };
    setRepos([]); // Reset repo list on sorting change
    setPage(1); // Reset page
    fetchRepos(1);
  }, [loading, sortBy]); // Re-fetch when sorting changes

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
  };

  // Infinite Scrolling - Load more repos when last item is in view
  const lastRepoRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => {
            const nextPage = prevPage + 1;
            // fetchRepos(nextPage);
            return nextPage;
          });
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <Box>
      <Grid container spacing={3}>
        {repos.map((repo, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={repo.id}
            ref={index === repos.length - 1 ? lastRepoRef : null}
          >
            <Card>
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

      {/* Loading Indicator */}
      {loading && (
        <Stack alignItems="center" mt={3}>
          <CircularProgress />
        </Stack>
      )}

      {/* Dialog for individual repo details */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{selectedRepo?.name}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            <strong>Description:</strong>{" "}
            {selectedRepo?.description || "No description available."}
          </Typography>
          <Typography variant="body1">
            <strong>Created At:</strong>{" "}
            {<DateFormat date={selectedRepo?.created_at} ago={false} />}
          </Typography>
          <Typography variant="body1">
            <strong>Updated At:</strong>{" "}
            {<DateFormat date={selectedRepo?.updated_at} ago={true} />}
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
      </Dialog>
    </Box>
  );
};

export default GitHubRepoList;
