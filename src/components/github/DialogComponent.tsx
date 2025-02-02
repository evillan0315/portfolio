"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/CloseRounded";
import { GitHubRepo } from "@/types/github";
import DateFormat from "../DateFormat";
import RepoForm from "./RepoForm";
import Link from "@mui/material/Link";
import { IconTrash } from "@tabler/icons-react";
import { IconBrandGithub } from "@tabler/icons-react";

interface GithubDialogComponentProps {
  selectedRepo?: GitHubRepo | null;
  openDialog: boolean;
  handleCloseDialog: () => void;
  action?: string;
  sortBy?: string;
}

const GithubDialogComponent: React.FC<GithubDialogComponentProps> = ({
  selectedRepo,
  openDialog,
  handleCloseDialog,
  action,
  sortBy,
}) => {
  //if (!selectedRepo) return null;
  // Content component that directly returns JSX elements
  const Content = () => {
    if (action === "Delete")
      return (
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
            endIcon={<IconTrash />}
            onClick={() => window.open(selectedRepo?.html_url, "_blank")}
            color="primary"
          >
            Delete
          </Button>
        </Stack>
      );
    if (action === "Update" || action === "Add")
      return (
        <RepoForm
          data={selectedRepo}
          action={action}
          handleCloseDialog={handleCloseDialog}
          sortBy={sortBy}
        />
      );
    return (
      <>
        <DialogTitle>{selectedRepo?.name}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            <strong>Description:</strong>{" "}
            {selectedRepo?.description || "No description available."}
          </Typography>

          <Typography variant="body1">
            <strong>Updated At:</strong>{" "}
            <DateFormat date={selectedRepo?.updated_at} ago={true} />
          </Typography>
          <Typography variant="body1">
            <strong>Created At :</strong>{" "}
            <DateFormat date={selectedRepo?.created_at} ago={false} />
          </Typography>
          <Typography variant="body1">
            <strong>Private:</strong> {selectedRepo?.private ? "Yes" : "No"}
          </Typography>
          <Typography variant="body1">
            <Link
              href={selectedRepo?.homepage}
              target="_blank"
              rel="noopener noreferrer"
            >
              {selectedRepo?.homepage}
            </Link>
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
              endIcon={<IconBrandGithub />}
              onClick={() => window.open(selectedRepo?.html_url, "_blank")}
              color="primary"
            >
              Open in GitHub
            </Button>
          </Stack>
        </DialogActions>
      </>
    );
  };
  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <Content />
    </Dialog>
  );
};
export default GithubDialogComponent;
