import { API_SOCIAL } from "../../constants.mjs";
import { authFetch } from "../authFetch.mjs";

export const action = "/posts";

function buildUrl(limit, offset, includeComments, includeReactions) {
  console.log(
    `Building URL with limit=${limit}, offset=${offset}, includeComments=${includeComments}, includeReactions=${includeReactions}`
  );
  let url = `${API_SOCIAL}/posts?limit=${limit}&offset=${offset}`;
  if (includeComments) {
    url += `&_comments=true`;
  }
  if (includeReactions) {
    url += `&_reactions=true`;
  }
  return url;
}

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

export async function getPosts(
  limit,
  offset,
  includeComments,
  includeReactions
) {
  const url = buildUrl(limit, offset, includeComments, includeReactions);
  console.log("Fetching posts from:", url);
  return fetchData(url);
}

export async function getPostById(postId) {
  const url = `${API_SOCIAL}/posts/${postId}`;
  console.log("Fetching post by ID from:", url);
  return fetchData(url);
}
