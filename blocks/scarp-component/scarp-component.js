import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const scarpComponentDiv = document.createElement('div');
  scarpComponentDiv.className = 'scarp-component fade-in';
  scarpComponentDiv.dataset.fadeIn = '';

  const scarpContainerDiv = document.createElement('div');
  scarpContainerDiv.className = 'scarp-container';
  scarpComponentDiv.append(scarpContainerDiv);

  const img = block.querySelector('img[data-aue-prop="image"]');
  if (img) {
    const pic = createOptimizedPicture(img.src, img.alt);
    const newImg = pic.querySelector('img');
    newImg.className = 'scarp-separator-scarp green-scarp ';
    newImg.setAttribute('aria-hidden', 'true');
    moveInstrumentation(img, newImg);
    scarpContainerDiv.append(pic);
  }

  block.textContent = '';
  block.append(scarpComponentDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
