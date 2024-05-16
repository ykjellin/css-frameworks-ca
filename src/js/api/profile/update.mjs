import { authFetch } from "../auth/authFetch.mjs";

/**
 * Function to handle form submission for updating profile media.
 * This function should be attached to a form's submit event.
 *
 * @param {Event} event - The event object from the form submission.
 * @param {string} userName - The username of the profile to update.
 */
export async function updateProfileMedia(event, userName) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  const url = `${API_SOCIAL}/profiles/${userName}/media`;

  const options = {
    method: "POST",
    body: formData,
  };

  try {
    const response = await authFetch(url, options);

    if (response.ok) {
      const result = await response.json();
      alert("Profile updated successfully!");
      console.log("Update response:", result);
    } else {
      throw new Error("Failed to update profile");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("Error updating profile. Please try again.");
  }
}
