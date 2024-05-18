import { getPosts, getPostById } from "./get.mjs";
import { displayPosts } from "./display.mjs";
import { loadMorePosts } from "./load.mjs";
import { openModal, openUpdateModal } from "./postModal.mjs";
import { applyFilters } from "./filter.mjs";
import { setupCreatePostModal } from "./create.mjs";
import { handleUpdatePostClick } from "./update.mjs";

const PAGE_SIZE = 20;
let currentOffset = 0;
let currentReactions = "";
let currentComments = "";
let currentSearchQuery = "";

document.addEventListener("DOMContentLoaded", () => {
  (async () => {
    const container = document.getElementById("postsContainer");
    const postTemplate = document.getElementById("postTemplate");
    const reactionsFilter = document.getElementById("reactionsFilter");
    const commentsFilter = document.getElementById("commentsFilter");
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");
    const postModal = document.getElementById("postModal");
    const updatePostButton = document.getElementById("updatePostButton");
    const updatePostForm = document.getElementById("updatePostForm");

    postModal.addEventListener("hidden.bs.modal", () => {
      if (!document.querySelector("#updatePostModal.show")) {
        document.body.classList.remove("modal-open");
        document.getElementById("updatePostForm").style.display = "none"; // Ensure form is hidden when modal is closed
        document.getElementById("postModalBody").style.display = "block";
        document.getElementById("postModalImage").style.display = "block";
        updatePostButton.style.display = "inline-block";
      }
    });

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
        let filteredPosts = applyFilters(
          posts,
          currentReactions,
          currentComments
        );

        if (currentSearchQuery) {
          const searchTerms = currentSearchQuery.toLowerCase().split(" ");
          filteredPosts = filteredPosts.filter((post) => {
            const postIdMatch = post.id
              .toString()
              .toLowerCase()
              .includes(currentSearchQuery.toLowerCase());
            const postTitleMatch = post.title
              .toLowerCase()
              .includes(currentSearchQuery.toLowerCase());
            const postBodyMatch = post.body
              .toLowerCase()
              .includes(currentSearchQuery.toLowerCase());
            const postTermMatch = searchTerms.every(
              (term) =>
                post.title.toLowerCase().includes(term) ||
                post.body.toLowerCase().includes(term)
            );
            return (
              postIdMatch || postTitleMatch || postBodyMatch || postTermMatch
            );
          });
        }

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

    function handleSearch(event) {
      event.preventDefault();
      currentSearchQuery = searchInput.value.trim();
      currentOffset = 0;
      container.innerHTML = "";
      fetchPosts();
    }

    async function handleViewPostClick(event) {
      const target = event.target;

      if (target.closest(".read-more-btn")) {
        const postId = target
          .closest(".post-card")
          .getAttribute("data-post-id");
        if (postId) {
          try {
            const post = await getPostById(postId);
            openModal(post);
          } catch (error) {
            console.error("Error fetching post details:", error);
          }
        }
      } else if (target.closest(".update-open-btn")) {
        const postId = target
          .closest(".post-card")
          .getAttribute("data-post-id");
        if (postId) {
          try {
            const post = await getPostById(postId);
            const postModal = document.getElementById("postModal");
            const modal = bootstrap.Modal.getInstance(postModal);
            modal.hide();
            openUpdateModal(post);
          } catch (error) {
            console.error("Error fetching post details:", error);
          }
        }
      }
    }

    async function handleUpdateButtonClick(event) {
      const postId = event.target.getAttribute("data-post-id");
      if (postId) {
        try {
          const post = await getPostById(postId);
          openModal(post, true);
        } catch (error) {
          console.error("Error fetching post details:", error);
        }
      }
    }

    if (reactionsFilter) {
      reactionsFilter.addEventListener("change", handleFilterChange);
    }
    if (commentsFilter) {
      commentsFilter.addEventListener("change", handleFilterChange);
    }

    searchForm.addEventListener("submit", handleSearch);
    container.addEventListener("click", handleViewPostClick);
    updatePostForm.addEventListener("submit", handleUpdatePostClick);

    await fetchPosts();
    setupCreatePostModal();
  })();
});
