import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const scarpContainer = document.createElement('div');
  scarpContainer.classList.add('scarp-container');

  const imageElement = block.querySelector(':scope > div:first-child > div:first-child');
  if (imageElement) {
    const img = imageElement.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt);
      pic.classList.add('scarp-separator-scarp', 'green-scarp');
      pic.querySelector('img').setAttribute('aria-hidden', 'true');
      moveInstrumentation(img, pic.querySelector('img'));
      scarpContainer.append(pic);
    }
  }

  block.textContent = '';
  block.append(scarpContainer);
}