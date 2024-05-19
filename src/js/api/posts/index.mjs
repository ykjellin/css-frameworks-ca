import { fetchAndFilterPosts } from "../../handlers/fetchAndFilterPosts.mjs";
import { setupEventListeners } from "../../handlers/setupEventListeners.mjs";
import { setupCreatePostModal } from "../posts/create.mjs";
import { router } from "../../router.mjs";

/**
 * Initializes event listeners and fetches posts when the DOM content is fully loaded.
 * Also sets up the router for popstate events.
 */
document.addEventListener("DOMContentLoaded", router);
window.addEventListener("popstate", router);

/**
 * Sets up event listeners, fetches and filters posts, and initializes the create post modal.
 */
document.addEventListener("DOMContentLoaded", () => {
  (async () => {
    const container = document.getElementById("postsContainer");
    const postTemplate = document.getElementById("postTemplate");

    if (!postTemplate) {
      console.error("Post template not found in the DOM.");
      return;
    }

    const reactionsFilter = document.getElementById("reactionsFilter");
    const commentsFilter = document.getElementById("commentsFilter");
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");
    const updatePostForm = document.getElementById("updatePostForm");

    setupEventListeners(
      container,
      postTemplate,
      reactionsFilter,
      commentsFilter,
      searchForm,
      searchInput,
      updatePostForm
    );

    await fetchAndFilterPosts(
      container,
      postTemplate,
      reactionsFilter,
      commentsFilter
    );

    setupCreatePostModal();
  })();

  const closeButton = document.querySelector(".button-close");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      location.reload();
    });
  }
});

/**
 * Adjusts footer opacity based on scroll position.
 */
window.addEventListener("scroll", function () {
  const footer = document.querySelector("footer");
  if (window.scrollY > 0) {
    footer.style.opacity = 1;
  } else {
    footer.style.opacity = 0;
  }
});
