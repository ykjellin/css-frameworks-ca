import { getPosts } from "../api/posts/get.mjs";
import { applyFilters } from "../api/posts/filter.mjs";
import { displayPosts } from "../api/posts/display.mjs";
import { loadMorePosts } from "../api/posts/load.mjs";

const PAGE_SIZE = 20;

export const state = {
  allPosts: [], // Store all posts here
  currentOffset: 0,
  currentReactions: "",
  currentComments: "",
  currentSearchQuery: "",
};

export async function fetchPosts() {
  try {
    const includeComments = true;
    const includeReactions = true;
    state.allPosts = await getPosts(includeComments, includeReactions);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

export async function fetchAndFilterPosts(
  container,
  postTemplate,
  reactionsFilter,
  commentsFilter
) {
  if (!postTemplate || !(postTemplate instanceof HTMLTemplateElement)) {
    console.error("Post template is not defined or is invalid.");
    return;
  }

  try {
    const includeReactions = reactionsFilter && reactionsFilter.value !== "";
    const includeComments = commentsFilter && commentsFilter.value !== "";
    const posts = await getPosts(
      PAGE_SIZE,
      state.currentOffset,
      includeComments,
      includeReactions
    );
    let filteredPosts = applyFilters(
      state.allPosts,
      state.currentReactions,
      state.currentComments
    );

    if (state.currentSearchQuery) {
      const searchTerms = state.currentSearchQuery.toLowerCase().split(" ");
      filteredPosts = filteredPosts.filter((post) => {
        const postId = post.id ? post.id.toString().toLowerCase() : "";
        const postTitle = post.title ? post.title.toLowerCase() : "";
        const postBody = post.body ? post.body.toLowerCase() : "";

        const postIdMatch = postId.includes(
          state.currentSearchQuery.toLowerCase()
        );
        const postTitleMatch = postTitle.includes(
          state.currentSearchQuery.toLowerCase()
        );
        const postBodyMatch = postBody.includes(
          state.currentSearchQuery.toLowerCase()
        );
        const postTermMatch = searchTerms.every(
          (term) => postTitle.includes(term) || postBody.includes(term)
        );
        return postIdMatch || postTitleMatch || postBodyMatch || postTermMatch;
      });
    }

    displayPosts(
      filteredPosts,
      container,
      postTemplate,
      state.currentOffset,
      PAGE_SIZE,
      loadMorePosts
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}
