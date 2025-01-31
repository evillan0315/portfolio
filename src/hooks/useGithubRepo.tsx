import { GitHubRepo } from "@/types/github";
import axios from "axios";
import { useState, useCallback, useEffect } from "react";

export interface ActionTypes {
  action: string | "ADD" | "UPDATE" | "VIEW" | "DELETE" | "GETALL";
}
export default function useGithubRepo() {
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo>();
  const [action, setAction] = useState<ActionTypes | string>("");
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [openDialog, setOpenDialog] = useState<Boolean>(false);
  useEffect(() => {
    async function actionRepos() {
      if (action === "GETALL") {
        const response = await axios.get("/api/cloud/github");
        if (!selectedRepo) {
          return null;
        }
        setRepos(response.data);
        setOpenDialog(false);
      } else if (action === "UPDATE") {
        console.log(selectedRepo);
        if (!selectedRepo) {
          return null;
        }
        const response = await axios.post("/api/cloud/github", selectedRepo);
        //const sortedRepos = sortRepositories(response.data);
        if (response && response.data) {
          console.log(response.data, action);
          //setSelectedRepo(response.data);
        }
      } else if (action === "VIEW") {
        console.log(selectedRepo);
        setOpenDialog(true);
        //const sortedRepos = sortRepositories(response.data);
        setSelectedRepo(selectedRepo);
      } else if (action === "ADD") {
        console.log(selectedRepo);
        await fetch("/api/cloud/github", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedRepo),
        });
      }
    }
    actionRepos();
  }, [action, selectedRepo]);

  const updateAction = useCallback((action: ActionTypes) => {
    setOpenDialog(true);
    setAction(action);
  }, []);

  return {
    repos,
    action,
    selectedRepo,
    openDialog,
    updateAction,
  };
}
