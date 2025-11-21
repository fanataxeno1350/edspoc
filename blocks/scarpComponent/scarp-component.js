import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const scarpComponentDiv = document.createElement('div');
  scarpComponentDiv.className = 'scarp-component fade-in';
  scarpComponentDiv.setAttribute('data-fade-in', '');

  const scarpContainerDiv = document.createElement('div');
  scarpContainerDiv.className = 'scarp-container';

  // Assuming the block has one row with one cell containing the image
  [...block.children].forEach((row) => {
    moveInstrumentation(row, scarpComponentDiv);
    [...row.children].forEach((cell) => {
      const img = cell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        optimizedPic.querySelector('img').classList.add('scarp-separator-scarp');
        // Transfer instrumentation from the original img to the optimized one
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        scarpContainerDiv.append(optimizedPic);
      }
    });
  });

  scarpComponentDiv.append(scarpContainerDiv);

  block.textContent = '';
  block.append(scarpComponentDiv);
}
