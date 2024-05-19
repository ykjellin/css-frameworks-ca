import { handleFilterChange, handleSearch } from "./filtersAndSearch.mjs";
import { handleViewPostClick } from "./modals.mjs";
import { handleUpdatePostClick } from "../api/posts/update.mjs";

/**
 * Set up event listeners for various elements on the page.
 * @param {HTMLElement} container - The container element for posts.
 * @param {HTMLElement} postTemplate - The template element for posts.
 * @param {HTMLElement} [reactionsFilter] - The filter element for reactions.
 * @param {HTMLElement} [commentsFilter] - The filter element for comments.
 * @param {HTMLElement} searchForm - The form element for search.
 * @param {HTMLInputElement} searchInput - The input element for search.
 * @param {HTMLElement} [updatePostForm] - The form element for updating posts.
 */
export function setupEventListeners(
  container,
  postTemplate,
  reactionsFilter,
  commentsFilter,
  searchForm,
  searchInput,
  updatePostForm
) {
  if (reactionsFilter) {
    reactionsFilter.addEventListener("change", () => {
      handleFilterChange(
        container,
        postTemplate,
        reactionsFilter,
        commentsFilter
      );
    });
  }

  if (commentsFilter) {
    commentsFilter.addEventListener("change", () => {
      handleFilterChange(
        container,
        postTemplate,
        reactionsFilter,
        commentsFilter
      );
    });
  }

  if (searchForm) {
    searchForm.addEventListener("submit", (event) => {
      handleSearch(event, searchInput);
    });
  }

  if (container) {
    container.addEventListener("click", handleViewPostClick);
  }

  if (updatePostForm) {
    updatePostForm.addEventListener("submit", handleUpdatePostClick);
  }
}

/**
 * Set up the logout button event listener to clear the auth token and redirect to login.
 */
export function setupLogoutButton() {
  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      sessionStorage.removeItem("authToken");
      window.location.href = "/profile/login";
    });
  }
}

/**
 * Set up the registration form event listener.
 */
export function setRegisterFormListener() {
  const registerForm = document.getElementById("registrationForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // Handle registration logic
    });
  }
}

/**
 * Set up the login form event listener.
 */
export function setLoginFormListener() {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // Handle login logic
    });
  }
}

/**
 * Set up the update post form event listener.
 */
export function setUpdatePostFormListener() {
  const updatePostForm = document.getElementById("updatePostForm");
  if (updatePostForm) {
    updatePostForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // Handle update post logic
    });
  }
}

/**
 * Set up the update profile form event listener.
 */
export function setUpdateProfileListener() {
  const updateProfileForm = document.getElementById("updateProfileForm");
  if (updateProfileForm) {
    updateProfileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // Handle update profile logic
    });
  }
}
