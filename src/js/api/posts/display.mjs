import { openModal } from "./postModal.mjs";

/**
 * Creates a post element using a template and post data.
 *
 * @param {Object} post - The post data.
 * @param {HTMLElement} postTemplate - The HTML template element for a post.
 * @returns {HTMLElement} The populated post element.
 * @throws Will throw an error if the post template is not defined or is invalid.
 */
function createPostElement(post, postTemplate) {
  if (!postTemplate || !postTemplate.content) {
    throw new Error("Post template is not defined or is invalid.");
  }

  // Destructure the post object
  const {
    id,
    media,
    title,
    body,
    created,
    _count: { comments, reactions },
  } = post;

  const postElement = postTemplate.content.cloneNode(true);
  const postCard = postElement.querySelector(".card");
  const postImage = postCard.querySelector(".card-img-top");
  const postTitle = postCard.querySelector(".card-title");
  const postBody = postCard.querySelector(".card-text");
  const postCreated = postCard.querySelector(".text-muted");
  const postCommentsCount = postCard.querySelector(".comments-count");
  const postReactionsCount = postCard.querySelector(".reactions-count");
  const postItem = postElement.querySelector(".post");
  postItem.setAttribute("data-post-id", id);

  const readMoreButton = postCard.querySelector(".read-more-btn");
  readMoreButton.setAttribute("data-post-id", id);
  readMoreButton.addEventListener("click", () => {
    openModal(post);
  });

  const updateButton = postElement.querySelector(".update-open-btn");
  if (updateButton) {
    updateButton.setAttribute("data-post-id", id);
  }

  const deleteButton = postElement.querySelector(".delete-post-btn");
  if (deleteButton) {
    deleteButton.setAttribute("data-post-id", id);
  }

  const defaultImageURL = "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg";
  postImage.src = media || defaultImageURL;
  postTitle.textContent = title;
  postBody.textContent = body;
  postCreated.textContent = `Created on: ${new Date(created).toLocaleDateString()}`;
  postCommentsCount.textContent = `Comments: ${comments}`;
  postReactionsCount.textContent = `Reactions: ${reactions}`;

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
 * Displays a list of posts in the specified container.
 * @function displayPosts
 * @param {Array} posts - The list of posts to display.
 * @param {HTMLElement} container - The container element to display posts in.
 * @param {HTMLTemplateElement} postTemplate - The template element for a post.
 * @param {number} offset - The offset to start displaying posts from.
 * @param {number} limit - The number of posts to display.
 * @param {Function} loadMoreCallback - The callback function to load more posts.
 */
export function displayPosts(
  posts,
  container,
  postTemplate,
  offset,
  limit,
  loadMoreCallback
) {
  if (!Array.isArray(posts)) {
    console.error("Posts is not an array.");
    return;
  }

  posts.slice(offset, offset + limit).forEach((post) => {
    const { id, title, body, media, comments, reactions } = post;

    const clone = document.importNode(postTemplate.content, true);
    const postElement = clone.querySelector(".post-card");

    postElement.querySelector(".card-title").textContent = title;
    postElement.querySelector(".card-text").textContent = body;
    postElement.querySelector(".card-img-top").src =
      media ||
      "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg"; // Use default image if media is empty
    postElement.querySelector(".comments-count").textContent = `Comments: ${
      comments ? comments.length : 0
    }`;
    postElement.querySelector(".reactions-count").textContent = `Reactions: ${
      reactions ? reactions.length : 0
    }`;

    postElement
      .querySelector(".read-more-btn")
      .addEventListener("click", () => openModal(post));

    container.appendChild(clone);
  });

  if (offset + limit < posts.length) {
    const loadMoreButton = document.createElement("button");
    loadMoreButton.textContent = "Load More";
    loadMoreButton.className = "btn btn-primary load-more-btn";
    loadMoreButton.addEventListener("click", () => {
      loadMoreCallback(container, postTemplate, offset + limit, limit);
      loadMoreButton.remove();
    });
    container.appendChild(loadMoreButton);
  }
}
