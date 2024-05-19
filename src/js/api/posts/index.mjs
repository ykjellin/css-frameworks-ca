import {
  fetchPosts,
  fetchAndFilterPosts,
  state,
} from "../../handlers/fetchAndFilterPosts.mjs";
import { setupEventListeners } from "../../handlers/setupEventListeners.mjs";
import { setupCreatePostModal } from "../posts/create.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("postsContainer");
  const postTemplate = document.getElementById("postTemplate");

  if (!postTemplate) {
    console.error("Post template not found in the DOM.");
    return;
  }

  const reactionsFilter = document.getElementById("reactionsFilter");
  const commentsFilter = document.getElementById("commentsFilter");
  const searchButton = document.getElementById("searchButton");
  const searchInput = document.getElementById("searchInput");

  setupEventListeners(
    container,
    postTemplate,
    reactionsFilter,
    commentsFilter,
    searchButton,
    searchInput
  );

  await fetchPosts();
  await fetchAndFilterPosts(
    container,
    postTemplate,
    reactionsFilter,
    commentsFilter
  );

  setupCreatePostModal();

  const closeButton = document.querySelector(".button-close");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      location.reload();
    });
  }

  searchButton.addEventListener("click", async () => {
    state.currentSearchQuery = searchInput.value;
    state.currentOffset = 0; // Reset the offset to start from the beginning
    container.innerHTML = ""; // Clear the existing posts in the container
    await fetchAndFilterPosts(
      container,
      postTemplate,
      reactionsFilter,
      commentsFilter
    );
  });
});

window.addEventListener("scroll", () => {
  const footer = document.querySelector("footer");
  if (footer) {
    footer.style.opacity = window.scrollY > 0 ? 1 : 0;
  }
});
