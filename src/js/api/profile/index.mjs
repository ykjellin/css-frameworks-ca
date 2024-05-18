import { fetchAndFilterPosts } from "../../handlers/fetchAndFilterPosts.mjs";
import { setupEventListeners } from "../../handlers/setupEventListeners.mjs";
import { setupCreatePostModal } from "../posts/create.mjs";

document.addEventListener("DOMContentLoaded", () => {
  (async () => {
    const container = document.getElementById("postsContainer");
    const postTemplate = document.getElementById("postTemplate");

    // Log to check if postTemplate is defined
    console.log("Post template:", postTemplate);

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
