import { authFetch } from "../authFetch.mjs";
import { API_SOCIAL } from "../../constants.mjs";

function validatePostData(title) {
  if (title === "") {
    alert("Please enter a title for the post.");
    return false;
  }
  return true;
}

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

export function setupCreatePostModal() {
  const createPostForm = document.querySelector("#createPostModal form");
  const postTitleInput = document.getElementById("postTitle");
  const postContentInput = document.getElementById("postContent");
  const postImageInput = document.getElementById("postImage");

  createPostForm.addEventListener("submit", (event) =>
    handleSubmit(event, postTitleInput, postContentInput, postImageInput)
  );
}
