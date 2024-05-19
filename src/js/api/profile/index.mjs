import { getLocal } from "../../storage/storage.mjs";
import { fetchUserPosts } from "./fetchPosts.mjs";
import { displayPosts } from "./displayPosts.mjs";

document.addEventListener("DOMContentLoaded", async function () {
  const userData = getLocal("userData"); // Fetch user data from local storage
  if (userData) {
    document.getElementById("username").textContent = userData.name;
    document.getElementById("email").textContent = userData.email;
    document.getElementById("profileImage").src =
      userData.avatar ||
      "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg"; // Fallback to default image if not set

    try {
      const posts = await fetchUserPosts(); // Fetch posts after confirming user data is available
      displayPosts(posts); // Display posts if available
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  } else {
    // Redirect to login if userData is not available
    window.location.href = "/login.html";
  }
});
