import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const scarpComponent = block.querySelector(':scope > div');

  if (scarpComponent) {
    const imageElement = scarpComponent.querySelector('div:first-child');
    const img = imageElement ? imageElement.querySelector('img') : null;

    const scarpComponentDiv = document.createElement('div');
    scarpComponentDiv.classList.add('scarp-component', 'fade-in');
    scarpComponentDiv.setAttribute('data-fade-in', '');

    const scarpContainerDiv = document.createElement('div');
    scarpContainerDiv.classList.add('scarp-container');

    if (img) {
      const optimizedPicture = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, optimizedPicture);
      const optimizedImg = optimizedPicture.querySelector('img');
      if (optimizedImg) {
        optimizedImg.setAttribute('aria-hidden', 'true');
        optimizedImg.classList.add('scarp-separator-scarp', 'green-scarp');
      }
      scarpContainerDiv.append(optimizedPicture);
    }

    scarpComponentDiv.append(scarpContainerDiv);

    block.textContent = '';
    block.append(scarpComponentDiv);
  }
}
