import { API_SOCIAL } from "../../constants.mjs";
import { saveLocal, getLocal, removeLocal } from "../../storage/storage.mjs";

const action = "/auth/login";
const method = "post";
const loginURL = `${API_SOCIAL}${action}`;

export async function login(credentials) {
  const errorMessage = document.querySelector(".errorMessage");
  console.log("Error message element:", errorMessage);

  try {
    const body = JSON.stringify(credentials);
    console.log("Request body:", body);

    const response = await fetch(loginURL, {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      body,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Server response error data:", errorData);
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
