import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const imageCell = block.querySelector(':scope > div > div');
  if (!imageCell) return;

  const img = imageCell.querySelector('img');
  if (!img) return;

  const scarpComponentDiv = document.createElement('div');
  scarpComponentDiv.className = 'scarp-component fade-in';
  scarpComponentDiv.setAttribute('data-fade-in', '');
  moveInstrumentation(block, scarpComponentDiv);

  const scarpContainerDiv = document.createElement('div');
  scarpContainerDiv.className = 'scarp-container';

  const pic = createOptimizedPicture(img.src, img.alt);
  const optimizedImg = pic.querySelector('img');
  optimizedImg.className = 'scarp-separator-scarp green-scarp ';
  optimizedImg.setAttribute('aria-hidden', 'true');
  moveInstrumentation(img, optimizedImg);

  scarpContainerDiv.append(pic);
  scarpComponentDiv.append(scarpContainerDiv);

  block.textContent = '';
  block.append(scarpComponentDiv);
}
