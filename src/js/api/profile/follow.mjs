import { authFetch } from "../../api/authFetch.mjs";
import { API_SOCIAL } from "../../constants.mjs";

/**
 * Follows a user.
 * @param {string} name - The username of the user to follow.
 */
export async function handleFollow(name) {
  const url = `${API_SOCIAL}/profiles/${name}/follow`;
  try {
    const response = await authFetch(url, { method: "PUT" });
    if (response.ok) {
      console.log("Follow successful");
    } else {
      throw new Error("Failed to follow user");
    }
  } catch (error) {
    console.error("Error following user:", error);
  }
}
