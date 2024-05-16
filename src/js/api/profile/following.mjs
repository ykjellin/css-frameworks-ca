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
