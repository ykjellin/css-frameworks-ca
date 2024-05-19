import { authFetch } from "../authFetch.mjs";
import { API_SOCIAL } from "../../constants.mjs";

const action = "/posts";
const method = "delete";

/**
 * Deletes a post by its ID.
 *
 * @param {string} id - The ID of the post to delete.
 * @returns {Promise<boolean>} A promise that resolves to true if the post was deleted successfully, otherwise false.
 * @throws Will throw an error if the ID is not provided.
 */
export async function deletePost(id) {
  if (!id) {
    throw new Error(`Delete requires a postID`);
  }
  try {
    const deletePostURL = `${API_SOCIAL}${action}/${id}`;
    const response = await authFetch(deletePostURL, { method });

    if (response.status === 204 || response.status === 200) {
      return true; // Indicate successful deletion
    } else {
      console.error(
        `Failed to delete post. Status: ${response.status}, StatusText: ${response.statusText}`
      );
      return false; // Indicate failure
    }
  } catch (error) {
    console.error("Exception encountered deleting post:", error); // Log the caught exception
    return false; // Indicate failure
  }
}

/**
 * Confirms if the user wants to delete the post.
 * @returns {boolean} True if the user confirms, otherwise false.
 */
function confirmDeletion() {
  return confirm("Are you sure you want to delete this post?");
}

/**
 * Deletes a post by its ID and removes its element from the DOM if deletion is successful.
 *
 * @param {string} postId - The ID of the post to delete.
 * @returns {Promise<void>}
 */
async function deletePostById(postId) {
  try {
    const success = await deletePost(postId);
    if (success) {
      const postElement = document.querySelector(
        `.post-card[data-post-id='${postId}']`
      );
      if (postElement) {
        postElement.remove();
      }
    } else {
      console.error("Failed to delete post with ID:", postId);
      alert("An error occurred while deleting the post.");
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    alert("An error occurred while deleting the post.");
  }
}

/**
 * Handles the delete post button click event.
 *
 * @param {Event} event - The click event object.
 */
export function handleDeletePostClick(event) {
  const target = event.target;
  const postId = target.getAttribute("data-post-id");

  if (postId) {
    if (confirmDeletion()) {
      deletePostById(postId);
    }
  } else {
    console.error("Post ID not found on delete button.");
  }
}
