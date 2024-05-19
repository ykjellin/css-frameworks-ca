import { authFetch } from "../authFetch.mjs";
import { API_SOCIAL } from "../../constants.mjs";

/**
 * Validates the post data before submission.
 *
 * @param {string} title - The title of the post.
 * @returns {boolean} True if the title is valid, otherwise false.
 */
function validatePostData(title) {
  if (title === "") {
    alert("Please enter a title for the post.");
    return false;
  }
  return true;
}

/**
 * Handles the submission of the create post form.
 *
 * @param {Event} event - The form submission event.
 * @param {HTMLInputElement} postTitleInput - The input element for the post title.
 * @param {HTMLInputElement} postContentInput - The input element for the post content.
 * @param {HTMLInputElement} postImageInput - The input element for the post image URL.
 * @returns {Promise<void>}
 */
async function handleSubmit(
  event,
  postTitleInput,
  postContentInput,
  postImageInput
) {
  event.preventDefault();

  const title = postTitleInput.value.trim();
  const body = postContentInput.value.trim();
  const media = postImageInput.value.trim();

  if (!validatePostData(title)) return;

  try {
    const postData = { title, body, media };

    const response = await authFetch(`${API_SOCIAL}/posts`, {
      method: "POST",
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      postTitleInput.value = "";
      postContentInput.value = "";
      postImageInput.value = "";

      const modal = bootstrap.Modal.getInstance(
        document.getElementById("createPostModal")
      );
      modal.hide();
    } else {
      const errorData = await response.json();
      alert(`Failed to create post. ${errorData.message}`);
    }
  } catch (error) {
    console.error("Error creating post:", error);
    alert("An error occurred while creating the post. Please try again.");
  }
}

/**
 * Sets up the create post modal by attaching the form submission event listener.
 */
export function setupCreatePostModal() {
  const createPostForm = document.querySelector("#createPostModal form");
  const postTitleInput = document.getElementById("postTitle");
  const postContentInput = document.getElementById("postContent");
  const postImageInput = document.getElementById("postImage");

  createPostForm.addEventListener("submit", (event) =>
    handleSubmit(event, postTitleInput, postContentInput, postImageInput)
  );
}
