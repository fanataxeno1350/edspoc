import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const scarpComponent = document.createElement('div');
  moveInstrumentation(block, scarpComponent);
  scarpComponent.className = 'scarp-component fade-in';
  scarpComponent.setAttribute('data-fade-in', '');

  const scarpContainer = document.createElement('div');
  scarpContainer.className = 'scarp-container';

  [...block.children].forEach((row) => {
    const cell = row.children[0]; // Assuming image is in the first cell of the row
    const img = cell.querySelector('img');

    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt);
      const newImg = optimizedPic.querySelector('img');
      moveInstrumentation(img, newImg);
      newImg.className = 'scarp-separator-scarp green-scarp';
      newImg.setAttribute('aria-hidden', 'true');
      scarpContainer.append(optimizedPic);
    }
  });

  scarpComponent.append(scarpContainer);
  block.textContent = '';
  block.append(scarpComponent);
}
