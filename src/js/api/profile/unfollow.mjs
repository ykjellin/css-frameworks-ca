import { authFetch } from "../../api/authFetch.mjs";
import { API_SOCIAL } from "../../constants.mjs";

/**
 * Unfollows a user.
 * @param {string} name - The username of the user to unfollow.
 * @returns {Promise}
 */
export async function handleUnfollow(name) {
  const url = `${API_SOCIAL}/profiles/${name}/unfollow`;
  try {
    const response = await authFetch(url, { method: "PUT" });
    if (response.ok) {
      console.log("Unfollow successful");
    } else {
      throw new Error("Failed to unfollow user");
    }
  } catch (error) {
    console.error("Error unfollowing user:", error);
  }
}
