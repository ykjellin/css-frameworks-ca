import { authFetch } from "../authFetch.mjs";
import { API_SOCIAL } from "../../constants.mjs";

/**
 * Function to handle form submission for updating profile media.
 *
 * @param {Event} event - The event object from the form submission.
 * @param {string} name - The name of the profile to update.
 */
export async function updateProfileMedia(event, name) {
  event.preventDefault();

  const form = event.target;

  const jsonBody = {
    avatar: form.elements["avatar"].value || null,
    banner: form.elements["banner"].value || null,
  };

  const url = `${API_SOCIAL}/profiles/${name}/media`;

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonBody),
  };

  try {
    const response = await authFetch(url, options);

    if (response.ok) {
      const result = await response.json();
      alert("Profile updated successfully!");
      updateProfileImageOnPage(result.avatar);
    } else {
      throw new Error("Failed to update profile");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("Error updating profile. Please try again.");
  }
}

/**
 * Updates the profile image element with the new avatar URL.
 *
 * @param {string} avatarUrl - The URL of the updated avatar image.
 */
function updateProfileImageOnPage(avatarUrl) {
  const profileImageElement = document.getElementById("profileImage");
  if (profileImageElement) {
    profileImageElement.src = avatarUrl;
  }
}
