import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const scarpComponentContainer = document.createElement('div');
  scarpComponentContainer.classList.add('scarp-component-container');

  [...block.children].forEach((row) => {
    moveInstrumentation(row, scarpComponentContainer);
    [...row.children].forEach((cell) => {
      const img = cell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('scarp-component-separator__scarp', 'scarp-component-green-scarp');
        optimizedPic.querySelector('img').setAttribute('aria-hidden', 'true');
        scarpComponentContainer.append(optimizedPic);
      }
    });
  });

  block.textContent = '';
  block.classList.add('fade-in');
  block.setAttribute('data-fade-in', '');
  block.append(scarpComponentContainer);
}
