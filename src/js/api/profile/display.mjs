import { authFetch } from "../auth/authFetch.mjs";
import { displayPosts } from "./posts.mjs";
import { displayFollowers } from "./followers.mjs";
import { displayFollowing } from "./following.mjs";

export async function fetchAndDisplayProfile(profileName) {
  try {
    const response = await authFetch(
      `/social/profiles/${profileName}?_posts=true&_followers=true&_following=true`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch profile data");
    }

    const profileData = await response.json();

    document.getElementById("profileImage").src = profileData.avatar;
    document.getElementById("username").textContent = profileData.name;
    document.getElementById("email").textContent = profileData.email;
    document.getElementById("followersCount").textContent =
      profileData._count.followers;
    document.getElementById("followingCount").textContent =
      profileData._count.following;

    displayPosts(profileData.posts);

    displayFollowers(profileData.followers);

    displayFollowing(profileData.following);
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }
}
