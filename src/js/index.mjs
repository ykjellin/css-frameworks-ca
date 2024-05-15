import { handleFormSubmit } from "./api/auth/registration.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  }
});
