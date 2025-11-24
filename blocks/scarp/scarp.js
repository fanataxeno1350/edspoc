import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const scarpComponent = document.createElement('div');
  scarpComponent.classList.add('scarp-component', 'fade-in');
  scarpComponent.setAttribute('data-fade-in', '');

  const scarpContainer = document.createElement('div');
  scarpContainer.classList.add('scarp-container');

  // Assuming the block always has one row with one cell containing the image
  if (block.children.length > 0) {
    const row = block.children[0];
    moveInstrumentation(row, scarpComponent);

    if (row.children.length > 0) {
      const cell = row.children[0];
      const img = cell.querySelector('img');

      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        const newImg = optimizedPic.querySelector('img');
        moveInstrumentation(img, newImg);

        // Transfer existing classes and attributes from the original img
        newImg.classList.add('scarp-separator-scarp', 'green-scarp');
        newImg.setAttribute('aria-hidden', 'true');

        scarpContainer.append(optimizedPic);
      }
    }
  }

  scarpComponent.append(scarpContainer);

  block.textContent = '';
  block.append(scarpComponent);
}
