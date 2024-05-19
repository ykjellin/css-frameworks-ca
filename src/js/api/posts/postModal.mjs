import { handleUpdatePostClick } from "./update.mjs";
import { handleDeletePostClick } from "./delete.mjs";

/**
 * Observes changes to the display property of the update post form and logs them.
 */
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

/**
 * Handles the 'shown.bs.modal' event for the post modal.
 *
 * @param {Object} post - The post data.
 * @param {string} post.id - The ID of the post.
 * @param {string} post.title - The title of the post.
 * @param {string} post.media - The media URL of the post.
 * @param {string} post.body - The body content of the post.
 * @param {HTMLElement} updateButton - The button element for updating the post.
 * @param {HTMLElement} deleteButton - The button element for deleting the post.
 * @returns {Function} The event handler function.
 */
function handleModalShown(
  { id, title, media, body },
  updateButton,
  deleteButton
) {
  return function () {
    const [modalTitle, modalImage, modalBody] = [
      document.getElementById("postModalLabel"),
      document.getElementById("postModalImage"),
      document.getElementById("postModalBody"),
    ];

    modalTitle.textContent = title;
    modalImage.src = media;
    modalBody.textContent = body;

    updateButton.style.display = "inline-block";
    updateButton.setAttribute("data-post-id", id);

    deleteButton.setAttribute("data-post-id", id);
    deleteButton.addEventListener("click", handleDeletePostClick);
  };
}

/**
 * Handles the 'hidden.bs.modal' event for the post modal.
 *
 * @param {HTMLElement} deleteButton - The button element for deleting the post.
 * @returns {Function} The event handler function.
 */
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

/**
 * Opens a modal with post details.
 *
 * @param {Object} post - The post data.
 * @param {string} post.title - The title of the post.
 * @param {string} [post.media] - The URL of the post's media.
 * @param {string} post.body - The body content of the post.
 * @param {string} post.id - The ID of the post.
 */
export function openModal({ title, media, body, id }) {
  const modalElement = document.getElementById("postModal");
  const modal = new bootstrap.Modal(modalElement);

  const [updateButton, deleteButton] = [
    modalElement.querySelector(".update-open-btn"),
    modalElement.querySelector(".delete-post-btn"),
  ];

  modalElement.addEventListener("shown.bs.modal", () => {
    const [modalTitle, modalImage, modalBody] = [
      document.getElementById("postModalLabel"),
      document.getElementById("postModalImage"),
      document.getElementById("postModalBody"),
    ];

    modalTitle.textContent = title;
    const defaultImageURL =
      "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg";
    modalImage.src = media || defaultImageURL;
    modalBody.textContent = body;

    updateButton.style.display = "inline-block";
    updateButton.setAttribute("data-post-id", id);

    deleteButton.setAttribute("data-post-id", id);
    deleteButton.addEventListener("click", handleDeletePostClick);
  });

  modalElement.addEventListener("hidden.bs.modal", () => {
    document.body.classList.remove("modal-open");
    const modalBackdrop = document.querySelector(".modal-backdrop");
    if (modalBackdrop) {
      modalBackdrop.parentNode.removeChild(modalBackdrop);
    }

    deleteButton.removeEventListener("click", handleDeletePostClick);
  });

  handleUpdatePostClick({ title, media, body, id });

  modal.show();
}

/**
 * Opens the modal to update a post.
 *
 * @param {Object} post - The post data.
 * @param {string} post.id - The ID of the post.
 * @param {string} post.title - The title of the post.
 * @param {string} post.media - The media URL of the post.
 * @param {string} post.body - The body content of the post.
 */
export function openUpdateModal({ id, title, body, media }) {
  const [updatePostModal, updatePostForm] = [
    document.getElementById("updatePostModal"),
    document.getElementById("updatePostForm"),
  ];

  if (!updatePostModal || !updatePostForm) {
    console.error("Update post modal or form element not found.");
    return;
  }

  observeDisplayChanges();

  const modal = new bootstrap.Modal(updatePostModal);

  document.getElementById("updatePostId").value = id;
  document.getElementById("updatePostTitle").value = title;
  document.getElementById("updatePostBody").value = body;
  document.getElementById("updatePostMedia").value = media;

  updatePostForm.style.display = "block";

  modal.show();
}
