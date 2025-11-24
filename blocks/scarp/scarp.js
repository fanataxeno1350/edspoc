import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const scarpComponent = document.createElement('div');
  scarpComponent.className = 'scarp-component fade-in';
  scarpComponent.setAttribute('data-fade-in', '');
  moveInstrumentation(block, scarpComponent);

  const scarpContainer = document.createElement('div');
  scarpContainer.className = 'scarp-container';

  const imageElement = block.querySelector(':scope > div:first-child > div:first-child img');
  if (imageElement) {
    const picture = createOptimizedPicture(imageElement.src, imageElement.alt);
    const newImg = picture.querySelector('img');
    newImg.setAttribute('aria-hidden', 'true');
    newImg.className = 'scarp-separator-scarp green-scarp ';
    moveInstrumentation(imageElement, newImg);
    scarpContainer.append(picture);
  }

  scarpComponent.append(scarpContainer);

  block.textContent = '';
  block.append(scarpComponent);
}
