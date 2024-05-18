import {
  fetchAndFilterPosts,
  currentReactions,
  currentComments,
  currentSearchQuery,
  currentOffset,
} from "./fetchAndFilterPosts.mjs";

export function handleFilterChange(container, reactionsFilter, commentsFilter) {
  return function () {
    currentReactions = reactionsFilter ? reactionsFilter.value : "";
    currentComments = commentsFilter ? commentsFilter.value : "";
    currentOffset = 0;
    container.innerHTML = "";
    fetchAndFilterPosts(container, reactionsFilter, commentsFilter);
  };
}

export function handleSearch(event, container, searchInput) {
  event.preventDefault();
  currentSearchQuery = searchInput.value.trim();
  currentOffset = 0;
  container.innerHTML = "";
  fetchAndFilterPosts(container, reactionsFilter, commentsFilter);
}
