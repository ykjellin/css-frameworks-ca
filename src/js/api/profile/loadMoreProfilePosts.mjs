import { getProfilePosts } from "./getProfilePosts.mjs";
import { displayProfilePosts } from "./displayProfilePosts.mjs";

export async function loadMoreProfilePosts(
  PAGE_SIZE,
  currentOffset,
  container,
  postTemplate,
  userName
) {
  try {
    const posts = await getProfilePosts(userName, PAGE_SIZE, currentOffset);
    displayProfilePosts(
      posts,
      container,
      postTemplate,
      currentOffset,
      PAGE_SIZE,
      loadMoreProfilePosts,
      userName
    );
  } catch (error) {
    console.error("Error loading more profile posts:", error);
  }
}
