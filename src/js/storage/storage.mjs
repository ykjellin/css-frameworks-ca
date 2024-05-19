/**
 * Saves a value to local storage under the specified key.
 *
 * @param {string} key - The key under which to store the value.
 * @param {*} value - The value to store. It will be stringified to JSON.
 */
export function saveLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Retrieves a value from local storage by key.
 *
 * @param {string} key - The key of the value to retrieve.
 * @returns {*} The parsed JSON value, or null if the key does not exist.
 */
export function getLocal(key) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

/**
 * Removes a value from local storage by key.
 *
 * @param {string} key - The key of the value to remove.
 */
export function removeLocal(key) {
  localStorage.removeItem(key);
}
