import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const scarpComponentDiv = document.createElement('div');
  scarpComponentDiv.className = 'scarp-component fade-in';
  scarpComponentDiv.dataset.fadeIn = '';

  const scarpContainerDiv = document.createElement('div');
  scarpContainerDiv.className = 'scarp-container';

  const imgElement = block.querySelector('[data-aue-prop="image"]');
  if (imgElement) {
    const pic = createOptimizedPicture(imgElement.src, imgElement.alt);
    const img = pic.querySelector('img');
    img.setAttribute('aria-hidden', 'true');
    img.className = 'scarp-separator-scarp green-scarp'; // Assuming 'green-scarp' is a static class from expected HTML
    moveInstrumentation(imgElement, img);
    scarpContainerDiv.append(pic);
  }

  scarpComponentDiv.append(scarpContainerDiv);

  block.textContent = '';
  block.append(scarpComponentDiv);

  const blockName = block.dataset.blockName;
  block.className = `${blockName} block`;
  block.dataset.blockStatus = "loaded";
}
