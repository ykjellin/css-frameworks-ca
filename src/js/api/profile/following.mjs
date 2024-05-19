/**
 * Displays a list of users that the current user is following.
 *
 * @param {Array<Object>} following - An array of user objects that the current user is following.
 * @param {string} following[].avatar - The avatar URL of the following user.
 * @param {string} following[].name - The name of the following user.
 */
export function displayFollowing(following) {
  const followingContainer = document.getElementById("followingContainer");
  followingContainer.innerHTML = "";

  following.forEach((followingUser) => {
    const followingElement = document.createElement("div");
    followingElement.innerHTML = `
        <img src="${followingUser.avatar}" alt="Following Avatar" />
        <span>${followingUser.name}</span>
      `;
    followingContainer.appendChild(followingElement);
  });
}
