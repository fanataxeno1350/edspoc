import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const imageCell = block.querySelector(':scope > div > div');
  if (!imageCell) {
    block.textContent = '';
    return;
  }

  const img = imageCell.querySelector('img');
  if (!img) {
    block.textContent = '';
    return;
  }

  const scarpComponentDiv = document.createElement('div');
  scarpComponentDiv.className = 'scarp-component fade-in';
  scarpComponentDiv.setAttribute('data-fade-in', '');
  moveInstrumentation(block, scarpComponentDiv);

  const scarpContainerDiv = document.createElement('div');
  scarpContainerDiv.className = 'scarp-container';

  const pic = createOptimizedPicture(img.src, img.alt);
  const newImg = pic.querySelector('img');
  newImg.setAttribute('aria-hidden', 'true');
  newImg.className = 'scarp-separator-scarp green-scarp ';
  moveInstrumentation(img, newImg);

  scarpContainerDiv.append(pic);
  scarpComponentDiv.append(scarpContainerDiv);

  block.textContent = '';
  block.append(scarpComponentDiv);
}
