import { authFetch } from "../authFetch.mjs";
import { API_SOCIAL } from "../../constants.mjs";

const action = "/posts";
const method = "delete";

export async function deletePost(id) {
  if (!id) {
    throw new Error(`Delete requires a postID`);
  }
  try {
    const deletePostURL = `${API_SOCIAL}${action}/${id}`;
    const response = await authFetch(deletePostURL, { method });

    console.log("Response status:", response.status); // Log the response status

    if (response.status === 204 || response.status === 200) {
      console.log("Post deleted successfully");
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

export function handleDeletePostClick(event) {
  const target = event.target;
  const postId = target.getAttribute("data-post-id");

  if (postId) {
    if (confirm("Are you sure you want to delete this post?")) {
      deletePost(postId)
        .then((success) => {
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
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
          alert("An error occurred while deleting the post.");
        });
    }
  } else {
    console.error("Post ID not found on delete button.");
  }
}
