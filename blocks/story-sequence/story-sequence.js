import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const storySequenceWrapper = document.createElement('section');
  storySequenceWrapper.classList.add('story-sequence-wrapper', 'homeSlot');
  storySequenceWrapper.style.overflow = 'hidden';

  const canvas = document.createElement('canvas');
  canvas.classList.add('story-sequence-frame');
  canvas.setAttribute('height', '10800');
  canvas.setAttribute('width', '1920');
  canvas.style.position = 'absolute';
  canvas.style.top = 'unset';
  canvas.style.bottom = '0px';
  storySequenceWrapper.append(canvas);

  const storySequenceTextContainer = document.createElement('div');
  storySequenceTextContainer.classList.add('story-sequence-text-container');

  const headingElement = document.createElement('h2');
  const headingContent = block.querySelector('[data-aue-prop="heading"]');
  if (headingContent) {
    headingElement.append(...headingContent.childNodes);
    moveInstrumentation(headingContent, headingElement);
  }

  const inlineImageElements = block.querySelectorAll('[data-aue-prop="inlineImage"]');
  inlineImageElements.forEach((img) => {
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt);
      img.replaceWith(picture);
      moveInstrumentation(img, picture.querySelector('img'));
    }
  });

  storySequenceTextContainer.append(headingElement);
  storySequenceWrapper.append(storySequenceTextContainer);

  const storySequenceAfterLayerBottom = document.createElement('div');
  storySequenceAfterLayerBottom.classList.add('story-sequence-after-layer-bottom');

  const bottomImage = block.querySelector('[data-aue-prop="bottomImage"]');
  if (bottomImage) {
    const picture = createOptimizedPicture(bottomImage.src, bottomImage.alt);
    storySequenceAfterLayerBottom.append(picture);
    moveInstrumentation(bottomImage, picture.querySelector('img'));
  }

  storySequenceWrapper.append(storySequenceAfterLayerBottom);

  block.innerHTML = '';
  block.append(storySequenceWrapper);
}
