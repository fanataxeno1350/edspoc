import { createOptimizedPicture } from '../../../scripts/aem.js';
import { moveInstrumentation } from '../../../scripts/scripts.js';

export default function decorate(block) {
  const scarpComponent = document.createElement('div');
  moveInstrumentation(block, scarpComponent);
  scarpComponent.className = 'scarp-component fade-in';
  scarpComponent.setAttribute('data-fade-in', '');

  const scarpContainer = document.createElement('div');
  scarpContainer.className = 'scarp-container';

  [...block.children].forEach((row) => {
    const cell = row.firstElementChild;
    if (cell) {
      const img = cell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        const newImg = optimizedPic.querySelector('img');
        moveInstrumentation(img, newImg);
        newImg.setAttribute('aria-hidden', 'true');
        newImg.classList.add('scarp-separator-scarp', 'green-scarp');
        scarpContainer.append(newImg);
      }
    }
  });

  scarpComponent.append(scarpContainer);
  block.textContent = '';
  block.append(scarpComponent);
}
