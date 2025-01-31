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
interface CreateRepoFormProps {
  handleCloseDialog: () => void;
  action: string | null;
}
const CreateRepoForm: React.FC<CreateRepoFormProps> = ({
  handleCloseDialog,
  action,
}) => {
  const [formData, setFormData] = useState({
    repoName: "",
    description: "",
    homepage: "",
    isPrivate: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [notify, setNotify] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
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
      setMessage(`Repository "${formData?.repoName}" created successfully!`);
      setFormData({
        repoName: "",
        description: "",
        homepage: "",
        isPrivate: false,
      });
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
  /*   const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    // Check if form is not null before updating

    setFormData({
      ...formData,
      [name]: value,
    });
    //handleChange(formData as GitHubRepo);
  }; */
  return (
    <Box sx={{ maxWidth: 400, margin: "auto", padding: 4 }}>
      <Typography variant="h5">{action} Github Repo</Typography>
      <Box sx={{ my: 2 }}>
        <TextField
          label="Repository Name"
          variant="outlined"
          fullWidth
          name="repoName"
          onChange={handleChange}
          value={formData.repoName}
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
          value={formData.homepage}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.isPrivate}
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
            onClick={handleCreateRepo}
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

export default CreateRepoForm;
