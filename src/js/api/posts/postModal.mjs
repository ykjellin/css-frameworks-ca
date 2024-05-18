export function openModal(post, isUpdateModal = false) {
  const modalId = isUpdateModal ? "updatePostModal" : "postModal";
  const modal = new bootstrap.Modal(document.getElementById(modalId));

  if (isUpdateModal) {
    document.getElementById("updatePostId").value = post.id;
    document.getElementById("updatePostTitle").value = post.title;
    document.getElementById("updatePostBody").value = post.body;
    document.getElementById("updatePostImage").value = post.media;
  } else {
    const modalTitle = document.getElementById("postModalLabel");
    const modalImage = document.getElementById("postModalImage");
    const modalBody = document.getElementById("postModalBody");
    modalTitle.textContent = post.title;
    modalImage.src = post.media;
    modalBody.textContent = post.body;
  }

  modal._element.addEventListener("hidden.bs.modal", () => {
    document.body.classList.remove("modal-open");
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    const modalBackdrop = document.querySelector(".modal-backdrop");
    if (modalBackdrop) {
      modalBackdrop.parentNode.removeChild(modalBackdrop);
    }
  });

  modal.show();
}

export function openUpdatePostModal(post) {
  const updatePostModal = new bootstrap.Modal(
    document.getElementById("updatePostModal")
  );
  document.getElementById("updatePostTitle").value = post.title;
  document.getElementById("updatePostBody").value = post.body;
  document.getElementById("updatePostMedia").value = post.media;
  document.getElementById("updatePostId").value = post.id;
  updatePostModal.show();
}
