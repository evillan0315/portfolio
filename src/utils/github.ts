import axios from "axios";

const GITHUB_API_URL = "https://api.github.com";

export const fetchGitHubData = async (endpoint: string) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}${endpoint}`, {
      headers: {
        Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data from GitHub:", error);
    return null;
  }
};

export const createGitHubRepo = async (
  repoName: string,
  description?: string,
  homepage?: string,
  isPrivate: boolean = false
) => {
  try {
    const createResponse = await axios.post(
      `${GITHUB_API_URL}/user/repos`,
      {
        name: repoName,
        description: description || "",
        homepage: homepage || "",
        private: isPrivate,
      },
      {
        headers: {
          Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
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
  repoName: string,
  updateData: { name?: string; description?: string; private?: boolean }
) => {
  try {
    const response = await axios.patch(
      `${GITHUB_API_URL}/repos/${owner}/${repoName}`,
      updateData,
      {
        headers: {
          Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
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
export const deleteGitHubRepo = async (owner: string, repoName: string) => {
  try {
    const response = await axios.delete(
      `${GITHUB_API_URL}/repos/${owner}/${repoName}`,
      {
        headers: {
          Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
      }
    );

    return response.status === 204; // GitHub returns 204 No Content on success
  } catch (error) {
    console.error("Error deleting GitHub repository:", error);
    return false;
  }
};
