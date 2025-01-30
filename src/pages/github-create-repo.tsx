'use client'
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import GitHubRepoList from "@/components/GitHubRepoList";

const CreateRepoPage = () => {
  const [repoName, setRepoName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [message, setMessage] = useState("");

  const handleCreateRepo = async () => {
    const response = await fetch("/api/cloud/github", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ repoName, isPrivate: isPrivate }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage(`Repository "${repoName}" created successfully!`);
    } else {
      setMessage(`Error: ${data.error}`);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", padding: 2 }}>
    <GitHubRepoList />
      <Typography variant="h4" gutterBottom>Create GitHub Repository</Typography>
      
      <TextField
        label="Repository Name"
        variant="outlined"
        fullWidth
        value={repoName}
        onChange={(e) => setRepoName(e.target.value)}
        required
        sx={{ marginBottom: 2 }}
      />
      
      <FormControlLabel
        control={
          <Checkbox
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
            color="primary"
          />
        }
        label="Private Repository"
        sx={{ marginBottom: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleCreateRepo}
        sx={{ marginBottom: 2 }}
      >
        Create Repository
      </Button>

      {message && (
        <Typography variant="body2" color={message.startsWith("Error") ? "error" : "success"}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default CreateRepoPage;

