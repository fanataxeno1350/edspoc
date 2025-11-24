import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const scarpContainer = document.createElement('div');
  scarpContainer.classList.add('scarp-container');

  // Find the image element from the authored HTML
  const authoredImage = block.querySelector('img');

  if (authoredImage) {
    // Create an optimized picture for the image
    const optimizedPicture = createOptimizedPicture(authoredImage.src, authoredImage.alt);
    const optimizedImg = optimizedPicture.querySelector('img');

    // Transfer original image classes and attributes to the optimized image
    if (optimizedImg) {
      authoredImage.classList.forEach(cls => optimizedImg.classList.add(cls));
      if (authoredImage.hasAttribute('aria-hidden')) {
        optimizedImg.setAttribute('aria-hidden', authoredImage.getAttribute('aria-hidden'));
      }
      // Move instrumentation from the original image to the optimized one
      moveInstrumentation(authoredImage, optimizedImg);
    }

    scarpContainer.append(optimizedPicture);
  } else {
    // If no image is found, preserve the original content of the block as a fallback
    // Although in this specific case, the block only contains an image.
    // This branch ensures robustness for unexpected authored content.
    scarpContainer.innerHTML = block.innerHTML;
  }

  // Clear the block and append the new structure
  block.textContent = '';
  block.append(scarpContainer);

  // Apply classes from the original block wrapper if they were present
  // (e.g., 'fade-in', 'scarp-component', 'data-fade-in')
  // The block itself is the root for these classes in the authored HTML.
  // No explicit root element is created beyond the block itself, so these are already on the block.
}
