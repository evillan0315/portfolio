"use client";
import React, { useState } from "react";
import { AlertColor, Box, Container, Dialog } from "@mui/material";
import PrimarySearchAppBar from "@/components/PrimarySearchAppBar";
import GitHubRepoList from "@/components/github/GithubRepoList";
import PageTopBar from "@/components/PageTopBar";
import CreateRepoForm from "@/components/github/CreateRepoForm";
import LoadingComponent from "@/components/LoadingComponent";
import RefreshIcon from "@mui/icons-material/RefreshRounded";
import SettingIcon from "@mui/icons-material/SettingsApplicationsRounded";
import { GitHubRepo } from "@/types/github";
import NotificationComponent from "@/components/NotificationComponent";

const GithubRepoPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [notify, setNotify] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const [openCreateRepoDialog, setOpenCreateRepoDialog] = useState(false);
  const [sortBy, setSortBy] = useState<"name" | "date">("name");
  const [repoString, setRepoString] = useState<GitHubRepo>();
  // Open the create repo dialog
  const handleOpenCreateRepoDialog = () => {
    setOpenCreateRepoDialog(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;

    // Check if form is not null before updating
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
  };
  // Close the create repo dialog
  const handleCloseCreateRepoDialog = () => {
    setOpenCreateRepoDialog(false);
  };

  // Handle repository creation

  return (
    <Box sx={{ p: 4 }}>
      {isLoading && <LoadingComponent message={message} />}
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
      <Dialog open={openCreateRepoDialog} onClose={handleCloseCreateRepoDialog}>
        <CreateRepoForm
          repoString={repoString as GitHubRepo}
          handleChange={() => handleChange}
          handleSubmit={handleCreateRepo}
          handleCloseDialog={handleCloseCreateRepoDialog}
          action={"Add"}
        />
      </Dialog>
      <NotificationComponent
        message={message}
        openNotification={notify}
        severity={severity as AlertColor}
        handleClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </Box>
  );
};

export default GithubRepoPage;
