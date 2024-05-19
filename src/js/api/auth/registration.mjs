import { API_SOCIAL } from "../../constants.mjs";
const errorMessage = document.querySelector(".errorMessage");

const action = "/auth/register";
const method = "post";
const registrationURL = `${API_SOCIAL}${action}`;

/**
 * Registers a new user profile.
 *
 * @param {Object} profile - The user profile data.
 * @param {string} profile.name - The username.
 * @param {string} profile.email - The email address.
 * @param {string} profile.password - The password.
 * @param {string} profile.confirmPassword - The confirmation of the password.
 * @returns {Promise<Object>} A promise that resolves to the registration response data.
 * @throws Will throw an error if the registration fails.
 */
export async function register(profile) {
  const errorMessage = document.querySelector(".errorMessage");

  try {
    const body = JSON.stringify(profile);
    const response = await fetch(registrationURL, {
      headers: {
        "content-Type": "application/json",
      },
      method,
      body,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (errorMessage) {
      errorMessage.textContent = error.message;
    }
    throw error;
  }
}

/**
 * Handles the form submission for user registration.
 *
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>}
 */
export async function handleFormSubmit(event) {
  event.preventDefault();

  const profile = {
    name: document.getElementById("registerUsername").value,
    email: document.getElementById("registerEmail").value,
    password: document.getElementById("registerPassword").value,
    confirmPassword: document.getElementById("confirmPassword").value,
  };

  const errorMessage = document.querySelector(".errorMessage");
  errorMessage.textContent = "";

  if (profile.password !== profile.confirmPassword) {
    errorMessage.textContent = "Passwords do not match!";
    return;
  }

  try {
    const data = await register(profile);
    alert("Registration successful!");
    $("#registerModal").modal("hide");
  } catch (error) {
    console.error("Error", error);
  }
}
