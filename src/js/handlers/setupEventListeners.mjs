import { handleFilterChange, handleSearch } from "./filtersAndSearch.mjs";
import { handleViewPostClick } from "./modals.mjs";
import { handleUpdatePostClick } from "../api/posts/update.mjs";

export function setupEventListeners(
  container,
  postTemplate,
  reactionsFilter,
  commentsFilter,
  searchButton,
  searchInput,
  updatePostForm
) {
  if (reactionsFilter) {
    reactionsFilter.addEventListener(
      "change",
      handleFilterChange(
        container,
        postTemplate,
        reactionsFilter,
        commentsFilter
      )
    );
  }
  if (commentsFilter) {
    commentsFilter.addEventListener(
      "change",
      handleFilterChange(
        container,
        postTemplate,
        reactionsFilter,
        commentsFilter
      )
    );
  }

  if (searchButton && searchInput) {
    searchButton.addEventListener("click", (event) =>
      handleSearch(
        event,
        searchInput,
        container,
        postTemplate,
        reactionsFilter,
        commentsFilter
      )
    );
  }

  if (container) {
    container.addEventListener("click", handleViewPostClick);
  }

  container.addEventListener("click", handleViewPostClick);
  if (updatePostForm) {
    updatePostForm.addEventListener("submit", handleUpdatePostClick);
  }
}
