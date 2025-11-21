import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const textAndMediaSection = document.createElement('section');
  textAndMediaSection.classList.add('text-and-media-section');
  moveInstrumentation(block, textAndMediaSection);

  const row = block.children[0];
  if (!row) return;

  const imageCell = row.children[0];
  const contentCell = row.children[1];

  // Extract image data
  const imgElement = imageCell?.querySelector('img');
  const imgSrc = imgElement?.src;
  const imgAlt = imgElement?.alt;

  // Extract content data
  const titleElement = contentCell?.querySelector('h2');
  const descriptionElement = contentCell?.querySelector('p');
  const ctaLinkElement = contentCell?.querySelector('a');

  // Create the main component div
  const textAndMediaComponent = document.createElement('div');
  textAndMediaComponent.classList.add('text-and-media-component');
  textAndMediaComponent.setAttribute('data-cmp-is', 'text-and-media');
  textAndMediaComponent.setAttribute('aria-labelledby', 'text-and-media-title');
  textAndMediaComponent.style.overflow = 'hidden';
  textAndMediaComponent.setAttribute('is-animated', 'true');
  textAndMediaComponent.setAttribute('data-is-reverse', 'true');

  // Create image container
  if (imgSrc) {
    const textAndMediaImageContainer = document.createElement('div');
    textAndMediaImageContainer.classList.add('text-and-media-image-container', 'animate-image-container-up-fade', 'in-viewport', 'slide-up');
    textAndMediaImageContainer.setAttribute('data-slide-type', 'slide-up');
    textAndMediaImageContainer.setAttribute('data-slide-no-wrap', '');

    const picture = createOptimizedPicture(imgSrc, imgAlt, false, [{ width: '500', media: '(max-width: 768px)' }]);
    picture.classList.add('text-and-media-image-container-picture');
    const pictureImg = picture.querySelector('img');
    if (pictureImg) {
      pictureImg.classList.add('text-and-media-image-container-image', 'layout-portrait', 'animate-image-zoom-out', 'in-viewport');
      pictureImg.setAttribute('role', 'img');
      moveInstrumentation(imgElement, pictureImg);
    }
    textAndMediaImageContainer.append(picture);
    textAndMediaComponent.append(textAndMediaImageContainer);
  }

  // Create content container
  const textAndMediaContent = document.createElement('div');
  textAndMediaContent.classList.add('text-and-media-content', 'in-viewport');

  const slideWrap = document.createElement('div');
  slideWrap.classList.add('slide-wrap');

  const slideUp = document.createElement('div');
  slideUp.setAttribute('data-slide-type', 'slide-up');
  slideUp.classList.add('slide-up');

  if (titleElement) {
    const titleDiv = document.createElement('div');
    titleDiv.id = 'text-and-media-title';
    titleDiv.classList.add('text-and-media-content-title');
    titleDiv.setAttribute('tabindex', '0');
    titleDiv.innerHTML = titleElement.innerHTML;
    slideUp.append(titleDiv);
  }

  if (descriptionElement) {
    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('text-and-media-content-description');
    descriptionDiv.setAttribute('tabindex', '0');
    descriptionDiv.innerHTML = descriptionElement.innerHTML;
    slideUp.append(descriptionDiv);
  }

  if (ctaLinkElement) {
    const ctaLink = document.createElement('a');
    ctaLink.href = ctaLinkElement.href;
    ctaLink.classList.add('text-and-media-cta', 'cta__primary', 'text-and-media-content-cta');
    ctaLink.target = ctaLinkElement.target;
    ctaLink.setAttribute('aria-label', ctaLinkElement.getAttribute('aria-label') || '');

    const ctaIcon = document.createElement('span');
    ctaIcon.classList.add('text-and-media-cta-icon', 'qd-icon', 'qd-icon--cheveron-right');
    ctaIcon.setAttribute('aria-hidden', 'true');
    ctaLink.append(ctaIcon);

    const ctaLabel = document.createElement('span');
    ctaLabel.classList.add('text-and-media-cta-label');
    ctaLabel.textContent = ctaLinkElement.textContent.trim();
    ctaLink.append(ctaLabel);

    slideUp.append(ctaLink);
  }

  slideWrap.append(slideUp);
  textAndMediaContent.append(slideWrap);
  textAndMediaComponent.append(textAndMediaContent);

  const overflowFix = document.createElement('div');
  overflowFix.classList.add('text-and-media-overflow-fix');
  textAndMediaComponent.append(overflowFix);

  textAndMediaSection.append(textAndMediaComponent);

  block.textContent = '';
  block.append(textAndMediaSection);
}
