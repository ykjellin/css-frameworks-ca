import { getPosts } from "./get.mjs";
import { displayPosts } from "./display.mjs";
import { loadMorePosts } from "./load.mjs";
import { openPostModal } from "./postModal.mjs";
import { applyFilters } from "./filter.mjs";

const PAGE_SIZE = 20;
let currentOffset = 0;
let currentReactions = "";
let currentComments = "";

document.addEventListener("DOMContentLoaded", () => {
  (async () => {
    const container = document.getElementById("postsContainer");
    const postTemplate = document.getElementById("postTemplate");
    const reactionsFilter = document.getElementById("reactionsFilter");
    const commentsFilter = document.getElementById("commentsFilter");

    async function fetchPosts() {
      try {
        const includeReactions =
          reactionsFilter && reactionsFilter.value !== "";
        const includeComments = commentsFilter && commentsFilter.value !== "";
        const posts = await getPosts(
          PAGE_SIZE,
          currentOffset,
          includeComments,
          includeReactions
        );
        const filteredPosts = applyFilters(
          posts,
          currentReactions,
          currentComments
        );
        displayPosts(
          filteredPosts,
          container,
          postTemplate,
          currentOffset,
          PAGE_SIZE,
          loadMorePosts
        );
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    function handleFilterChange() {
      currentReactions = reactionsFilter ? reactionsFilter.value : "";
      currentComments = commentsFilter ? commentsFilter.value : "";
      currentOffset = 0;
      container.innerHTML = "";
      fetchPosts();
    }

    if (reactionsFilter) {
      reactionsFilter.addEventListener("change", handleFilterChange);
    }
    if (commentsFilter) {
      commentsFilter.addEventListener("change", handleFilterChange);
    }

    await fetchPosts();
  })();
});
