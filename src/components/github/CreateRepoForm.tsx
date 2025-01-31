"use client";
import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { GitHubRepo } from "@/types/github";
interface CreateRepoFormProps {
  repoString: GitHubRepo;
  handleChange: () => void;
  handleSubmit: () => void;
  handleCloseDialog: () => void;
  action: string | null;
}
const CreateRepoForm: React.FC<CreateRepoFormProps> = ({
  repoString,
  handleChange,
  handleSubmit,
  handleCloseDialog,
  action,
}) => {
  return (
    <Box sx={{ maxWidth: 400, margin: "auto", padding: 4 }}>
      <Typography variant="h5">{action} Github Repo</Typography>
      <Box sx={{ my: 2 }}>
        <TextField
          label="Repository Name"
          variant="outlined"
          fullWidth
          name="name"
          value={repoString.name}
          onChange={handleChange}
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          name="desccription"
          value={repoString.description}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Website URL"
          variant="outlined"
          fullWidth
          name="website"
          value={repoString.website}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Topics (comma-separated)"
          variant="outlined"
          fullWidth
          name="topics"
          //value={repoString.topics?.split(",").map((topic:any) => topic.trim()) || []}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />{" "}
        *
        <FormControlLabel
          control={
            <Checkbox
              checked={repoString.private}
              onChange={handleChange}
              color="primary"
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
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            sx={{}}
          >
            {action} Repo
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default CreateRepoForm;
