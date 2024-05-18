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
  searchInput,
  reactionsFilter,
  commentsFilter
) {
  event.preventDefault();
  state.currentSearchQuery = searchInput.value.trim();
  state.currentOffset = 0;
  container.innerHTML = "";
  fetchAndFilterPosts(container, postTemplate, reactionsFilter, commentsFilter);
}
