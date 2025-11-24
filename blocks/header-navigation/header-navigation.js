import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const originalImgs = [...block.querySelectorAll('img')];
  const clone = block.cloneNode(true);
  const clonedImgs = [...clone.querySelectorAll('img')];

  const canMapByIndex = originalImgs.length === clonedImgs.length;

  clonedImgs.forEach((clonedImg, i) => {
    let originalImg = null;

    if (canMapByIndex) {
      originalImg = originalImgs[i];
    } else {
      originalImg = originalImgs.find((oi) =>
        oi?.src === clonedImg.src
      );
    }

    if (!originalImg) return;
    if (originalImg.src !== clonedImg.src) return;

    const alt = clonedImg.alt || '';
    const pic = createOptimizedPicture(clonedImg.src, alt);
    const newImg = pic.querySelector('img');
    if (!newImg) return;

    const pictureWrapper = clonedImg.closest('picture');
    if (pictureWrapper) {
      pictureWrapper.replaceWith(pic);
    } else {
      clonedImg.replaceWith(pic);
    }

    try {
      moveInstrumentation(originalImg, newImg);
    } catch (e) {
      console.warn('Instrumentation transfer failed:', e);
    }
  });

  block.textContent = '';
  [...clone.childNodes].forEach((n) => block.appendChild(n));
}
