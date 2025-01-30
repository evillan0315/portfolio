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

export const createGitHubRepo = async (repoName: string, isPrivate: boolean = false) => {
  try {
    // Create the repository
    const createResponse = await axios.post(
      `${GITHUB_API_URL}/user/repos`,
      {
        name: repoName,
        private: isPrivate,  // Use isPrivate here
      },
      {
        headers: {
          Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
      }
    );

    // Repository created successfully, now fetch additional info
    const repoData = createResponse.data;

    // Fetch additional info about the repository (e.g., from the repository URL)
    const getRepoResponse = await axios.get(
      `${GITHUB_API_URL}/repos/${repoData.owner.login}/${repoData.name}`,
      {
        headers: {
          Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
      }
    );

    return getRepoResponse.data;  // Return detailed information about the repository

  } catch (error) {
    console.error("Error creating or fetching GitHub repository:", error);
    return null;
  }
};
