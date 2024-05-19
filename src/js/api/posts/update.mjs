import { openModal } from "./postModal.mjs";
import { getLocal } from "../../storage/storage.mjs";
import { API_SOCIAL } from "../../constants.mjs";

/**
 * Updates the post content in the UI modal.
 *
 * @param {Object} updatedPost - The updated post data.
 * @param {string} updatedPost.title - The title of the post.
 * @param {string} updatedPost.body - The body content of the post.
 * @param {string} updatedPost.media - The media URL of the post.
 */
function updatePostInUI(updatedPost) {
  const modalTitle = document.getElementById("postModalLabel");
  const modalBody = document.getElementById("postModalBody");
  const modalImage = document.getElementById("postModalImage");

  if (modalTitle) {
    modalTitle.textContent = updatedPost.title;
  }
  if (modalBody) {
    modalBody.textContent = updatedPost.body;
  }
  if (modalImage) {
    modalImage.src = updatedPost.media;
  }
}

/**
 * Sends an update request to the server to update a post.
 *
 * @param {string} postId - The ID of the post to update.
 * @param {string} title - The new title of the post.
 * @param {string} body - The new body content of the post.
 * @param {string} media - The new media URL of the post.
 * @param {string} accessToken - The access token for authorization.
 * @returns {Promise<Object>} A promise that resolves to the updated post data.
 * @throws Will throw an error if the update request fails.
 */
async function sendUpdateRequest(postId, title, body, media, accessToken) {
  try {
    const response = await fetch(`${API_SOCIAL}/posts/${postId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body, media }),
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}

/**
 * Handles the update post button click event.
 *
 * @param {Event} event - The click event object.
 * @returns {Promise<void>}
 */
export async function handleUpdatePostClick(event) {
  event.preventDefault();

  const postId = document.getElementById("updatePostId").value;
  const title = document.getElementById("updatePostTitle").value;
  const body = document.getElementById("updatePostBody").value;
  const media = document.getElementById("updatePostMedia").value;
  const accessToken = getLocal("accessToken");

  if (accessToken) {
    try {
      const updatedPost = await sendUpdateRequest(
        postId,
        title,
        body,
        media,
        accessToken
      );
      updatePostInUI(updatedPost);

      const updatePostModal = document.getElementById("updatePostModal");
      const modal = bootstrap.Modal.getInstance(updatePostModal);
      modal.hide();

      document.getElementById("updatePostTitle").value = "";
      document.getElementById("updatePostBody").value = "";
      document.getElementById("updatePostMedia").value = "";

      openModal(updatedPost); // Open the post details modal with the updated post
    } catch (error) {
      alert("An error occurred while updating the post. Please try again.");
    }
  } else {
    alert("Please log in to update posts.");
  }
}
