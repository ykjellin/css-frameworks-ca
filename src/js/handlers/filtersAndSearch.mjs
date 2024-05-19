import { fetchAndFilterPosts, state } from "./fetchAndFilterPosts.mjs";

/**
 * Handles the change in filters (reactions and comments) and updates the displayed posts accordingly.
 * @function handleFilterChange
 * @param {HTMLElement} container - The container element to display posts in.
 * @param {HTMLTemplateElement} postTemplate - The template element for a post.
 * @param {HTMLSelectElement} reactionsFilter - The select element for reactions filter.
 * @param {HTMLSelectElement} commentsFilter - The select element for comments filter.
 * @returns {Function} A function to handle filter changes.
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
    container.innerHTML = "";
    fetchAndFilterPosts(
      container,
      postTemplate,
      reactionsFilter,
      commentsFilter
    );
  };
}

/**
 * Handles the search functionality and updates the displayed posts based on the search query.
 * @function handleSearch
 * @param {Event} event - The event triggered by the search form submission.
 * @param {HTMLElement} container - The container element to display posts in.
 * @param {HTMLTemplateElement} postTemplate - The template element for a post.
 * @param {HTMLSelectElement} reactionsFilter - The select element for reactions filter.
 * @param {HTMLSelectElement} commentsFilter - The select element for comments filter.
 */
export function handleSearch(
  event,
  container,
  postTemplate,
  reactionsFilter,
  commentsFilter
) {
  event.preventDefault();
  console.log("Search button clicked"); // Debugging line

  const searchInput = document.getElementById("searchInput"); // Assuming there's a search input with this ID
  if (searchInput) {
    const { value: searchQuery } = searchInput;
    console.log("Search Query Entered:", searchQuery.trim()); // Debugging line
    state.currentSearchQuery = searchQuery.trim();

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
