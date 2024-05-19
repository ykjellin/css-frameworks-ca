/**
 * Applies filters to the list of posts based on the number of reactions and comments.
 *
 * @param {Array<Object>} posts - The array of post objects to filter.
 * @param {string} reactions - The minimum number of reactions a post must have to be included in the filtered results.
 * @param {string} comments - The minimum number of comments a post must have to be included in the filtered results.
 * @returns {Array<Object>} The filtered array of post objects.
 */
export function applyFilters(posts, reactions, comments) {
  let filteredPosts = posts;

  if (reactions) {
    filteredPosts = filteredPosts.filter(
      (post) => post._count.reactions >= parseInt(reactions)
    );
  }

  if (comments) {
    filteredPosts = filteredPosts.filter(
      (post) => post._count.comments >= parseInt(comments)
    );
  }

  return filteredPosts;
}
