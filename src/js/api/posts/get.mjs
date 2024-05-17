import { API_SOCIAL } from "../../constants.mjs";
import { authFetch } from "../authFetch.mjs";

export const action = "/posts";

export async function getPosts(
  limit,
  offset,
  includeComments,
  includeReactions
) {
  let url = `${API_SOCIAL}/posts?limit=${limit}&offset=${offset}`;
  if (includeComments) {
    url += `&_comments=true`;
  }
  if (includeReactions) {
    url += `&_reactions=true`;
  }

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
