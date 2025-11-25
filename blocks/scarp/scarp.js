import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const scarpContainer = document.createElement('div');
  scarpContainer.classList.add('scarp-container');

  // Assuming the block has only one child row containing the image
  if (block.children.length > 0) {
    const row = block.children[0];
    moveInstrumentation(row, scarpContainer);

    // Assuming the image is in the first cell of the row
    if (row.children.length > 0) {
      const cell = row.children[0];
      const img = cell.querySelector('img');

      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        // Transfer instrumentation from the original img to the new img within optimizedPic
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        
        const newImg = optimizedPic.querySelector('img');
        newImg.classList.add('scarp-separator-scarp');
        // Extract class from original img if available, or set default
        if (img.classList.contains('green-scarp')) {
          newImg.classList.add('green-scarp');
        }
        newImg.setAttribute('aria-hidden', 'true');

        scarpContainer.append(optimizedPic);
      }
    }
  }

  block.textContent = '';
  block.classList.add('fade-in');
  block.setAttribute('data-fade-in', '');
  block.append(scarpContainer);
}
