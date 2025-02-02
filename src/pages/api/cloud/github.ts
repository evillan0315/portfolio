import { NextApiRequest, NextApiResponse } from "next";
import {
  createGitHubRepo,
  deleteGitHubRepo,
  updateGitHubRepo,
  fetchGitHubData,
} from "@/utils/github";

// Define the expected type for the request body
interface RepoRequestBody {
  name: string;
  description?: string;
  homepage?: string;
  topics?: string[];
  isPrivate: boolean;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  // Fetch all repositories (GET)
  if (method === "GET" && !req.query.name) {
    const repos = await fetchGitHubData(`/user/repos`);
    if (repos) {
      res.status(200).json(repos);
    } else {
      res.status(500).json({ error: "Failed to fetch GitHub repositories" });
    }
  }

  // Fetch individual repository (GET with name)
  else if (method === "GET" && req.query.name) {
    const { name } = req.query;
    const owner = process.env.NEXT_PUBLIC_GITHUB_USERNAME;

    try {
      const repoDetails = await fetchGitHubData(`/repos/${owner}/${name}`);
      if (repoDetails) {
        res.status(200).json(repoDetails);
      } else {
        res.status(404).json({ error: `Repository "${name}" not found` });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Failed to fetch individual GitHub repository" });
    }
  }

  // Create repository (POST)
  if (req.method === "POST") {
    const { name, description, homepage, isPrivate }: RepoRequestBody =
      req.body;

    const result = await createGitHubRepo(
      name,
      description,
      homepage,
      isPrivate
    );

    if (result) {
      res
        .status(200)
        .json({ message: "Repository created successfully!", data: result });
    } else {
      res.status(500).json({ error: "Failed to create GitHub repository" });
    }
  }

  // Update repository (PATCH)
  if (method === "PATCH") {
    const { owner, name, updateData } = req.body;

    const updatedRepo = await updateGitHubRepo(owner, name, updateData);

    if (updatedRepo) {
      res.status(200).json({
        message: "Repository updated successfully!",
        data: updatedRepo,
      });
    } else {
      res.status(500).json({ error: "Failed to update GitHub repository" });
    }
  }

  // Delete repository (DELETE)
  if (method === "DELETE") {
    const { owner, name } = req.body;

    const isDeleted = await deleteGitHubRepo(owner, name);
    if (isDeleted) {
      res
        .status(200)
        .json({ message: `Repository ${name} deleted successfully.` });
    } else {
      res.status(500).json({ error: "Failed to delete GitHub repository" });
    }
  }

  // Method Not Allowed
  else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
