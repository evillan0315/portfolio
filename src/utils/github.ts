"use server";
import axios from "axios";

const GITHUB_API_URL = process.env.GITHUB_API_URL;

/**
 * Fetches data from the GitHub API.
 *
 * @param endpoint The API endpoint to call (e.g., "/users/octocat").
 * @returns A promise that resolves to the data returned by the API, or null if an error occurs.
 * @throws {Error} If the GITHUB_TOKEN environment variable is missing.
 */
export const fetchGitHubData = async (
  endpoint: string
): Promise<any | null> => {
  try {
    const token = process.env.GITHUB_TOKEN;

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

/**
 * Creates a new GitHub repository for the authenticated user.
 *
 * @param name The name of the repository.
 * @param description (Optional) A description for the repository.
 * @param homepage (Optional) A URL for the repository's homepage.
 * @param isPrivate (Optional) Whether the repository should be private (default: false).
 * @returns A promise that resolves to the created repository data, or null if an error occurs.
 * @throws {Error} If the GITHUB_TOKEN environment variable is missing.
 */
export const createGitHubRepo = async (
  name: string,
  description?: string,
  homepage?: string,
  isPrivate: boolean = false
): Promise<any | null> => {
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      throw new Error("GitHub token is missing");
    }

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
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    return createResponse.data;
  } catch (error) {
    console.error("Error creating GitHub repository:", error);
    return null;
  }
};

/**
 * Updates an existing GitHub repository.
 *
 * @param owner The owner of the repository (username or organization name).
 * @param name The name of the repository.
 * @param updateData An object containing the data to update (e.g., name, description, private).
 * @returns A promise that resolves to the updated repository data, or null if an error occurs.
 * @throws {Error} If the GITHUB_TOKEN environment variable is missing.
 */
export const updateGitHubRepo = async (
  owner: string,
  name: string,
  updateData: { name?: string; description?: string; private?: boolean }
): Promise<any | null> => {
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      throw new Error("GitHub token is missing");
    }
    const response = await axios.patch(
      `${GITHUB_API_URL}/repos/${owner}/${name}`,
      updateData,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating GitHub repository:", error);
    return null;
  }
};

/**
 * Deletes a GitHub repository.
 *
 * @param owner The owner of the repository (username or organization name).
 * @param name The name of the repository.
 * @returns A promise that resolves to true if the repository was successfully deleted, or false if an error occurs.
 * @throws {Error} If the GITHUB_TOKEN environment variable is missing.
 */
export const deleteGitHubRepo = async (
  owner: string,
  name: string
): Promise<boolean> => {
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      throw new Error("GitHub token is missing");
    }
    const response = await axios.delete(
      `${GITHUB_API_URL}/repos/${owner}/${name}`,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );

    return response.status === 204;
  } catch (error) {
    console.error("Error deleting GitHub repository:", error);
    return false;
  }
};
