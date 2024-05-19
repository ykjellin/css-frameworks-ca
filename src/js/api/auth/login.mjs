// login.mjs
import { API_SOCIAL } from "../../constants.mjs";
import { saveLocal, getLocal, removeLocal } from "../../storage/storage.mjs";

const action = "/auth/login";
const method = "post";
const loginURL = `${API_SOCIAL}${action}`;

export async function handleLoginSubmit(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const credentials = { email, password };

  try {
    const loginResponse = await login(credentials);
    saveLocal("userData", {
      accessToken: loginResponse.accessToken,
      name: loginResponse.name,
      email: loginResponse.email,
      avatar: loginResponse.avatar,
    });
    window.location.href = "/feed/"; // Redirect user to the feed page or dashboard
  } catch (error) {
    console.error("Error during login:", error);
    const errorMessage = document.querySelector(".errorMessage");
    if (errorMessage) {
      errorMessage.textContent = error.message;
    }
  }
}

async function login(credentials) {
  const errorMessage = document.querySelector(".errorMessage");
  try {
    const body = JSON.stringify(credentials);
    const response = await fetch(loginURL, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: body,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    return await response.json();
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
