import { handleFilterChange, handleSearch } from "./filtersAndSearch.mjs";
import { handleViewPostClick } from "./modals.mjs";
import { handleUpdatePostClick } from "../api/posts/update.mjs";

/**
 * Sets up event listeners for various elements.
 * @param {HTMLElement} container - The container element for the posts.
 * @param {HTMLTemplateElement} postTemplate - The template element for the posts.
 * @param {HTMLElement} reactionsFilter - The filter element for reactions.
 * @param {HTMLElement} commentsFilter - The filter element for comments.
 * @param {HTMLElement} searchButton - The search button element.
 * @param {HTMLElement} searchInput - The search input element.
 * @param {HTMLElement} updatePostForm - The form element for updating a post.
 */
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
    searchButton.addEventListener("click", (event) => {
      const { target } = event;
      handleSearch(
        target,
        searchInput,
        container,
        postTemplate,
        reactionsFilter,
        commentsFilter
      );
    });
  }

  if (container) {
    container.addEventListener("click", handleViewPostClick);
  }

  container.addEventListener("click", handleViewPostClick);

  if (updatePostForm) {
    updatePostForm.addEventListener("submit", handleUpdatePostClick);
  }
}
