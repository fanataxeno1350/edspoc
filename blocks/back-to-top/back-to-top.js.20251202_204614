import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const imageElement = block.querySelector('img[data-aue-prop="image"]');

  // Create the new structure
  const backToTopDiv = document.createElement('div');
  backToTopDiv.className = 'back-to-top';
  backToTopDiv.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (imageElement) {
    const picture = createOptimizedPicture(imageElement.src, imageElement.alt);
    backToTopDiv.append(picture);
    moveInstrumentation(imageElement, picture.querySelector('img'));
  }

  // Replace the block content with the new structure
  block.innerHTML = '';
  block.append(backToTopDiv);
}
