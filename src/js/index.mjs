import { handleFormSubmit } from "./api/auth/registration.mjs";
import { handleLoginSubmit } from "./api/auth/login.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLoginSubmit);
  }
});
