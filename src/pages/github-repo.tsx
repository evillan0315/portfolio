"use client";
import { useState } from "react";
import { Box, Container, Dialog } from "@mui/material";
import PrimarySearchAppBar from "@/components/PrimarySearchAppBar";
import GitHubRepoList from "@/components/github/GithubRepoList";
import PageTopBar from "@/components/PageTopBar";
import CreateRepoForm from "@/components/github/CreateRepoForm";
import LoadingComponent from "@/components/LoadingComponent";
import RefreshIcon from '@mui/icons-material/RefreshRounded';
import SettingIcon from '@mui/icons-material/SettingsApplicationsRounded';

const GithubRepoPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [openCreateRepoDialog, setOpenCreateRepoDialog] = useState(false);
  const [sortBy, setSortBy] = useState<"name" | "date">("name");

  // Open the create repo dialog
  const handleOpenCreateRepoDialog = () => {
    setOpenCreateRepoDialog(true);
  };

  // Close the create repo dialog
  const handleCloseCreateRepoDialog = () => {
    setOpenCreateRepoDialog(false);
  };

  // Handle repository creation
  const handleCreateRepo = async (repoData: { name: string; isPrivate: boolean }) => {
    setIsLoading(true);
    setLoadingMessage("Creating Repository...");
    
    try {
      const response = await fetch("/api/cloud/github", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(repoData),
      });

      if (!response.ok) throw new Error("Failed to create repository");

      // Simulate a small delay to enhance UX
      setTimeout(() => {
        setOpenCreateRepoDialog(false);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{p:4}}>
      {isLoading && <LoadingComponent message={loadingMessage} />}
      <Container>
        <PrimarySearchAppBar />
        <PageTopBar
          title="My Repositories"
          showAdd
          showSort
          showMenu
          onAddClick={handleOpenCreateRepoDialog}
          onSortClick={() => setSortBy(sortBy === "name" ? "date" : "name")}
          menuOptions={[
            { icon: <RefreshIcon />, label: "Refresh", action: () => console.log("Refresh Clicked") },
            { icon: <SettingIcon />, label: "Settings", action: () => console.log("Settings Clicked") },
          ]}
        />
        <GitHubRepoList sortBy={sortBy} />
      </Container>

      {/* Create Repo Dialog */}
      <Dialog open={openCreateRepoDialog} onClose={handleCloseCreateRepoDialog}>
        <CreateRepoForm onCreate={handleCreateRepo} />
      </Dialog>
    </Box>
  );
};

export default GithubRepoPage;

