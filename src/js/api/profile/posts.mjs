import { openModal } from "../posts/postModal.mjs";

/**
 * Creates a post element from a template and fills it with post data.
 * @param {Object} post - The post data.
 * @param {string} post.id - The ID of the post.
 * @param {string} post.media - The media URL of the post.
 * @param {string} post.title - The title of the post.
 * @param {string} post.body - The body content of the post.
 * @returns {DocumentFragment} The created post element.
 */
function createPostElement(post) {
  const postTemplate = document.getElementById("postTemplate");
  if (!postTemplate || !postTemplate.content) {
    throw new Error("Post template is not defined or is invalid.");
  }

  const postElement = postTemplate.content.cloneNode(true);
  const postCard = postElement.querySelector(".card");
  const postImage = postCard.querySelector(".card-img-top");
  const postTitle = postCard.querySelector(".card-title");
  const postBody = postCard.querySelector(".card-text");
  const postItem = postElement.querySelector(".post");

  postItem.setAttribute("data-post-id", post.id);
  postImage.src = post.media;
  postTitle.textContent = post.title;
  postBody.textContent = post.body;

  const readMoreButton = postCard.querySelector(".read-more-btn");
  readMoreButton.addEventListener("click", () => {
    openModal(post);
  });

  return postElement;
}

/**
 * Creates a "Load More" button for loading more profile posts.
 * @param {Function} loadMoreProfilePosts - The function to call to load more posts.
 * @param {number} PAGE_SIZE - The number of posts to load per page.
 * @param {number} currentOffset - The current offset for pagination.
 * @param {HTMLElement} container - The container element for posts.
 * @param {HTMLElement} postTemplate - The template element for posts.
 * @param {string} userName - The username of the profile.
 * @returns {HTMLButtonElement} The created "Load More" button.
 */
function createLoadMoreButton(
  loadMoreProfilePosts,
  PAGE_SIZE,
  currentOffset,
  container,
  postTemplate,
  userName
) {
  const loadMoreButton = document.createElement("button");
  loadMoreButton.className = "btn btn-primary load-more-btn";
  loadMoreButton.textContent = "Load More";
  loadMoreButton.addEventListener("click", () =>
    loadMoreProfilePosts(
      PAGE_SIZE,
      currentOffset,
      container,
      postTemplate,
      userName
    )
  );
  return loadMoreButton;
}

/**
 * Displays profile posts in the specified container and adds a "Load More" button if necessary.
 * @param {Array<Object>} posts - The array of post data to display.
 * @param {HTMLElement} container - The container element for displaying posts.
 * @param {HTMLElement} postTemplate - The template element for posts.
 * @param {number} currentOffset - The current offset for pagination.
 * @param {number} PAGE_SIZE - The number of posts to load per page.
 * @param {Function} loadMoreProfilePosts - The function to call to load more posts.
 * @param {string} userName - The username of the profile.
 */
export function displayProfilePosts(
  posts,
  container,
  postTemplate,
  currentOffset,
  PAGE_SIZE,
  loadMoreProfilePosts,
  userName
) {
  container.innerHTML = "";

  posts.forEach((post) => {
    const postElement = createPostElement(post);
    container.appendChild(postElement);
  });

  const previousLoadMoreButton = container.querySelector(".load-more-btn");
  if (previousLoadMoreButton) {
    previousLoadMoreButton.remove();
  }

  if (posts.length === PAGE_SIZE) {
    const loadMoreButton = createLoadMoreButton(
      loadMoreProfilePosts,
      PAGE_SIZE,
      currentOffset,
      container,
      postTemplate,
      userName
    );
    container.appendChild(loadMoreButton);
  }
}
