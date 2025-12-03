import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const container = document.createElement('div');
  container.className = 'back-to-top-container';
  container.onclick = goToTop;
  moveInstrumentation(block, container);

  let imageElement = block.querySelector('[data-aue-prop="image"]');

  if (!imageElement) {
    const anchor = block.querySelector('a[href$=".svg"], a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".gif"]');
    if (anchor) {
      imageElement = document.createElement('img');
      imageElement.src = anchor.href;
      imageElement.alt = anchor.title || '';
      moveInstrumentation(anchor, imageElement);
    }
  }

  if (imageElement) {
    const picture = createOptimizedPicture(imageElement.src, imageElement.alt);
    moveInstrumentation(imageElement, picture.querySelector('img'));
    container.append(picture);
  }

  block.innerHTML = '';
  block.append(container);
}
