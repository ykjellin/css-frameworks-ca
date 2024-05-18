import { handleFilterChange, handleSearch } from "./filtersAndSearch.mjs";
import { handleViewPostClick } from "./modals.mjs";
import { handleUpdatePostClick } from "../api/posts/update.mjs";

export function setupEventListeners(
  container,
  reactionsFilter,
  commentsFilter,
  searchForm,
  searchInput,
  updatePostForm
) {
  if (reactionsFilter) {
    reactionsFilter.addEventListener(
      "change",
      handleFilterChange(container, reactionsFilter, commentsFilter)
    );
  }
  if (commentsFilter) {
    commentsFilter.addEventListener(
      "change",
      handleFilterChange(container, reactionsFilter, commentsFilter)
    );
  }

  searchForm.addEventListener("submit", (event) =>
    handleSearch(event, container, searchInput)
  );
  container.addEventListener("click", handleViewPostClick);
  updatePostForm.addEventListener("submit", handleUpdatePostClick);
}
