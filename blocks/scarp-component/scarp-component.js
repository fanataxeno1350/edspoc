import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const scarpContainer = document.createElement('div');
  scarpContainer.classList.add('scarp-container');

  const imageWrapper = block.querySelector('div[data-aue-prop="image"]');
  if (imageWrapper) {
    const img = imageWrapper.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt || '');
      pic.classList.add('scarp-separator__scarp', 'green-scarp');
      pic.setAttribute('aria-hidden', 'true');
      moveInstrumentation(img, pic.querySelector('img'));
      scarpContainer.append(pic);
    }
    moveInstrumentation(imageWrapper, scarpContainer);
  }

  block.innerHTML = '';
  block.classList.add('scarp-component', 'fade-in');
  block.setAttribute('data-fade-in', '');
  block.append(scarpContainer);
}
