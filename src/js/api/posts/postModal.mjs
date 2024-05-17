export function openPostModal(post) {
  const modalTitle = document.getElementById("postModalLabel");
  const modalImage = document.getElementById("postModalImage");
  const modalBody = document.getElementById("postModalBody");

  modalTitle.textContent = post.title;
  modalImage.src = post.media;
  modalBody.textContent = post.body;

  const modal = new bootstrap.Modal(document.getElementById("postModal"));
  modal.show();
}
