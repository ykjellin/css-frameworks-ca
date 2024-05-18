import { handleFilterChange, handleSearch } from "./filtersAndSearch.mjs";
import { handleViewPostClick } from "./modals.mjs";
import { handleUpdatePostClick } from "../api/posts/update.mjs";

export function setupEventListeners(
  container,
  postTemplate,
  reactionsFilter,
  commentsFilter,
  searchForm,
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

  searchForm.addEventListener("submit", (event) =>
    handleSearch(
      event,
      container,
      postTemplate,
      searchInput,
      reactionsFilter,
      commentsFilter
    )
  );
  container.addEventListener("click", handleViewPostClick);
  if (updatePostForm) {
    updatePostForm.addEventListener("submit", handleUpdatePostClick);
  }
}
