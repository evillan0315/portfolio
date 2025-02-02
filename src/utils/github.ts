"use server";
import axios from "axios";

const GITHUB_API_URL = process.env.GITHUB_API_URL;

export const fetchGitHubData = async (endpoint: string) => {
  try {
    const token = process.env.GITHUB_TOKEN; // Use server-side token

    if (!token) {
      throw new Error("GitHub token is missing");
    }

    const response = await axios.get(`${GITHUB_API_URL}${endpoint}`, {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data from GitHub:", error);
    return null;
  }
};

export const createGitHubRepo = async (
  name: string,
  description?: string,
  homepage?: string,
  isPrivate: boolean = false
) => {
  try {
    const createResponse = await axios.post(
      `${GITHUB_API_URL}/user/repos`,
      {
        name: name.trim().toLowerCase(),
        description: description?.trim().slice(0, 100) || "",
        homepage: homepage || "",
        private: isPrivate,
      },
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    return createResponse.data; // Return repository data
  } catch (error) {
    console.error("Error creating GitHub repository:", error);
    return null;
  }
};

// Update repository (e.g., name, description, visibility)
export const updateGitHubRepo = async (
  owner: string,
  name: string,
  updateData: { name?: string; description?: string; private?: boolean }
) => {
  try {
    const response = await axios.patch(
      `${GITHUB_API_URL}/repos/${owner}/${name}`,
      updateData,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    return response.data; // Return updated repository data
  } catch (error) {
    console.error("Error updating GitHub repository:", error);
    return null;
  }
};

// Delete repository by its owner and repo name
export const deleteGitHubRepo = async (owner: string, name: string) => {
  try {
    const response = await axios.delete(
      `${GITHUB_API_URL}/repos/${owner}/${name}`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    return response.status === 204; // GitHub returns 204 No Content on success
  } catch (error) {
    console.error("Error deleting GitHub repository:", error);
    return false;
  }
};
