import { fetchAndDisplayProfile } from "./display.mjs";
import { handleFollow } from "./follow.mjs";
import { handleUnfollow } from "./unfollow.mjs";
import { updateProfileMedia } from "./update.mjs";
import { validateImage } from "./imageValidation.mjs";
import { getLocal } from "../../storage/storage.mjs";
import { authFetch } from "../authFetch.mjs";

async function init() {
  const accessToken = getLocal("accessToken");
  const username = getLocal("name");
  if (!accessToken) {
    console.error("No access token available.");
    return;
  }

  if (!name) {
    console.error("No name available.");
    return;
  }
  try {
    const userResponse = await authFetch(`/social/profiles/${name}`);
    if (!userResponse.ok) throw new Error("Failed to fetch logged-in user");
    const loggedInUser = await userResponse.json();

    fetchAndDisplayProfile(loggedInUser.name);
    setupEventListeners(loggedInUser.name);
  } catch (error) {
    console.error("Initialization failed:", error);
  }
}

function setupEventListeners(userName) {
  document
    .getElementById("followButton")
    .addEventListener("click", () => handleFollow(userName));
  document
    .getElementById("unfollowButton")
    .addEventListener("click", () => handleUnfollow(userName));

  const avatarInput = document.getElementById("avatar");
  const bannerInput = document.getElementById("banner");
  avatarInput.addEventListener("change", () => validateImage(avatarInput));
  bannerInput.addEventListener("change", () => validateImage(bannerInput));

  const updateForm = document.getElementById("updateMediaForm");
  updateForm.addEventListener("submit", (event) => {
    event.preventDefault();
    updateProfileMedia(event, userName);
  });
}

document.addEventListener("DOMContentLoaded", init);
