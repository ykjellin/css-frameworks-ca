import { API_SOCIAL } from "../../constants.mjs";
import { authFetch } from "../authFetch.mjs";

export const action = "/posts";

export async function getPosts(limit = 20, offset = 0) {
  const queryParams = `?limit=${limit}&offset=${offset}`;
  const url = `${API_SOCIAL}${action}${queryParams}`;

  try {
    const response = await authFetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const posts = await response.json();
    console.log("Posts fetched:", posts);
    return posts;
  } catch (error) {
    console.error("Failed to fetch posts:", error.message);
    throw error;
  }
}
