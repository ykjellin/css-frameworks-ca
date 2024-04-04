window.addEventListener("scroll", function () {
  const footer = document.querySelector("footer");
  if (window.scrollY > 0) {
    footer.style.opacity = 1;
  } else {
    footer.style.opacity = 0;
  }
});
