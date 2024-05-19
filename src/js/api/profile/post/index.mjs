import { getPostDetails } from "../post/fetchPost.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  const postId = new URLSearchParams(window.location.search).get("postId");

  if (!postId) {
    console.error("No post ID provided.");
    document.querySelector(".post-content").innerHTML =
      '<p class="alert alert-warning">No post found.</p>';
    return;
  }

  try {
    const postData = await getPostDetails(postId);

    const postTitle = document.getElementById("postTitle");
    const postImage = document.getElementById("postImage");
    const postBody = document.getElementById("postBody");
    const postTags = document.getElementById("postTags");

    if (postTitle && postImage && postBody && postTags) {
      postTitle.textContent = postData.title;
      postImage.src =
        postData.media ||
        "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg";
      postImage.alt = postData.title;
      postBody.textContent = postData.body;
      postTags.textContent = `Tags: ${postData.tags.join(", ")}`;
    } else {
      throw new Error(
        "One or more content placeholders are missing in the document."
      );
    }
  } catch (error) {
    console.error("Failed to fetch post data:", error);
    document.querySelector(
      ".post-content"
    ).innerHTML = `<p class="alert alert-danger">Error fetching post data: ${error.message}</p>`;
  }
});
