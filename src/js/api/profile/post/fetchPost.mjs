import { API_SOCIAL } from "../../../constants.mjs";
import { getLocal } from "../../../storage/storage.mjs";

export async function getPostDetails(postId) {
  const userData = getLocal("userData");
  if (!userData || !userData.accessToken) {
    throw new Error("Access token is missing.");
  }

  const url = `${API_SOCIAL}/posts/${postId}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userData.accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch post details: ${response.statusText}`);
  }

  const data = await response.json();

  return data;
}
