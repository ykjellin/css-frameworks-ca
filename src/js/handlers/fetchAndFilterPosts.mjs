import { getPosts } from "../api/posts/get.mjs";
import { applyFilters } from "../api/posts/filter.mjs";
import { displayPosts } from "../api/posts/display.mjs";
import { loadMorePosts } from "../api/posts/load.mjs";

const PAGE_SIZE = 20;

export const state = {
  allPosts: [], // Store all posts here
  currentOffset: 0,
  currentReactions: "",
  currentComments: "",
  currentSearchQuery: "",
};

export async function fetchPosts() {
  try {
    const includeComments = true;
    const includeReactions = true;
    state.allPosts = await getPosts(includeComments, includeReactions);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}
/**
 * Fetch and filter posts based on the current state and update the container with the results.
 * @param {HTMLElement} container - The container element for displaying posts.
 * @param {HTMLElement} postTemplate - The template element for posts.
 * @param {HTMLSelectElement} [reactionsFilter] - The filter element for reactions.
 * @param {HTMLSelectElement} [commentsFilter] - The filter element for comments.
 * @returns {Promise<void>}
 */
export async function fetchAndFilterPosts(
  container,
  postTemplate,
  reactionsFilter,
  commentsFilter
) {
  try {
    if (!postTemplate || !postTemplate.content) {
      console.error("Post template is not defined or is invalid.");
      return;
    }
    let filteredPosts = applyFilters(
      state.allPosts,
      state.currentReactions,
      state.currentComments
    );

    if (state.currentSearchQuery) {
      const searchTerms = state.currentSearchQuery.toLowerCase().split(" ");
      filteredPosts = filteredPosts.filter((post) => {
        const postId = post.id ? post.id.toString().toLowerCase() : "";
        const postTitle = post.title ? post.title.toLowerCase() : "";
        const postBody = post.body ? post.body.toLowerCase() : "";

        return searchTerms.every(
          (term) =>
            postId.includes(term) ||
            postTitle.includes(term) ||
            postBody.includes(term)
        );
      });
    }

    // Clear the container before displaying new posts
    container.innerHTML = "";

    displayPosts(
      filteredPosts,
      container,
      postTemplate,
      state.currentOffset,
      PAGE_SIZE,
      loadMorePosts
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}
