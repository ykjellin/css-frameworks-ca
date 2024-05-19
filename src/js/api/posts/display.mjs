import { openModal } from "./postModal.mjs";

/**
 * Creates a post element from a template and fills it with post data.
 *
 * @param {Object} post - The post data.
 * @param {string} post.id - The ID of the post.
 * @param {string} post.media - The media URL of the post.
 * @param {string} post.title - The title of the post.
 * @param {string} post.body - The body content of the post.
 * @param {string} post.created - The creation date of the post.
 * @param {Object} post._count - The count of comments and reactions.
 * @param {number} post._count.comments - The number of comments on the post.
 * @param {number} post._count.reactions - The number of reactions on the post.
 * @param {HTMLTemplateElement} postTemplate - The template element for posts.
 * @returns {DocumentFragment} The created post element.
 * @throws Will throw an error if the post template is not defined or is invalid.
 */
function createPostElement(post, postTemplate) {
  if (!postTemplate || !postTemplate.content) {
    throw new Error("Post template is not defined or is invalid.");
  }

  const postElement = postTemplate.content.cloneNode(true);
  const postCard = postElement.querySelector(".card");
  const postImage = postCard.querySelector(".card-img-top");
  const postTitle = postCard.querySelector(".card-title");
  const postBody = postCard.querySelector(".card-text");
  const postCreated = postCard.querySelector(".text-muted");
  const postCommentsCount = postCard.querySelector(".comments-count");
  const postReactionsCount = postCard.querySelector(".reactions-count");
  const postItem = postElement.querySelector(".post");
  postItem.setAttribute("data-post-id", post.id);

  const readMoreButton = postCard.querySelector(".read-more-btn");
  readMoreButton.setAttribute("data-post-id", post.id);
  readMoreButton.addEventListener("click", () => {
    openModal(post);
  });

  const updateButton = postElement.querySelector(".update-open-btn");
  if (updateButton) {
    updateButton.setAttribute("data-post-id", post.id);
  }

  const deleteButton = postElement.querySelector(".delete-post-btn");
  if (deleteButton) {
    deleteButton.setAttribute("data-post-id", post.id);
  }

  const defaultImageURL =
    "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg";
  postImage.src = post.media || defaultImageURL;

  postTitle.textContent = post.title;
  postBody.textContent = post.body;
  postCreated.textContent = `Created on: ${new Date(
    post.created
  ).toLocaleDateString()}`;
  postCommentsCount.textContent = `Comments: ${post._count.comments}`;
  postReactionsCount.textContent = `Reactions: ${post._count.reactions}`;

  return postElement;
}

/**
 * Creates a "Load More" button for loading more posts.
 *
 * @param {Function} loadMorePosts - The function to call to load more posts.
 * @param {number} PAGE_SIZE - The number of posts to load per page.
 * @param {number} currentOffset - The current offset for pagination.
 * @param {HTMLElement} container - The container element for posts.
 * @param {HTMLTemplateElement} postTemplate - The template element for posts.
 * @returns {HTMLButtonElement} The created "Load More" button.
 */
function createLoadMoreButton(
  loadMorePosts,
  PAGE_SIZE,
  currentOffset,
  container,
  postTemplate
) {
  const loadMoreButton = document.createElement("button");
  loadMoreButton.className = "btn btn-primary load-more-btn";
  loadMoreButton.textContent = "Load More";
  loadMoreButton.addEventListener("click", () =>
    loadMorePosts(PAGE_SIZE, currentOffset, container, postTemplate)
  );
  return loadMoreButton;
}

/**
 * Displays posts in the specified container and adds a "Load More" button if necessary.
 *
 * @param {Array<Object>} posts - The array of post data to display.
 * @param {HTMLElement} container - The container element for displaying posts.
 * @param {HTMLTemplateElement} postTemplate - The template element for posts.
 * @param {number} currentOffset - The current offset for pagination.
 * @param {number} PAGE_SIZE - The number of posts to load per page.
 * @param {Function} loadMorePosts - The function to call to load more posts.
 */
export function displayPosts(
  posts,
  container,
  postTemplate,
  currentOffset,
  PAGE_SIZE,
  loadMorePosts
) {
  if (!postTemplate || !postTemplate.content) {
    console.error("Post template is not defined or is invalid.");
    return;
  }

  posts.forEach((post) => {
    const postElement = createPostElement(post, postTemplate);
    container.appendChild(postElement);
  });
  currentOffset += posts.length;

  const previousLoadMoreButton = container.querySelector(".load-more-btn");
  if (previousLoadMoreButton) {
    previousLoadMoreButton.remove();
  }

  if (posts.length === PAGE_SIZE) {
    const loadMoreButton = createLoadMoreButton(
      loadMorePosts,
      PAGE_SIZE,
      currentOffset,
      container,
      postTemplate
    );
    container.appendChild(loadMoreButton);
  }
}
