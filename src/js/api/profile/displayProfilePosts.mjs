import { openModal } from "../posts/postModal.mjs"; // Reuse the openModal function from posts

function createPostElement(post, postTemplate) {
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
  postImage.src = post.media || "path/to/default/image.jpg"; // Use a default image if none is provided
  postTitle.textContent = post.title;
  postBody.textContent = post.body;

  const readMoreButton = postCard.querySelector(".read-more-btn");
  readMoreButton.addEventListener("click", () => {
    openModal(post);
  });

  return postElement;
}

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

export function displayProfilePosts(
  posts,
  container,
  postTemplate,
  currentOffset,
  PAGE_SIZE,
  loadMoreProfilePosts,
  userName
) {
  console.log("Displaying posts:", posts); // Debugging line
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
