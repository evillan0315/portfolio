"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import NotificationComponent from "../NotificationComponent";
import { AlertColor } from "@mui/material/Alert";
import LoadingComponent from "../LoadingComponent";
import { IconPlus } from "@tabler/icons-react";
import CloseIcon from "@mui/icons-material/CloseRounded";
import { GitHubRepo } from "@/types/github";

interface RepoFormProps {
  data?: GitHubRepo | null;
  action?: string;
  handleCloseDialog: () => void;
  sortBy?: string;
}
const RepoForm: React.FC<RepoFormProps> = ({
  data,
  action,
  handleCloseDialog,
  sortBy,
}) => {
  const defaultData: GitHubRepo = {
    name: "",
    description: "",
    homepage: "",
    isPrivate: false,
    created_at: "",
    updated_at: "",
  };

  const [formData, setFormData] = useState(!data ? defaultData : data);
  const [isLoading, setIsLoading] = useState(false);
  const [notify, setNotify] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [sortingBy, setSortingBy] = useState(sortBy);

  console.log(sortingBy);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Check if form is not null before updating
    e.preventDefault();
    const { name, value } = e.target;
    if (formData) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleUpdateRepo = async () => {
    setIsLoading(true);
    setMessage("Updating Repository...");
    const newData = {
      owner: formData?.owner.login as any,
      name: formData.name,
      updateData: {
        name: formData.name,
        description: formData.description,
        homepage: formData.homepage,
        private: formData.private,
      },
    };

    const response = await fetch(`/api/cloud/github`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });

    let data;
    try {
      data = await response.json(); // Attempt to parse JSON
    } catch (error) {
      console.error("Failed to parse JSON response:", error);
      data = null; // If parsing fails, set data to null
    }

    setIsLoading(false);

    if (response.ok && data) {
      setNotify(true);
      setSeverity("success");
      setMessage(`Repository "${formData?.name}" updated successfully!`);
      handleCloseDialog();
    } else {
      setNotify(true);
      setSeverity("error");
      setMessage(`Error: ${data?.error || "Unknown error"}`);
    }
  };

  const handleCreateRepo = async () => {
    setIsLoading(true);
    setMessage("Creating Repository...");
    const response = await fetch("/api/cloud/github", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    setIsLoading(false);
    if (data && response.ok) {
      setNotify(true);
      setSeverity("success");
      setMessage(`Repository "${formData?.name}" created successfully!`);
      setSortingBy("date");
      setFormData(defaultData);
      handleCloseDialog();
    } else {
      setNotify(true);
      setSeverity("error");
      setMessage(`Error: ${data.error}`);
    }
  };
  const notificationClose = () => {
    console.log("notification");
  };
  return (
    <Box sx={{ maxWidth: 400, margin: "auto", padding: 4 }}>
      <Typography variant="h5">{action} Github Repo</Typography>
      <Box sx={{ my: 2 }}>
        <TextField
          label="Repository Name"
          variant="outlined"
          fullWidth
          name="name"
          onChange={handleChange}
          value={formData.name}
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          name="description"
          value={formData.description}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Website URL"
          variant="outlined"
          fullWidth
          name="homepage"
          value={formData.homepage || ""}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.private}
              onChange={handleChange}
              color="primary"
              name="isPrivate"
            />
          }
          label="Private Repository"
          sx={{ marginBottom: 2 }}
        />
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleCloseDialog}
            sx={{}}
            endIcon={<CloseIcon />}
          >
            Close
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={action === "Update" ? handleUpdateRepo : handleCreateRepo}
            sx={{}}
            endIcon={<IconPlus />}
          >
            {action} Repo
          </Button>
        </Stack>
      </Box>
      {isLoading && <LoadingComponent message={message} />}
      <NotificationComponent
        message={message}
        openNotification={notify}
        severity={severity as AlertColor}
        handleClose={notificationClose}
      />
    </Box>
  );
};

export default RepoForm;
