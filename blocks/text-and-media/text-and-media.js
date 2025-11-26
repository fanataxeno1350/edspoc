import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const image = block.querySelector('[data-aue-prop="image"]');
  const title = block.querySelector('[data-aue-prop="title"]');
  const description = block.querySelector('[data-aue-prop="description"]');
  const ctaLabel = block.querySelector('[data-aue-prop="ctaLabel"]');
  const ctaUrl = block.querySelector('[data-aue-prop="ctaUrl"]');

  const section = document.createElement('section');
  section.className = 'text-and-media-section';

  if (image) {
    const scarpImg = document.createElement('img');
    scarpImg.className = 'text-and-media-scarp fade-in';
    scarpImg.setAttribute('data-fade-in', '');
    scarpImg.setAttribute('is-animated', 'true');
    scarpImg.setAttribute('data-is-reverse', 'true');
    scarpImg.setAttribute('loading', 'lazy');
    scarpImg.src = image.src;
    scarpImg.alt = image.alt;
    scarpImg.setAttribute('aria-label', image.alt);
    moveInstrumentation(image, scarpImg);
    section.append(scarpImg);
  }

  const textAndMediaComponent = document.createElement('div');
  textAndMediaComponent.className = 'text-and-media-component';
  textAndMediaComponent.setAttribute('data-cmp-is', 'text-and-media');
  textAndMediaComponent.setAttribute('aria-labelledby', 'text-and-media-title');
  textAndMediaComponent.style.overflow = 'hidden';
  textAndMediaComponent.setAttribute('is-animated', 'true');
  textAndMediaComponent.setAttribute('data-is-reverse', 'true');

  const imageContainer = document.createElement('div');
  imageContainer.className = 'text-and-media-image-container animate-image-container-up-fade in-viewport slide-up';
  imageContainer.setAttribute('data-slide-type', 'slide-up');
  imageContainer.setAttribute('data-slide-no-wrap', '');

  if (image) {
    const picture = createOptimizedPicture(image.src, image.alt);
    picture.className = 'text-and-media-image-container-picture';
    const imgElement = picture.querySelector('img');
    imgElement.className = 'text-and-media-image-container-image layout-portrait animate-image-zoom-out in-viewport';
    imgElement.setAttribute('role', 'img');
    moveInstrumentation(image, imgElement);
    imageContainer.append(picture);
  }

  textAndMediaComponent.append(imageContainer);

  const contentDiv = document.createElement('div');
  contentDiv.className = 'text-and-media-content in-viewport';

  const slideWrap = document.createElement('div');
  slideWrap.className = 'slide-wrap';
  const slideUpDiv = document.createElement('div');
  slideUpDiv.setAttribute('data-slide-type', 'slide-up');
  slideUpDiv.className = 'slide-up';

  if (title) {
    const titleDiv = document.createElement('div');
    titleDiv.id = 'text-and-media-title';
    titleDiv.className = 'text-and-media-content-title';
    titleDiv.setAttribute('tabindex', '0');
    titleDiv.append(...title.children);
    moveInstrumentation(title, titleDiv);
    slideUpDiv.append(titleDiv);
  }

  if (description) {
    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'text-and-media-content-description';
    descriptionDiv.setAttribute('tabindex', '0');
    descriptionDiv.append(...description.children);
    moveInstrumentation(description, descriptionDiv);
    slideUpDiv.append(descriptionDiv);
  }

  if (ctaLabel && ctaUrl) {
    const ctaLink = document.createElement('a');
    ctaLink.href = ctaUrl.textContent;
    ctaLink.className = 'text-and-media-cta cta__primary text-and-media-content-cta ';
    ctaLink.setAttribute('target', '_self');
    ctaLink.setAttribute('aria-label', ctaLabel.textContent);

    const iconSpan = document.createElement('span');
    iconSpan.className = 'text-and-media-cta-icon qd-icon qd-icon--cheveron-right';
    iconSpan.setAttribute('aria-hidden', 'true');
    ctaLink.append(iconSpan);

    const labelSpan = document.createElement('span');
    labelSpan.className = 'text-and-media-cta-label';
    labelSpan.textContent = ctaLabel.textContent;
    ctaLink.append(labelSpan);

    moveInstrumentation(ctaLabel, labelSpan);
    moveInstrumentation(ctaUrl, ctaLink);
    slideUpDiv.append(ctaLink);
  }

  slideWrap.append(slideUpDiv);
  contentDiv.append(slideWrap);
  textAndMediaComponent.append(contentDiv);

  const overflowFix = document.createElement('div');
  overflowFix.className = 'text-and-media-overflow-fix';
  textAndMediaComponent.append(overflowFix);

  section.append(textAndMediaComponent);

  block.textContent = '';
  block.append(section);

  const blockName = block.dataset.blockName;
  block.className = `${blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
