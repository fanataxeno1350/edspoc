import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const container = document.createElement('div');
  container.className = 'back-to-top-container';
  container.onclick = goToTop;

  const imageWrapper = block.querySelector('[data-aue-prop="image"]');
  if (imageWrapper) {
    let img = imageWrapper.querySelector('img');
    if (!img) {
      const anchor = imageWrapper.querySelector('a');
      if (anchor && anchor.href) {
        img = document.createElement('img');
        img.src = anchor.href;
        img.alt = anchor.title || '';
      }
    }

    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, pic.querySelector('img'));
      container.append(pic);
      moveInstrumentation(imageWrapper, pic);
    }
  }

  block.innerHTML = '';
  block.append(container);
}
