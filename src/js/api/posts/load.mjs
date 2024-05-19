import { getPosts } from "./get.mjs";
import { displayPosts } from "./display.mjs";
import { applyFilters } from "./filter.mjs";

/**
 * Filters posts based on reactions and comments, and displays them in the specified container.
 *
 * @param {Object[]} posts - The array of post data to filter and display.
 * @param {HTMLElement} container - The container element for displaying posts.
 * @param {HTMLTemplateElement} postTemplate - The template element for posts.
 * @param {number} currentOffset - The current offset for pagination.
 * @param {number} PAGE_SIZE - The number of posts to load per page.
 * @param {Function} loadMorePosts - The function to call to load more posts.
 * @param {string} currentReactions - The current filter value for reactions.
 * @param {string} currentComments - The current filter value for comments.
 */
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

/**
 * Loads more posts, applies filters, and displays them in the specified container.
 *
 * @param {number} PAGE_SIZE - The number of posts to load per page.
 * @param {number} currentOffset - The current offset for pagination.
 * @param {HTMLElement} container - The container element for displaying posts.
 * @param {HTMLTemplateElement} postTemplate - The template element for posts.
 * @param {string} currentReactions - The current filter value for reactions.
 * @param {string} currentComments - The current filter value for comments.
 * @returns {Promise<void>} A promise that resolves when the posts are loaded and displayed.
 */
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
    const { length: numPosts } = posts;
    const [firstPost] = posts;

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
