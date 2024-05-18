import { getPosts } from "./get.mjs";
import { displayPosts } from "./display.mjs";
import { applyFilters } from "./filter.mjs";

function filterAndDisplayPosts(
  posts,
  container,
  postTemplate,
  currentOffset,
  PAGE_SIZE,
  loadMorePosts,
  currentReactions,
  currentComments
) {
  const filteredPosts = applyFilters(posts, currentReactions, currentComments);
  displayPosts(
    filteredPosts,
    container,
    postTemplate,
    currentOffset,
    PAGE_SIZE,
    loadMorePosts
  );
}

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
    filterAndDisplayPosts(
      posts,
      container,
      postTemplate,
      currentOffset,
      PAGE_SIZE,
      loadMorePosts,
      currentReactions,
      currentComments
    );
  } catch (error) {
    console.error("Error loading more posts:", error);
  }
}
