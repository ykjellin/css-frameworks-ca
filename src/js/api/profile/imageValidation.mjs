/**
 * Validates the dimensions of an image file uploaded through an input element.
 * Images must not exceed the specified max width and height.
 *
 * @param {HTMLInputElement} input The input element containing the file.
 * @param {number} maxWidth The maximum allowed width.
 * @param {number} maxHeight The maximum allowed height.
 * @returns {Promise<boolean>} A promise that resolves to true if the image is valid, false otherwise.
 */
export async function validateImage(input, maxWidth = 250, maxHeight = 250) {
  const file = input.files[0];
  if (!file) {
    return false;
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        if (img.width > maxWidth || img.height > maxHeight) {
          alert(`Image must be no larger than ${maxWidth}x${maxHeight} pixels`);
          input.value = "";
          resolve(false);
        } else {
          resolve(true);
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}
