import { router } from "./router.mjs";
import { handleFormSubmit } from "./api/auth/registration.mjs";
import { handleLoginSubmit } from "./api/auth/login.mjs";

/**
 * Initialize event listeners when the DOM content is fully loaded.
 * @function
 */
document.addEventListener("DOMContentLoaded", () => {
  router();

  /**
   * Add event listener for the registration form submit event.
   * @type {HTMLElement}
   */
  const form = document.getElementById("registrationForm");
  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  }

  /**
   * Add event listener for the login form submit event.
   * @type {HTMLElement}
   */
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLoginSubmit);
  }
});

/**
 * Adjust footer opacity based on scroll position.
 * @function
 */
window.addEventListener("scroll", function () {
  const footer = document.querySelector("footer");
  if (window.scrollY > 0) {
    footer.style.opacity = 1;
  } else {
    footer.style.opacity = 0;
  }
});

/**
 * Reinitialize the router when the browser's history changes.
 * @function
 */
window.addEventListener("popstate", router);
