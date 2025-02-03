import { GitHubRepo } from "@/types/github";
import axios from "axios";
import { useState, useCallback, useEffect } from "react";

/**
 * Defines the possible action types for interacting with GitHub repositories.
 */
export interface ActionTypes {
  action: "ADD" | "UPDATE" | "VIEW" | "DELETE" | "GETALL"; // More specific types
}

/**
 * Custom hook for managing GitHub repository data and actions.
 *
 * @returns An object containing repository data, the current action, the selected repository,
 *          the open dialog state, and a function to update the action.
 */
export default function useGithubRepo() {
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | undefined>(
    undefined
  ); // Allow undefined initially
  const [action, setAction] = useState<ActionTypes | null>(null); // Allow null initially, more specific type
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [openDialog, setOpenDialog] = useState(false); // More specific type

  useEffect(() => {
    async function performRepoAction() {
      if (action) {
        // Only run if an action is set
        if (action.action === "GETALL") {
          try {
            const response = await axios.get("/api/cloud/github");
            setRepos(response.data);
            setOpenDialog(false);
          } catch (error) {
            console.error("Error fetching GitHub repos:", error);
            // Handle the error appropriately, e.g., display a message to the user
          }
        } else if (action.action === "UPDATE") {
          if (!selectedRepo) return; // Guard clause

          try {
            const response = await axios.post(
              "/api/cloud/github",
              selectedRepo
            );
            if (response.data) {
              // Optionally update the repos state with the updated repo
              setRepos((repos) =>
                repos.map((repo) =>
                  repo.id === selectedRepo.id ? response.data : repo
                )
              );
            }
          } catch (error) {
            console.error("Error updating GitHub repo:", error);
          }
        } else if (action.action === "VIEW") {
          if (!selectedRepo) return; // Guard clause
          setOpenDialog(true);
        } else if (action.action === "ADD") {
          try {
            const response = await fetch("/api/cloud/github", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(selectedRepo),
            });
            if (!response.ok) {
              const errorData = await response.json(); // Try to get error details from the API
              throw new Error(
                `Failed to add repo: ${response.status} - ${errorData?.message || response.statusText}`
              );
            }
            // Optionally update the repos state after adding a new repo
            const newRepo = await response.json();
            setRepos((prevRepos) => [...prevRepos, newRepo]);
          } catch (error) {
            console.error("Error adding GitHub repo:", error);
          }
        }
      }
    }
    performRepoAction();
  }, [action, selectedRepo]);

  /**
   * Updates the current action and opens the dialog.
   *
   * @param newAction The new action to perform.
   */
  const updateAction = useCallback((newAction: ActionTypes) => {
    setOpenDialog(true);
    setAction(newAction);
  }, []);

  return {
    repos,
    action,
    selectedRepo,
    openDialog,
    updateAction,
    setSelectedRepo, // Expose the setSelectedRepo function
    setOpenDialog, // Expose the setOpenDialog function
  };
}
