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
