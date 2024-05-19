import { getPosts } from "../api/posts/get.mjs";
import { applyFilters } from "../api/posts/filter.mjs";
import { displayPosts } from "../api/posts/display.mjs";
import { loadMorePosts } from "../api/posts/load.mjs";

const PAGE_SIZE = 20;

/**
 * @typedef {Object} State
 * @property {Array} allPosts - Store all posts here
 * @property {number} currentOffset - The current offset for pagination
 * @property {string} currentReactions - The current reactions filter
 * @property {string} currentComments - The current comments filter
 * @property {string} currentSearchQuery - The current search query
 */

/**
 * @type {State}
 */

export const state = {
  allPosts: [], // Store all posts here
  currentOffset: 0,
  currentReactions: "",
  currentComments: "",
  currentSearchQuery: "",
};

/**
 * Fetches posts from the API and updates the state.
 * @async
 * @function fetchPosts
 */
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
 * Fetches, filters, and displays posts based on the current state and filters.
 * @async
 * @function fetchAndFilterPosts
 * @param {HTMLElement} container - The container element to display posts in.
 * @param {HTMLTemplateElement} postTemplate - The template element for a post.
 * @param {HTMLSelectElement} reactionsFilter - The select element for reactions filter.
 * @param {HTMLSelectElement} commentsFilter - The select element for comments filter.
 */
export async function fetchAndFilterPosts(
  container,
  postTemplate,
  reactionsFilter,
  commentsFilter
) {
  if (!postTemplate || !(postTemplate instanceof HTMLTemplateElement)) {
    console.error("Post template is not defined or is invalid.");
    return;
  }

  try {
    const includeReactions = reactionsFilter && reactionsFilter.value !== "";
    const includeComments = commentsFilter && commentsFilter.value !== "";
    const posts = await getPosts(
      PAGE_SIZE,
      state.currentOffset,
      includeComments,
      includeReactions
    );

    if (!Array.isArray(posts)) {
      throw new Error("The fetched posts are not in an array format.");
    }

    let filteredPosts = applyFilters(
      state.allPosts,
      state.currentReactions,
      state.currentComments
    );

    if (state.currentSearchQuery) {
      const searchTerms = state.currentSearchQuery.toLowerCase().split(" ");
      filteredPosts = filteredPosts.filter((post) => {
        const { id = "", title = "", body = "" } = post;
        const postId = id.toString().toLowerCase();
        const postTitle = title.toLowerCase();
        const postBody = body.toLowerCase();

        const postIdMatch = postId.includes(
          state.currentSearchQuery.toLowerCase()
        );
        const postTitleMatch = postTitle.includes(
          state.currentSearchQuery.toLowerCase()
        );
        const postBodyMatch = postBody.includes(
          state.currentSearchQuery.toLowerCase()
        );
        const postTermMatch = searchTerms.every(
          (term) => postTitle.includes(term) || postBody.includes(term)
        );
        return postIdMatch || postTitleMatch || postBodyMatch || postTermMatch;
      });
    }

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
