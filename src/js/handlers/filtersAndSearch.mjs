import { fetchAndFilterPosts, state } from "./fetchAndFilterPosts.mjs";

/**
 * Handle changes in filter inputs and update the displayed posts accordingly.
 * @param {HTMLElement} container - The container element for posts.
 * @param {HTMLElement} postTemplate - The template element for posts.
 * @param {HTMLSelectElement} [reactionsFilter] - The filter element for reactions.
 * @param {HTMLSelectElement} [commentsFilter] - The filter element for comments.
 * @returns {Function} A function to handle the filter change event.
 */
export function handleFilterChange(
  container,
  postTemplate,
  reactionsFilter,
  commentsFilter
) {
  return function () {
    state.currentReactions = reactionsFilter ? reactionsFilter.value : "";
    state.currentComments = commentsFilter ? commentsFilter.value : "";
    state.currentOffset = 0;
    fetchAndFilterPosts(
      container,
      postTemplate,
      reactionsFilter,
      commentsFilter
    );
  };
}

/**
 * Handle the search form submission and update the displayed posts based on the search query.
 * @param {Event} event - The submit event object.
 * @param {HTMLInputElement} searchInput - The input element for the search query.
 */
export function handleSearch(
  event,
  searchInput,
  container,
  postTemplate,
  reactionsFilter,
  commentsFilter
) {
  event.preventDefault();
  console.log("Search button clicked"); // Debugging line
  if (searchInput) {
    const searchQuery = searchInput.value.trim();
    console.log("Search Query Entered:", searchQuery); // Debugging line
    state.currentSearchQuery = searchQuery;

    // Trigger the filter change event to apply the search filter
    fetchAndFilterPosts(
      container,
      postTemplate,
      reactionsFilter,
      commentsFilter
    );
  } else {
    console.error("Search input is not defined.");
  }
}
