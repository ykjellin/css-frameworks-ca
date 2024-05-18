import { openModal } from "./postModal.mjs";
import { getLocal } from "../../storage/storage.mjs";
import { API_SOCIAL } from "../../constants.mjs";

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
      console.log("Post updated:", updatedPost);
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
