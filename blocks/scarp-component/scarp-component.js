import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const imageCell = block.querySelector('div:first-child');

  const scarpComponentDiv = document.createElement('div');
  scarpComponentDiv.className = 'scarp-component fade-in';
  scarpComponentDiv.setAttribute('data-fade-in', '');

  const scarpContainerDiv = document.createElement('div');
  scarpContainerDiv.className = 'scarp-container';

  if (imageCell) {
    const img = imageCell.querySelector('img');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt);
      const newImg = picture.querySelector('img');
      if (newImg) {
        newImg.setAttribute('aria-hidden', 'true');
        newImg.className = 'scarp-separator-scarp green-scarp ';
        moveInstrumentation(img, newImg);
      }
      scarpContainerDiv.append(picture);
    }
  }

  scarpComponentDiv.append(scarpContainerDiv);

  block.textContent = '';
  block.append(scarpComponentDiv);
}
