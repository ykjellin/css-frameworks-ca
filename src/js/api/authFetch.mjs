import { getLocal } from "../storage/storage.mjs";

/**
 * Generate headers for an authenticated request.
 * @returns {Object} The headers object containing Content-Type and Authorization.
 */
export function headers() {
  const token = getLocal("accessToken");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

/**
 * Perform a fetch request with authentication headers.
 * @param {string} url - The URL to fetch.
 * @param {Object} [options={}] - Optional settings that you want to apply to the request.
 * @returns {Promise<Response>} The fetch response promise.
 */
export async function authFetch(url, options = {}) {
  const defaultHeaders = headers();
  const combinedHeaders = options.headers
    ? { ...defaultHeaders, ...options.headers }
    : defaultHeaders;

  return fetch(url, {
    ...options,
    headers: combinedHeaders,
  });
}

/**
 * Retrieve profile information from local storage.
 * @returns {*} The profile information stored in local storage.
 */
export function profileInfo() {
  return getLocal("profile");
}
