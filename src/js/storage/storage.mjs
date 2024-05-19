export function saveLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocal(key) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

export function removeLocal(key) {
  localStorage.removeItem(key);
}
