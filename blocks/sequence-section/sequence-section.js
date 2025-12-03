import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const canvas = document.createElement('canvas');
  canvas.classList.add('sequence-frameSequence');
  canvas.setAttribute('height', '10800');
  canvas.setAttribute('width', '1920');

  const storyTDiv = document.createElement('div');
  storyTDiv.classList.add('sequence-storyT');
  const h2 = document.createElement('h2');

  const headlineContent = block.querySelector('[data-aue-prop="headline"]');
  if (headlineContent) {
    const spanTags = headlineContent.querySelectorAll('span');
    spanTags.forEach((span) => {
      const newSpan = document.createElement('span');
      newSpan.classList.add('sequence-span-tag');
      if (span.classList.contains('sequence-extra_s')) {
        newSpan.classList.add('sequence-extra_s');
      }
      moveInstrumentation(span, newSpan);
      h2.append(newSpan);
    });
  }

  const headlineImages = block.querySelectorAll('[data-aue-prop="headlineImages"]');
  if (headlineImages.length > 0) {
    headlineImages.forEach((imageContainer) => {
      let img = imageContainer.querySelector('img');
      if (!img) {
        const anchor = imageContainer.querySelector('a');
        if (anchor && anchor.href) {
          img = document.createElement('img');
          img.src = anchor.href;
          img.alt = anchor.title || '';
        }
      }
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, picture.querySelector('img'));
        const targetSpan = h2.querySelector(`[data-aue-label="${imageContainer.dataset.aueLabel}"]`);
        if (targetSpan) {
          targetSpan.prepend(picture);
        } else {
          // Fallback if data-aue-label doesn't match, append to the last span or h2
          const lastSpan = h2.querySelector('span:last-of-type');
          if (lastSpan) {
            lastSpan.prepend(picture);
          } else {
            h2.prepend(picture);
          }
        }
      }
    });
  }

  storyTDiv.append(h2);

  const afterLayerBottomDiv = document.createElement('div');
  afterLayerBottomDiv.classList.add('sequence-afterLayerBottom');

  const bottomImageContainer = block.querySelector('[data-aue-prop="bottomImage"]');
  if (bottomImageContainer) {
    let img = bottomImageContainer.querySelector('img');
    if (!img) {
      const anchor = bottomImageContainer.querySelector('a');
      if (anchor && anchor.href) {
        img = document.createElement('img');
        img.src = anchor.href;
        img.alt = anchor.title || '';
      }
    }
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, picture.querySelector('img'));
      afterLayerBottomDiv.append(picture);
    }
  }

  block.innerHTML = '';
  block.append(canvas, storyTDiv, afterLayerBottomDiv);
}
