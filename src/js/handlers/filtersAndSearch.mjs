import { fetchAndFilterPosts, state } from "./fetchAndFilterPosts.mjs";

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

export function handleSearch(
  event,
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
