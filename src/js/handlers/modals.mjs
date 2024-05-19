import { getPostById } from "../api/posts/get.mjs";
import { openModal, openUpdateModal } from "../api/posts/postModal.mjs";
import { handleDeletePostClick } from "../api/posts/delete.mjs";

/**
 * Handles the click event on the view post button.
 * @param {Event} event - The click event object.
 */
export async function handleViewPostClick(event) {
  const { target } = event;

  if (target.closest(".read-more-btn")) {
    const postId = target.closest(".post-card").getAttribute("data-post-id");
    if (postId) {
      try {
        const post = await getPostById(postId);
        openModal(post);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    }
  } else if (target.closest(".update-open-btn")) {
    const postId = target.closest(".post-card").getAttribute("data-post-id");
    if (postId) {
      try {
        const post = await getPostById(postId);
        const [postModal] = document.getElementsById("postModal");
        const modal = bootstrap.Modal.getInstance(postModal);
        modal.hide();
        openUpdateModal(post);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    }
  } else if (target.closest(".delete-post-btn")) {
    handleDeletePostClick(event);
  }
}
