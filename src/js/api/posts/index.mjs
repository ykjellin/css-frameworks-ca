import { getPosts } from "./get.mjs";
import { API_SOCIAL } from "../../constants.mjs";

let currentOffset = 0;
const PAGE_SIZE = 20;

function displayPosts(posts) {
  const container = document.getElementById("postsContainer");
  const postTemplate = document.getElementById("postTemplate");

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

  if (posts.length === PAGE_SIZE) {
    const loadMoreButton = document.createElement("button");
    loadMoreButton.className = "btn btn-primary load-more-btn";
    loadMoreButton.textContent = "Load More";
    loadMoreButton.addEventListener("click", loadMorePosts);
    container.appendChild(loadMoreButton);
  }
}

async function loadMorePosts() {
  try {
    const posts = await getPosts(PAGE_SIZE, currentOffset);
    displayPosts(posts);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } catch (error) {
    console.error("Error loading more posts:", error);
  }
}

function openPostModal(post) {
  const modalTitle = document.getElementById("postModalLabel");
  const modalImage = document.getElementById("postModalImage");
  const modalBody = document.getElementById("postModalBody");

  modalTitle.textContent = post.title;
  modalImage.src = post.media;
  modalBody.textContent = post.body;

  const modal = new bootstrap.Modal(document.getElementById("postModal"));
  modal.show();
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const posts = await getPosts(PAGE_SIZE, currentOffset);
    displayPosts(posts);
  } catch (error) {
    console.error("Error initializing posts:", error);
  }
});
