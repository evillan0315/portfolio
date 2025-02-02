import React, { useState, useEffect, useCallback } from "react";

// MUI components
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

import { useSession } from "next-auth/react";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

// Icons

import axios from "axios";
import GithubDialogComponent from "./DialogComponent";
import { GitHubRepo } from "@/types/github";
import DateFormat from "../DateFormat";
//import { CardActionArea } from "@mui/material";
import LoadingComponent from "../LoadingComponent";
import { IconButton, Tooltip } from "@mui/material";
import { MdVisibility } from "react-icons/md";
import { IconEdit, IconTrash } from "@tabler/icons-react";
// Type for a GitHub repo

interface GitHubRepoListProps {
  sortBy?: "name" | "date"; // Sorting criteria
  openDial?: boolean;
}

const GitHubRepoList: React.FC<GitHubRepoListProps> = ({ sortBy }) => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [action, setAction] = useState("");
  const { data: session } = useSession();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const reposPerPage = 6;
  if (!sortBy) sortBy = "date";
  const fetchRepos = useCallback(async () => {
    setIsLoading(true);
    setMessage("Loading Github repo...");
    try {
      const response = await axios.get("/api/cloud/github");
      const sortedRepos = sortRepositories(response.data, sortBy);
      setRepos(sortedRepos);
      setMessage("Repo has been loaded");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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
    setAction("");
  };

  // Handle repo deletion
  const handleDeleteRepo = async (repo: GitHubRepo) => {
    setAction("Delete");
    setSelectedRepo(repo);
    setOpenDialog(true);
  };

  // Handle repo update (stub function)
  const handleUpdateRepo = (repo: GitHubRepo) => {
    console.log("Update repo:", repo);
    // You can add functionality to open an edit dialog here.
    setAction("Update");
    setSelectedRepo(repo);
    setOpenDialog(true);
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

  const splitE = session ? session?.user.email.split("@") : [];
  //if (!selectedRepo) return null; // Handle null case
  return (
    <Container>
      {isLoading && <LoadingComponent message={message} />}

      <Grid container spacing={1}>
        {currentRepos.map((repo) => (
          <Grid key={repo.id} size={{ md: 4, sm: 6, xs: 12 }}>
            <Card sx={{ p: 0 }} className="h-[100%]">
              <CardContent sx={{ p: 2 }}>
                <Typography
                  variant="h6"
                  className="line-clamp-1"
                  sx={{ fontSize: "1rem", fontWeight: 200 }}
                >
                  <Link href={repo?.html_url} target="_blank">
                    {repo.name}
                  </Link>
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 200, mb: 2 }}>
                  {repo?.full_name}
                </Typography>
                <Box className="h-10">
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className="line-clamp-1"
                    sx={{ fontSize: ".7rem", fontWeight: 200 }}
                  >
                    {repo.description || "No description available."}
                  </Typography>

                  <Typography
                    variant="caption"
                    display="block"
                    color="textSecondary"
                    sx={{ fontSize: ".7rem", fontWeight: 200 }}
                  >
                    Last Updated:{" "}
                    <DateFormat date={repo?.updated_at} ago={true} />
                  </Typography>
                </Box>

                {/* Icon Buttons */}
                {session && (
                  <>
                    {splitE[0] === repo?.owner.login && (
                      <Box
                        display="flex"
                        justifyContent="flex-end"
                        gap={1}
                        mt={1}
                      >
                        <Tooltip title="View Details">
                          <IconButton
                            color="primary"
                            size="small"
                            onClick={() => handleRepoClick(repo)}
                          >
                            <MdVisibility />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Update Repository">
                          <IconButton
                            color="info"
                            size="small"
                            onClick={() => handleUpdateRepo(repo)}
                          >
                            <IconEdit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Repository">
                          <IconButton
                            color="error"
                            size="small"
                            onClick={() => handleDeleteRepo(repo)}
                          >
                            <IconTrash />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    )}
                  </>
                )}
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
        action={action || undefined}
        sortBy={sortBy}
      />
    </Container>
  );
};

export default GitHubRepoList;
