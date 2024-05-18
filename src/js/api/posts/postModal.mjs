export function openModal(post, isUpdateModal = false) {
  const modalId = isUpdateModal ? "updatePostModal" : "postModal";
  const modalElement = document.getElementById(modalId);
  const modal = new bootstrap.Modal(modalElement);

  if (isUpdateModal) {
    document.getElementById("updatePostId").value = post.id;
    document.getElementById("updatePostTitle").value = post.title;
    document.getElementById("updatePostBody").value = post.body;
    document.getElementById("updatePostMedia").value = post.media;
  } else {
    document.getElementById("postModalLabel").textContent = post.title;
    document.getElementById("postModalImage").src = post.media;
    document.getElementById("postModalBody").textContent = post.body;
  }

  modalElement.addEventListener("hidden.bs.modal", () => {
    document.body.classList.remove("modal-open");
    const modalBackdrop = document.querySelector(".modal-backdrop");
    if (modalBackdrop) {
      modalBackdrop.parentNode.removeChild(modalBackdrop);
    }
  });

  modal.show();
}
