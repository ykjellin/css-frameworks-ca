/**
 * Applies filters to the list of posts based on the number of reactions and comments.
 *
 * @param {Object[]} posts - The array of post objects to filter.
 * @param {string} reactions - The minimum number of reactions a post must have to be included in the filtered results.
 * @param {string} comments - The minimum number of comments a post must have to be included in the filtered results.
 * @returns {Object[]} The filtered array of post objects.
 */
export function applyFilters(posts, reactions, comments) {
  let filteredPosts = posts;

  if (reactions) {
    filteredPosts = filteredPosts.filter(({ _count }) => {
      const { reactions: postReactions } = _count;
      return postReactions >= parseInt(reactions, 10);
    });
  }

  if (comments) {
    filteredPosts = filteredPosts.filter(({ _count }) => {
      const { comments: postComments } = _count;
      return postComments >= parseInt(comments, 10);
    });
  }

  return filteredPosts;
}
