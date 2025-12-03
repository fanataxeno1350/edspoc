import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const imageElement = block.querySelector('div[data-aue-prop="image"]');
  let img = null;

  if (imageElement) {
    img = imageElement.querySelector('img');
    if (!img) {
      const anchor = imageElement.querySelector('a');
      if (anchor && (anchor.href.endsWith('.svg') || anchor.href.endsWith('.png') || anchor.href.endsWith('.jpg') || anchor.href.endsWith('.jpeg') || anchor.href.endsWith('.gif')))
        img = document.createElement('img');
        img.src = anchor.href;
        img.alt = anchor.title || '';
        moveInstrumentation(anchor, img);
    }
  }

  block.innerHTML = '';
  block.className = 'back-to-top-container';
  block.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (img) {
    const picture = createOptimizedPicture(img.src, img.alt);
    moveInstrumentation(img, picture.querySelector('img'));
    block.append(picture);
  }
}
