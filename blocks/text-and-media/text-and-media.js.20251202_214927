import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const textAndMediaComponent = document.createElement('div');
  textAndMediaComponent.classList.add('text-and-media-component');

  const imageContainer = document.createElement('div');
  imageContainer.classList.add('text-and-media-image-container');
  textAndMediaComponent.append(imageContainer);

  const picture = document.createElement('picture');
  picture.classList.add('text-and-media-image-container-picture');
  imageContainer.append(picture);

  const image = block.querySelector('[data-aue-prop="image"]');
  if (image) {
    const optimizedPicture = createOptimizedPicture(image.src, image.alt);
    picture.append(...optimizedPicture.children);
    moveInstrumentation(image, picture.querySelector('img'));
  }

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('text-and-media-content');
  textAndMediaComponent.append(contentDiv);

  const title = block.querySelector('[data-aue-prop="title"]');
  if (title) {
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('text-and-media-content-title');
    titleDiv.id = 'text-and-media-title';
    titleDiv.tabIndex = 0;
    titleDiv.append(...title.childNodes);
    moveInstrumentation(title, titleDiv);
    contentDiv.append(titleDiv);
  }

  const description = block.querySelector('[data-aue-prop="description"]');
  if (description) {
    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('text-and-media-content-description');
    descriptionDiv.tabIndex = 0;
    descriptionDiv.append(...description.childNodes);
    moveInstrumentation(description, descriptionDiv);
    contentDiv.append(descriptionDiv);
  }

  const cta = block.querySelector('[data-aue-prop="cta"]');
  if (cta) {
    const ctaLink = document.createElement('a');
    ctaLink.classList.add('text-and-media-cta', 'cta__primary', 'text-and-media-content-cta');
    ctaLink.href = cta.href;
    ctaLink.target = cta.target;
    ctaLink.setAttribute('aria-label', cta.textContent);

    const ctaIcon = document.createElement('span');
    ctaIcon.classList.add('text-and-media-cta-icon', 'qd-icon', 'qd-icon--cheveron-right');
    ctaIcon.setAttribute('aria-hidden', 'true');
    ctaLink.append(ctaIcon);

    const ctaLabel = document.createElement('span');
    ctaLabel.classList.add('text-and-media-cta-label');
    ctaLabel.textContent = cta.textContent;
    ctaLink.append(ctaLabel);

    moveInstrumentation(cta, ctaLink);
    contentDiv.append(ctaLink);
  }

  block.innerHTML = '';
  block.append(textAndMediaComponent);
}
