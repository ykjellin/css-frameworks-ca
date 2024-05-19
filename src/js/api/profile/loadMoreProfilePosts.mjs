import { getProfilePosts } from "./getProfilePosts.mjs";
import { displayProfilePosts } from "./displayProfilePosts.mjs";

/**
 * Load more profile posts and display them in the specified container.
 *
 * @param {number} PAGE_SIZE - The number of posts to load per page.
 * @param {number} currentOffset - The current offset for pagination.
 * @param {HTMLElement} container - The container element for displaying posts.
 * @param {HTMLElement} postTemplate - The template element for posts.
 * @param {string} userName - The username of the profile.
 * @returns {Promise}
 */
export async function loadMoreProfilePosts(
  PAGE_SIZE,
  currentOffset,
  container,
  postTemplate,
  userName
) {
  try {
    const posts = await getProfilePosts(userName, PAGE_SIZE, currentOffset);
    displayProfilePosts(
      posts,
      container,
      postTemplate,
      currentOffset,
      PAGE_SIZE,
      loadMoreProfilePosts,
      userName
    );
  } catch (error) {
    console.error("Error loading more profile posts:", error);
  }
}
