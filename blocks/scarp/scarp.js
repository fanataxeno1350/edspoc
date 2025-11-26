import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const scarpComponent = document.createElement('div');
  scarpComponent.className = 'scarp-component fade-in';
  scarpComponent.setAttribute('data-fade-in', '');

  const scarpContainer = document.createElement('div');
  scarpContainer.className = 'scarp-container';

  const authoredImage = block.querySelector('[data-aue-prop="image"] img');
  if (authoredImage) {
    const pic = createOptimizedPicture(authoredImage.src, authoredImage.alt);
    const img = pic.querySelector('img');
    img.setAttribute('aria-hidden', 'true');
    img.className = 'scarp-separator-scarp green-scarp';
    scarpContainer.append(pic);
    moveInstrumentation(authoredImage, img);
  }

  scarpComponent.append(scarpContainer);

  block.textContent = '';
  block.append(scarpComponent);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
