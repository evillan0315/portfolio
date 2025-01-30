import { NextApiRequest, NextApiResponse } from "next";
import { createGitHubRepo, deleteGitHubRepo, updateGitHubRepo, fetchGitHubData } from "@/utils/github";

// Define the expected type for the request body
interface RepoRequestBody {
  repoName: string;
  isPrivate: boolean;  // Renamed to avoid conflict with the `private` keyword
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  // Fetch all repositories (GET)
  if (method === "GET" && !req.query.repoName) {
    const repos = await fetchGitHubData(`/users/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}/repos`);
    if (repos) {
      res.status(200).json(repos);
    } else {
      res.status(500).json({ error: "Failed to fetch GitHub repositories" });
    }
  }

  // Fetch individual repository (GET with repoName)
  else if (method === "GET" && req.query.repoName) {
    const { repoName } = req.query;
    const owner = process.env.NEXT_PUBLIC_GITHUB_USERNAME;

    try {
      const repoDetails = await fetchGitHubData(`/repos/${owner}/${repoName}`);
      if (repoDetails) {
        res.status(200).json(repoDetails);
      } else {
        res.status(404).json({ error: `Repository "${repoName}" not found` });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch individual GitHub repository" });
    }
  }

  // Create repository (POST)
  if (method === "POST") {
    const { repoName, isPrivate }: RepoRequestBody = req.body;

    const result = await createGitHubRepo(repoName, isPrivate);
    if (result) {
      res.status(200).json({ message: "Repository created successfully!", data: result });
    } else {
      res.status(500).json({ error: "Failed to create GitHub repository" });
    }
  }

  // Update repository (PATCH)
  if (method === "PATCH") {
    const { owner, repoName, updateData } = req.body;

    const updatedRepo = await updateGitHubRepo(owner, repoName, updateData);
    if (updatedRepo) {
      res.status(200).json({ message: "Repository updated successfully!", data: updatedRepo });
    } else {
      res.status(500).json({ error: "Failed to update GitHub repository" });
    }
  }

  // Delete repository (DELETE)
  if (method === "DELETE") {
    const { owner, repoName } = req.body;

    const isDeleted = await deleteGitHubRepo(owner, repoName);
    if (isDeleted) {
      res.status(200).json({ message: `Repository ${repoName} deleted successfully.` });
    } else {
      res.status(500).json({ error: "Failed to delete GitHub repository" });
    }
  }

  // Method Not Allowed
  else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

