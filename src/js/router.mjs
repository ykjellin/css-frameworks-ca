import { displayPosts } from "./api/posts/display.mjs";
import * as handlers from "./handlers/setupEventListeners.mjs";
import { requireAuth } from "./storage/storage.mjs";

const path = location.pathname;

/**
 * Router function to handle different paths and set up necessary event listeners and logic.
 * @async
 * @function router
 */

export async function router() {
  handlers.setupLogoutButton();

  switch (path) {
    case "/index.html/":
      // Home page logic, which is login page
      handlers.setLoginFormListener();
      break;
    case "/profile/":
      handlers.setRegisterFormListener();
      requireAuth();
      // Render user profile posts logic
      handlers.setUpdateProfileListener();
      break;
    case "/feed/":
      requireAuth();
      const container = document.getElementById("postsContainer");
      const postTemplate = document.getElementById("postTemplate");
      if (!container || !postTemplate) {
        console.error("Required elements not found in the DOM.");
        return;
      }

      handlers.setupEventListeners(container, postTemplate);

      const posts = []; // Fetch or load posts
      const PAGE_SIZE = 10;
      let currentOffset = 0;
      displayPosts(
        posts,
        container,
        postTemplate,
        currentOffset,
        PAGE_SIZE,
        () => {}
      );
      break;
    case "/single-post/":
      requireAuth();
      // Render single post logic
      handlers.setUpdatePostFormListener();
      break;
    default:
      console.log("404 - not found");
  }
}
