import { openModal as openPostModal } from "./postModal.mjs";
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
function updatePostInUI({ title, body, media }) {
  const [modalTitle, modalBody, modalImage] = [
    document.getElementById("postModalLabel"),
    document.getElementById("postModalBody"),
    document.getElementById("postModalImage"),
  ];

  if (modalTitle) {
    modalTitle.textContent = title;
  }
  if (modalBody) {
    modalBody.textContent = body;
  }
  if (modalImage) {
    modalImage.src = media;
  }
}

/**
 * Sends an update request to the server to update a post.
 *
 * @param {Object} postData - The post data to update.
 * @param {string} postData.postId - The ID of the post to update.
 * @param {string} postData.title - The new title of the post.
 * @param {string} postData.body - The new body content of the post.
 * @param {string} postData.media - The new media URL of the post.
 * @param {string} accessToken - The access token for authorization.
 * @returns {Promise<Object>} A promise that resolves to the updated post data.
 * @throws Will throw an error if the update request fails.
 */
async function sendUpdateRequest({ postId, title, body, media }, accessToken) {
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
 * Handles the update post form submission inside the update modal.
 *
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>}
 */
async function handleUpdatePostFormSubmit(event) {
  event.preventDefault();

  const [postId, title, body, media] = [
    document.getElementById("updatePostId").value,
    document.getElementById("updatePostTitle").value,
    document.getElementById("updatePostBody").value,
    document.getElementById("updatePostMedia").value,
  ];
  const accessToken = getLocal("accessToken");

  if (accessToken) {
    try {
      const updatedPost = await sendUpdateRequest(
        { postId, title, body, media },
        accessToken
      );
      updatePostInUI(updatedPost);

      const updatePostModal = document.getElementById("updatePostModal");
      const modal = bootstrap.Modal.getInstance(updatePostModal);
      modal.hide();

      document.getElementById("updatePostTitle").value = "";
      document.getElementById("updatePostBody").value = "";
      document.getElementById("updatePostMedia").value = "";

      openPostModal(updatedPost); // Open the post details modal with the updated post
    } catch (error) {
      alert("An error occurred while updating the post. Please try again.");
    }
  } else {
    alert("Please log in to update posts.");
  }
}

/**
 * Opens the modal to update a post.
 *
 * @param {Object} post - The post data.
 * @param {string} post.id - The ID of the post.
 * @param {string} post.title - The title of the post.
 * @param {string} post.media - The media URL of the post.
 * @param {string} post.body - The body content of the post.
 */
export function openUpdateModal({ id, title, body, media }) {
  const [updatePostModal, updatePostForm] = [
    document.getElementById("updatePostModal"),
    document.getElementById("updatePostForm"),
  ];

  if (!updatePostModal || !updatePostForm) {
    console.error("Update post modal or form element not found.");
    return;
  }

  // Populate the form with post data
  document.getElementById("updatePostId").value = id;
  document.getElementById("updatePostTitle").value = title;
  document.getElementById("updatePostBody").value = body;
  document.getElementById("updatePostMedia").value = media;

  updatePostForm.style.display = "block";

  // Initialize the Bootstrap modal
  const modal = new bootstrap.Modal(updatePostModal);

  // Show the modal
  modal.show();
}

/**
 * Handles the click event for the update button in the post modal.
 *
 * @param {Object} post - The post data.
 */
export function handleUpdatePostClick(post) {
  const updateButton = document.querySelector(".update-open-btn");

  updateButton.addEventListener("click", () => {
    const postModal = bootstrap.Modal.getInstance(
      document.getElementById("postModal")
    );
    postModal.hide(); // Hide the post modal
    openUpdateModal(post); // Open the update modal
  });
}

// Attach the form submission event listener for the update post form
document
  .getElementById("updatePostForm")
  .addEventListener("submit", handleUpdatePostFormSubmit);
