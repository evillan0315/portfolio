import { useState } from "react";
import { Box, TextField, FormControlLabel, Checkbox, Button, Typography } from "@mui/material";

const CreateRepoForm = () => {
  const [repoName, setRepoName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [topics, setTopics] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [message, setMessage] = useState("");

  const handleCreateRepo = async () => {
    const response = await fetch("/api/cloud/github", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        repoName,
        description,
        website,
        topics: topics.split(",").map((topic) => topic.trim()), // Convert topics to an array
        isPrivate,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage(`Repository "${repoName}" created successfully!`);
    } else {
      setMessage(`Error: ${data.error}`);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", padding: 4 }}>
    <Typography variant="h5" >Create Github Repo</Typography>
    <Box sx={{my: 2}}>
      <TextField
        label="Repository Name"
        variant="outlined"
        fullWidth
        value={repoName}
        onChange={(e) => setRepoName(e.target.value)}
        required
        sx={{ marginBottom: 2 }}
      />

      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      <TextField
        label="Website URL"
        variant="outlined"
        fullWidth
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      <TextField
        label="Topics (comma-separated)"
        variant="outlined"
        fullWidth
        value={topics}
        onChange={(e) => setTopics(e.target.value)}
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

      <Button variant="contained" color="primary" fullWidth onClick={handleCreateRepo} sx={{ marginBottom: 2 }}>
        Create Repository
      </Button>

      {message && (
        <Typography variant="body2" color={message.startsWith("Error") ? "error" : "success"}>
          {message}
        </Typography>
      )}
      </Box>
    </Box>
  );
};

export default CreateRepoForm;
