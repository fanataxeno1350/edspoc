import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const scarpContainer = document.createElement('div');
  scarpContainer.className = 'scarp-container';

  const imageElement = block.querySelector(':scope > div:first-child img');
  if (imageElement) {
    const pic = createOptimizedPicture(imageElement.src, imageElement.alt);
    const newImg = pic.querySelector('img');
    newImg.className = imageElement.className;
    if (imageElement.getAttribute('aria-hidden')) {
      newImg.setAttribute('aria-hidden', imageElement.getAttribute('aria-hidden'));
    }
    moveInstrumentation(imageElement, newImg);
    scarpContainer.append(pic);
  }

  block.textContent = '';
  block.append(scarpContainer);

  if (block.dataset.fadeIn !== undefined) {
    block.classList.add('fade-in');
  }
}
