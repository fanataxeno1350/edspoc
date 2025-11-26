import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const scarpComponentDiv = document.createElement('div');
  scarpComponentDiv.className = 'scarp-component fade-in';
  scarpComponentDiv.setAttribute('data-fade-in', '');

  const scarpContainerDiv = document.createElement('div');
  scarpContainerDiv.className = 'scarp-container';

  const imageElement = block.querySelector('[data-aue-prop="image"]');
  if (imageElement) {
    const img = imageElement.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt || '');
      const newImg = pic.querySelector('img');
      newImg.className = 'scarp-separator-scarp green-scarp ';
      newImg.setAttribute('aria-hidden', 'true');
      moveInstrumentation(img, newImg);
      scarpContainerDiv.append(pic);
    } else {
      // If there's a data-aue-prop="image" but no actual img, append the original element
      scarpContainerDiv.append(imageElement);
    }
  } else {
    // Fallback: If no specific image field is found, try to find any img and wrap it
    const existingImg = block.querySelector('img');
    if (existingImg) {
      const pic = createOptimizedPicture(existingImg.src, existingImg.alt || '');
      const newImg = pic.querySelector('img');
      newImg.className = 'scarp-separator-scarp green-scarp ';
      newImg.setAttribute('aria-hidden', 'true');
      moveInstrumentation(existingImg, newImg);
      scarpContainerDiv.append(pic);
    }
  }

  scarpComponentDiv.append(scarpContainerDiv);

  block.textContent = '';
  block.append(scarpComponentDiv);

  const blockName = block.dataset.blockName;
  block.className = `${blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
