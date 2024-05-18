import { API_SOCIAL } from "../../constants.mjs";
import { authFetch } from "../authFetch.mjs";

export async function getProfilePosts(userName, limit = 20, offset = 0) {
  const url = `${API_SOCIAL}/profiles/${userName}/posts?limit=${limit}&offset=${offset}`;

  try {
    const response = await authFetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const posts = await response.json();
    console.log("Fetched posts:", posts); // Debugging line
    return posts;
  } catch (error) {
    console.error("Failed to fetch profile posts:", error.message);
    throw error;
  }
}
