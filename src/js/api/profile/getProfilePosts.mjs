import { API_SOCIAL } from "../../constants.mjs";
import { authFetch } from "../authFetch.mjs";

/**
 * Fetches posts for a specific user profile.
 *
 * @param {string} userName - The username of the profile to fetch posts for.
 * @param {number} [limit=20] - The maximum number of posts to fetch.
 * @param {number} [offset=0] - The offset for pagination.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of posts.
 * @throws Will throw an error if the fetch operation fails.
 */
export async function getProfilePosts(userName, limit = 20, offset = 0) {
  const url = `${API_SOCIAL}/profiles/${userName}/posts?limit=${limit}&offset=${offset}`;

  try {
    const response = await authFetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error("Failed to fetch profile posts:", error.message);
    throw error;
  }
}
