import { authFetch } from "../../api/authFetch.mjs";
import { API_SOCIAL } from "../../constants.mjs";

/**
 * Follows a user.
 *
 * @param {string} name - The username of the user to follow.
 * @returns {Promise} A promise that resolves when the follow action is complete.
 * @throws Will throw an error if the follow action fails.
 */
export async function handleFollow(name) {
  const url = `${API_SOCIAL}/profiles/${name}/follow`;
  try {
    const response = await authFetch(url, { method: "PUT" });
    if (!response.ok) {
      throw new Error("Failed to follow user");
    }
  } catch (error) {
    console.error("Error following user:", error);
    throw error; // Re-throw the error to be handled by the caller if needed
  }
}
