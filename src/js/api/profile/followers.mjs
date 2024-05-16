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
