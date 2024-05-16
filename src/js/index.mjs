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

function handleLoginSubmit(event) {
  event.preventDefault();

  const credentials = {
    email: document.getElementById("loginEmail").value,
    password: document.getElementById("loginPassword").value,
  };

  console.log("Credentials data:", credentials);

  login(credentials)
    .then((data) => {
      saveLocal("user", data);
      console.log("Login successful", data);
      window.location.href = "/profile/index.html";
    })
    .catch((error) => {
      console.error("Error during login:", error);
      const errorMessage = document.querySelector(".errorMessage");
      if (errorMessage) {
        errorMessage.textContent = error.message;
      }
    });
}
