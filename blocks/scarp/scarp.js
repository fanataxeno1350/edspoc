import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const scarpComponent = document.createElement('div');
  moveInstrumentation(block, scarpComponent);
  scarpComponent.className = 'scarp-component fade-in';
  scarpComponent.setAttribute('data-fade-in', '');

  const scarpContainer = document.createElement('div');
  scarpContainer.className = 'scarp-container';

  // Assuming the block will have one row with one cell containing the image
  const row = block.children[0];
  if (row) {
    const cell = row.children[0];
    if (cell) {
      const img = cell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        const newImg = optimizedPic.querySelector('img');
        moveInstrumentation(img, newImg);
        newImg.setAttribute('aria-hidden', 'true');
        newImg.className = 'scarp-separator-scarp green-scarp'; // Assuming these classes are static or derived from the image itself
        scarpContainer.append(optimizedPic);
      }
    }
  }

  scarpComponent.append(scarpContainer);

  block.textContent = '';
  block.append(scarpComponent);
}
