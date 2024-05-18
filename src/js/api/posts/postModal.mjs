import { handleUpdatePostClick } from "./update.mjs";
import { handleDeletePostClick } from "./delete.mjs";

function observeDisplayChanges() {
  const updatePostForm = document.getElementById("updatePostForm");

  if (!updatePostForm) {
    console.error("Update post form element not found.");
    return;
  }

  const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "style"
      ) {
        console.log(
          "Update form display property changed to:",
          updatePostForm.style.display
        );
      }
    }
  });

  observer.observe(updatePostForm, { attributes: true });
}

function handleModalShown(post, updateButton, deleteButton) {
  return function () {
    document.getElementById("postModalLabel").textContent = post.title;
    document.getElementById("postModalImage").src = post.media;
    document.getElementById("postModalBody").textContent = post.body;

    updateButton.style.display = "inline-block";
    updateButton.setAttribute("data-post-id", post.id);

    deleteButton.setAttribute("data-post-id", post.id);
    deleteButton.addEventListener("click", handleDeletePostClick);
  };
}

function handleModalHidden(deleteButton) {
  return function () {
    document.body.classList.remove("modal-open");
    const modalBackdrop = document.querySelector(".modal-backdrop");
    if (modalBackdrop) {
      modalBackdrop.parentNode.removeChild(modalBackdrop);
    }

    deleteButton.removeEventListener("click", handleDeletePostClick);
    location.reload(); // Reload the page when the modal is hidden
  };
}

export function openModal(post) {
  const modalElement = document.getElementById("postModal");
  const modal = new bootstrap.Modal(modalElement);
  const updateButton = modalElement.querySelector(".update-open-btn");
  const deleteButton = modalElement.querySelector(".delete-post-btn");

  modalElement.addEventListener(
    "shown.bs.modal",
    handleModalShown(post, updateButton, deleteButton)
  );
  modalElement.addEventListener(
    "hidden.bs.modal",
    handleModalHidden(deleteButton)
  );

  updateButton.addEventListener("click", () => {
    modal.hide();
    openUpdateModal(post);
  });

  modal.show();
}

export function openUpdateModal(post) {
  const updatePostModal = document.getElementById("updatePostModal");
  const updatePostForm = document.getElementById("updatePostForm");

  if (!updatePostModal || !updatePostForm) {
    console.error("Update post modal or form element not found.");
    return;
  }

  observeDisplayChanges();

  const modal = new bootstrap.Modal(updatePostModal);

  document.getElementById("updatePostId").value = post.id;
  document.getElementById("updatePostTitle").value = post.title;
  document.getElementById("updatePostBody").value = post.body;
  document.getElementById("updatePostMedia").value = post.media;

  updatePostForm.style.display = "block";

  modal.show();
}
