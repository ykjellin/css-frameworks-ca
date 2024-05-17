export function displayPosts(
  posts,
  container,
  postTemplate,
  currentOffset,
  PAGE_SIZE,
  loadMorePosts
) {
  posts.forEach((post) => {
    const postElement = postTemplate.content.cloneNode(true);
    const postCard = postElement.querySelector(".card");
    const postImage = postCard.querySelector(".card-img-top");
    const postTitle = postCard.querySelector(".card-title");
    const postBody = postCard.querySelector(".card-text");
    const postCreated = postCard.querySelector(".text-muted");
    const postCommentsCount = postCard.querySelector(".comments-count");
    const postReactionsCount = postCard.querySelector(".reactions-count");
    const readMoreButton = postCard.querySelector(".read-more-btn");

    postImage.src = post.media;
    postTitle.textContent = post.title;
    postBody.textContent = post.body;
    postCreated.textContent = `Created on: ${new Date(
      post.created
    ).toLocaleDateString()}`;
    postCommentsCount.textContent = `Comments: ${post._count.comments}`;
    postReactionsCount.textContent = `Reactions: ${post._count.reactions}`;
    readMoreButton.setAttribute("data-post-id", post.id);
    readMoreButton.addEventListener("click", () => {
      openPostModal(post);
    });

    container.appendChild(postElement);
  });

  currentOffset += posts.length;

  const previousLoadMoreButton = container.querySelector(".load-more-btn");
  if (previousLoadMoreButton) {
    previousLoadMoreButton.remove();
  }

  if (posts.length === PAGE_SIZE) {
    const loadMoreButton = document.createElement("button");
    loadMoreButton.className = "btn btn-primary load-more-btn";
    loadMoreButton.textContent = "Load More";
    loadMoreButton.addEventListener("click", () =>
      loadMorePosts(PAGE_SIZE, currentOffset, container, postTemplate)
    );
    container.appendChild(loadMoreButton);
  }
}
