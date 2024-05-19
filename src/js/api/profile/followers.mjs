/**
 * Displays a list of users that are following the current user.
 *
 * @param {Array<Object>} followers - An array of user objects that are following the current user.
 * @param {string} followers[].avatar - The avatar URL of the follower.
 * @param {string} followers[].name - The name of the follower.
 */
export function displayFollowers(followers) {
  const followersContainer = document.getElementById("followersContainer");
  followersContainer.innerHTML = "";

  followers.forEach((follower) => {
    const followerElement = document.createElement("div");
    followerElement.innerHTML = `
        <img src="${follower.avatar}" alt="Follower Avatar" />
        <span>${follower.name}</span>
      `;
    followersContainer.appendChild(followerElement);
  });
}
