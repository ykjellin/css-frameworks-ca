export function displayPosts(posts) {
  const container = document.getElementById("profilePostsContainer");
  const template = document.getElementById("postTemplate");

  // Clear previous posts
  container.innerHTML = "";

  posts.forEach((post) => {
    const postClone = template.content.cloneNode(true);
    postClone.querySelector(".card-img-top").src =
      post.media || "path/to/default/post-image.png";
    postClone.querySelector(".card-title").textContent = post.title;
    postClone.querySelector(".card-text").textContent = post.body;
    const readMoreBtn = postClone.querySelector(".btn.read-more-btn");
    readMoreBtn.addEventListener("click", () => {
      window.location.href = `/post/index.html?postId=${post.id}`; // Navigate to the post details page
    });

    container.appendChild(postClone);
  });
}
