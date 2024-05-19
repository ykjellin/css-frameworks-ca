import { handleFormSubmit } from "./api/auth/registration.mjs";
import { handleLoginSubmit } from "./api/auth/login.mjs";

/**
 * Initializes event listeners for the registration and login forms
 * when the DOM content is fully loaded.
 */
document.addEventListener("DOMContentLoaded", () => {
  /**
   * The registration form element.
   * @type {HTMLFormElement|null}
   */
  const form = document.getElementById("registrationForm");

  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  }

  /**
   * The login form element.
   * @type {HTMLFormElement|null}
   */
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", handleLoginSubmit);
  }
});
