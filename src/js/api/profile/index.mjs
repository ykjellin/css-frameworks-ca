import { fetchAndDisplayProfile } from "./display.mjs";
import { handleFollow, handleUnfollow } from "./follow.mjs";
import { updateProfileMedia } from "./update.mjs";
import { getLocal } from "../storage/storage.mjs";
import { authFetch } from "../auth/authFetch.mjs";

async function init() {
  const accessToken = getLocal("accessToken");
  if (accessToken) {
    try {
      const response = await authFetch("/social/profiles/<name>");

      if (!response.ok) {
        throw new Error("Failed to fetch logged-in user");
      }

      const loggedInUser = await response.json();
      await fetchAndDisplayProfile(loggedInUser.name);
      document
        .getElementById("followButton")
        .addEventListener("click", () => handleFollow(loggedInUser.name));
      document
        .getElementById("unfollowButton")
        .addEventListener("click", () => handleUnfollow(loggedInUser.name));
      document
        .getElementById("updateMediaForm")
        .addEventListener("submit", (event) =>
          updateProfileMedia(event, loggedInUser.name)
        );
    } catch (error) {
      console.error("Error fetching logged-in user:", error);
    }
  } else {
  }
}

document.addEventListener("DOMContentLoaded", init);
