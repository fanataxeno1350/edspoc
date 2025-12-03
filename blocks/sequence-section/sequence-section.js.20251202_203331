import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('sequence-section', 'sequence-homeSlot');

  const canvas = document.createElement('canvas');
  canvas.classList.add('sequence-frameSequence');
  canvas.setAttribute('height', '10800');
  canvas.setAttribute('width', '1920');
  mainDiv.append(canvas);

  const storyDiv = document.createElement('div');
  storyDiv.classList.add('sequence-storyT');
  const h2 = document.createElement('h2');
  storyDiv.append(h2);

  const headlineContent = block.querySelector('[data-aue-prop="headline"]');
  if (headlineContent) {
    const headlineSpans = headlineContent.querySelectorAll('span');
    headlineSpans.forEach((span) => {
      const newSpan = document.createElement('span');
      newSpan.classList.add('sequence-span-tag');
      if (span.classList.contains('sequence-extra_s')) {
        newSpan.classList.add('sequence-extra_s');
      }

      const img = span.querySelector('img');
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt);
        newSpan.append(pic);
        moveInstrumentation(img, pic.querySelector('img'));
      }
      newSpan.append(...span.childNodes);
      moveInstrumentation(span, newSpan);
      h2.append(newSpan);
    });
  } else {
    // Fallback if data-aue-prop is not found, try to find existing h2 content
    const existingH2 = block.querySelector('h2');
    if (existingH2) {
      h2.append(...existingH2.childNodes);
      moveInstrumentation(existingH2, h2);
    }
  }

  mainDiv.append(storyDiv);

  const afterLayerBottomDiv = document.createElement('div');
  afterLayerBottomDiv.classList.add('sequence-afterLayerBottom');

  const bottomImage = block.querySelector('[data-aue-prop="bottomImage"]');
  if (bottomImage) {
    let imgElement = bottomImage.querySelector('img');
    if (!imgElement) {
      const anchor = bottomImage.querySelector('a');
      if (anchor && anchor.href) {
        imgElement = document.createElement('img');
        imgElement.src = anchor.href;
        imgElement.alt = anchor.title || '';
      }
    }
    if (imgElement) {
      const pic = createOptimizedPicture(imgElement.src, imgElement.alt);
      afterLayerBottomDiv.append(pic);
      moveInstrumentation(imgElement, pic.querySelector('img'));
    }
  }
  mainDiv.append(afterLayerBottomDiv);

  block.innerHTML = '';
  block.append(mainDiv);
}