"use client";
import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import PrimarySearchAppBar from "@/components/PrimarySearchAppBar";
import GitHubRepoList from "@/components/github/GithubRepoList";
import PageTopBar from "@/components/PageTopBar";

import GithubDialogComponent from "@/components/github/DialogComponent";
import RefreshIcon from "@mui/icons-material/RefreshRounded";
import SettingIcon from "@mui/icons-material/SettingsApplicationsRounded";

const GithubRepoPage = () => {
  const [openCreateRepoDialog, setOpenCreateRepoDialog] = useState(false);
  const [sortBy, setSortBy] = useState<"name" | "date">("name");
  // Open the create repo dialog
  const handleOpenCreateRepoDialog = () => {
    setOpenCreateRepoDialog(true);
  };

  /* const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Check if form is not null before updating
    e.preventDefault();
    const { name, value } = e.target;
    if (repoString) {
      setRepoString({
        ...repoString,
        [name]: value,
      });
    }
  };
  const handleCreateRepo = async () => {
    setIsLoading(true);
    setMessage("Creating Repository...");
    const response = await fetch("/api/cloud/github", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(repoString),
    });
    const data = await response.json();

    if (data && response.ok) {
      setIsLoading(false);
      setNotify(true);
      setSeverity("success");
      setMessage(`Repository "${repoString?.name}" created successfully!`);
    } else {
      //  setNotify(true);
      //   setSeverity("success");
      //   setMessage(`Error: ${data.error}`);
    }
  }; */
  // Close the create repo dialog
  const handleCloseCreateRepoDialog = () => {
    setOpenCreateRepoDialog(false);
  };

  // Handle repository creation

  return (
    <Box sx={{ p: 4 }}>
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
            {
              icon: <RefreshIcon />,
              label: "Refresh",
              action: () => console.log("Refresh Clicked"),
            },
            {
              icon: <SettingIcon />,
              label: "Settings",
              action: () => console.log("Settings Clicked"),
            },
          ]}
        />
        <GitHubRepoList sortBy={sortBy} />
      </Container>

      {/* Create Repo Dialog */}
      <GithubDialogComponent
        selectedRepo={undefined}
        openDialog={openCreateRepoDialog}
        handleCloseDialog={handleCloseCreateRepoDialog}
        action={"Add"}
        sortBy={sortBy}
      />
    </Box>
  );
};

export default GithubRepoPage;
