/**
 * Save a value to localStorage under a specific key.
 * @param {string} key - The key under which the value will be stored.
 * @param {*} value - The value to store. It will be serialized to JSON.
 */
export function saveLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Retrieve a value from localStorage by key.
 * @param {string} key - The key of the value to retrieve.
 * @returns {*} The parsed value from localStorage, or null if the key does not exist.
 */
export function getLocal(key) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

/**
 * Remove an item from localStorage by key.
 * @param {string} key - The key of the item to remove.
 */
export function removeLocal(key) {
  localStorage.removeItem(key);
}

/**
 * Ensure the user is authenticated by checking for an auth token in sessionStorage.
 * If no auth token is found, redirect the user to the login page.
 */
export function requireAuth() {
  const authToken = sessionStorage.getItem("authToken");

  if (!authToken) {
    window.location.href = "/index.html";
  }
}
