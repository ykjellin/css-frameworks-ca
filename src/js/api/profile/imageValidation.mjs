/**
 * Validates the dimensions of an uploaded image file.
 *
 * @param {HTMLInputElement} input - The input element containing the file to validate.
 * @param {number} [maxWidth=250] - The maximum allowed width for the image.
 * @param {number} [maxHeight=250] - The maximum allowed height for the image.
 * @returns {Promise<boolean>} A promise that resolves to true if the image is valid, otherwise false.
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
