import { API_SOCIAL } from "../../constants.mjs";
import { saveLocal, getLocal, removeLocal } from "../../storage/storage.mjs";

const action = "/auth/login";
const method = "post";
const loginURL = `${API_SOCIAL}${action}`;

/**
 * Handles the login form submission.
 *
 * @param {Event} event - The form submission event.
 */
export async function handleLoginSubmit(event) {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const credentials = { email, password };

  try {
    const loginResponse = await login(credentials);
    saveLocal("accessToken", loginResponse.accessToken);
    saveLocal("name", loginResponse.name);
    window.location.href = "/feed/";
  } catch (error) {
    console.error("Error during login:", error);
    const errorMessage = document.querySelector(".errorMessage");
    if (errorMessage) {
      errorMessage.textContent = error.message;
    }
  }
}

/**
 * Sends login credentials to the server and returns the response data.
 *
 * @param {Object} credentials - The login credentials.
 * @param {string} credentials.email - The user's email.
 * @param {string} credentials.password - The user's password.
 * @returns {Promise<Object>} The server response data.
 * @throws {Error} If the login request fails.
 */
async function login(credentials) {
  const errorMessage = document.querySelector(".errorMessage");

  try {
    const body = JSON.stringify(credentials);
    const response = await fetch(loginURL, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: body,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (errorMessage) {
      errorMessage.textContent = error.message;
    } else {
      console.error("Error message element not found. Error:", error.message);
    }
    throw error;
  }
}

export { saveLocal, getLocal, removeLocal };
