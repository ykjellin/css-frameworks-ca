// fetchPosts.mjs
import { API_SOCIAL } from "../../constants.mjs";
import { getLocal } from "../../storage/storage.mjs";

export async function fetchUserPosts() {
  const userData = getLocal("userData");
  if (!userData || !userData.name) {
    console.error("No user data available.");
    return [];
  }

  const url = `${API_SOCIAL}/profiles/${encodeURIComponent(
    userData.name
  )}/posts`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${userData.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch posts");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return []; // Return empty array on error to handle gracefully
  }
}
