import { getPosts } from "../api/posts/get.mjs";
import { applyFilters } from "../api/posts/filter.mjs";
import { displayPosts } from "../api/posts/display.mjs";
import { loadMorePosts } from "../api/posts/load.mjs";

const PAGE_SIZE = 20;

export let currentOffset = 0;
export let currentReactions = "";
export let currentComments = "";
export let currentSearchQuery = "";

export async function fetchAndFilterPosts(
  container,
  postTemplate,
  reactionsFilter,
  commentsFilter
) {
  try {
    const includeReactions = reactionsFilter && reactionsFilter.value !== "";
    const includeComments = commentsFilter && commentsFilter.value !== "";
    const posts = await getPosts(
      PAGE_SIZE,
      currentOffset,
      includeComments,
      includeReactions
    );
    let filteredPosts = applyFilters(posts, currentReactions, currentComments);

    if (currentSearchQuery) {
      const searchTerms = currentSearchQuery.toLowerCase().split(" ");
      filteredPosts = filteredPosts.filter((post) => {
        const postIdMatch = post.id
          .toString()
          .toLowerCase()
          .includes(currentSearchQuery.toLowerCase());
        const postTitleMatch = post.title
          .toLowerCase()
          .includes(currentSearchQuery.toLowerCase());
        const postBodyMatch = post.body
          .toLowerCase()
          .includes(currentSearchQuery.toLowerCase());
        const postTermMatch = searchTerms.every(
          (term) =>
            post.title.toLowerCase().includes(term) ||
            post.body.toLowerCase().includes(term)
        );
        return postIdMatch || postTitleMatch || postBodyMatch || postTermMatch;
      });
    }

    displayPosts(
      filteredPosts,
      container,
      postTemplate,
      currentOffset,
      PAGE_SIZE,
      loadMorePosts
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}
