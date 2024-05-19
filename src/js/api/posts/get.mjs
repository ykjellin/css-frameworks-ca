import { API_SOCIAL } from "../../constants.mjs";
import { authFetch } from "../authFetch.mjs";

export const action = "/posts";

/**
 * Builds the URL for fetching posts.
 * @returns {string} The URL for fetching posts.
 */
function buildUrl() {
  return `${API_SOCIAL}/posts`;
}

/**
 * Fetches data from the given URL using an authenticated fetch request.
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<Object>} A promise that resolves to the fetched data.
 * @throws Will throw an error if the fetch operation fails.
 */
async function fetchData(url) {
  try {
    const response = await authFetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch data:", error.message);
    throw error;
  }
}

/**
 * Fetches all posts.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of posts.
 * @throws Will throw an error if the fetch operation fails.
 */
export async function getPosts() {
  const url = buildUrl();
  return fetchData(url);
}

/**
 * Fetches a post by its ID.
 * @param {string} postId - The ID of the post to fetch.
 * @returns {Promise<Object>} A promise that resolves to the fetched post.
 * @throws Will throw an error if the fetch operation fails.
 */
export async function getPostById(postId) {
  const url = `${API_SOCIAL}/posts/${postId}`;
  return fetchData(url);
}
