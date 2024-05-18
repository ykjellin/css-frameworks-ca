import { openModal } from "./postModal.mjs";

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

  postImage.src = post.media;
  postTitle.textContent = post.title;
  postBody.textContent = post.body;
  postCreated.textContent = `Created on: ${new Date(
    post.created
  ).toLocaleDateString()}`;
  postCommentsCount.textContent = `Comments: ${post._count.comments}`;
  postReactionsCount.textContent = `Reactions: ${post._count.reactions}`;

  return postElement;
}

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
