import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const scarpContainer = document.createElement('div');
  scarpContainer.classList.add('scarp-container');

  const imageElement = block.querySelector('img[data-aue-prop="image"]');
  if (imageElement) {
    const picture = createOptimizedPicture(imageElement.src, imageElement.alt);
    moveInstrumentation(imageElement, picture.querySelector('img'));
    scarpContainer.append(picture);
  } else {
    // Fallback if img element is not directly found, look for an anchor containing an image
    const anchor = block.querySelector('a[data-aue-prop="image"]');
    if (anchor) {
      const imgInAnchor = anchor.querySelector('img');
      if (imgInAnchor) {
        const picture = createOptimizedPicture(imgInAnchor.src, imgInAnchor.alt);
        moveInstrumentation(imgInAnchor, picture.querySelector('img'));
        scarpContainer.append(picture);
      } else {
        // If the anchor itself is the image source (e.g., a direct link to an image)
        const img = document.createElement('img');
        img.src = anchor.href;
        img.alt = ''; // Or extract from anchor title if available
        const picture = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(anchor, picture.querySelector('img')); // Move instrumentation from anchor to img
        scarpContainer.append(picture);
      }
    }
  }

  block.innerHTML = '';
  block.classList.add('scarp-component', 'fade-in');
  block.setAttribute('data-fade-in', '');
  block.append(scarpContainer);
}
