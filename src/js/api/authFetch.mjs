import { getLocal } from "../storage/storage.mjs";

export function headers() {
  const token = getLocal("accessToken");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

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

export function profileInfo() {
  return getLocal("profile");
}
