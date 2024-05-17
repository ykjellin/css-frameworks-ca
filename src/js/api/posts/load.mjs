import { getPosts } from "./get.mjs";
import { displayPosts } from "./display.mjs";
import { applyFilters } from "./filter.mjs";

export async function loadMorePosts(
  PAGE_SIZE,
  currentOffset,
  container,
  postTemplate,
  currentReactions,
  currentComments
) {
  try {
    const includeReactions = currentReactions !== "";
    const includeComments = currentComments !== "";
    const posts = await getPosts(
      PAGE_SIZE,
      currentOffset,
      includeComments,
      includeReactions
    );
    const filteredPosts = applyFilters(
      posts,
      currentReactions,
      currentComments
    );
    displayPosts(
      filteredPosts,
      container,
      postTemplate,
      currentOffset,
      PAGE_SIZE,
      loadMorePosts
    );
  } catch (error) {
    console.error("Error loading more posts:", error);
  }
}
