import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = Array.from(block.querySelectorAll(':scope > div'));

  const section = document.createElement('section');
  section.classList.add('text-and-media-section');

  const imageDiv = children[0];
  const image = imageDiv.querySelector('picture img');
  if (image) {
    const scarpImg = createOptimizedPicture(image.src, image.alt);
    scarpImg.classList.add('text-and-media-scarp', 'fade-in');
    scarpImg.setAttribute('data-fade-in', '');
    scarpImg.setAttribute('loading', 'lazy');
    scarpImg.setAttribute('aria-label', image.alt);
    scarpImg.setAttribute('is-animated', 'true');
    scarpImg.setAttribute('data-is-reverse', 'true');
    moveInstrumentation(image, scarpImg);
    section.append(scarpImg);
  }

  const textAndMediaComponent = document.createElement('div');
  textAndMediaComponent.classList.add('text-and-media-component');
  textAndMediaComponent.setAttribute('data-cmp-is', 'text-and-media');
  textAndMediaComponent.setAttribute('aria-labelledby', 'text-and-media-title');
  textAndMediaComponent.style.overflow = 'hidden';
  textAndMediaComponent.setAttribute('is-animated', 'true');
  textAndMediaComponent.setAttribute('data-is-reverse', 'true');

  const textAndMediaImageContainer = document.createElement('div');
  textAndMediaImageContainer.classList.add('text-and-media-image-container', 'animate-image-container-up-fade', 'in-viewport', 'slide-up');
  textAndMediaImageContainer.setAttribute('data-slide-type', 'slide-up');
  textAndMediaImageContainer.setAttribute('data-slide-no-wrap', '');

  const picture = document.createElement('picture');
  picture.classList.add('text-and-media-image-container-picture');
  if (image) {
    const optimizedPicture = createOptimizedPicture(image.src, image.alt);
    const imgElement = optimizedPicture.querySelector('img');
    imgElement.classList.add('text-and-media-image-container-image', 'layout-portrait', 'animate-image-zoom-out', 'in-viewport');
    imgElement.setAttribute('role', 'img');
    moveInstrumentation(image, imgElement);
    picture.innerHTML = optimizedPicture.innerHTML;
  }
  textAndMediaImageContainer.append(picture);
  textAndMediaComponent.append(textAndMediaImageContainer);

  const textAndMediaContent = document.createElement('div');
  textAndMediaContent.classList.add('text-and-media-content', 'in-viewport');

  const slideWrap = document.createElement('div');
  slideWrap.classList.add('slide-wrap');

  const slideUpDiv = document.createElement('div');
  slideUpDiv.setAttribute('data-slide-type', 'slide-up');
  slideUpDiv.classList.add('slide-up');

  const titleDiv = children[1];
  const titleContent = titleDiv.querySelector('div');
  if (titleContent) {
    const titleElement = document.createElement('div');
    titleElement.id = 'text-and-media-title';
    titleElement.classList.add('text-and-media-content-title');
    titleElement.setAttribute('tabindex', '0');
    titleElement.innerHTML = titleContent.innerHTML;
    slideUpDiv.append(titleElement);
  }

  const descriptionDiv = children[2];
  const descriptionContent = descriptionDiv.querySelector('div');
  if (descriptionContent) {
    const descriptionElement = document.createElement('div');
    descriptionElement.classList.add('text-and-media-content-description');
    descriptionElement.setAttribute('tabindex', '0');
    descriptionElement.innerHTML = descriptionContent.innerHTML;
    slideUpDiv.append(descriptionElement);
  }

  const ctaDiv = children[3];
  const ctaLink = ctaDiv.querySelector('a');
  if (ctaLink) {
    const ctaElement = document.createElement('a');
    ctaElement.href = ctaLink.href;
    ctaElement.classList.add('text-and-media-cta', 'cta__primary', 'text-and-media-content-cta');
    ctaElement.setAttribute('target', '_self');
    ctaElement.setAttribute('aria-label', ctaLink.textContent.trim());
    
    const ctaIcon = document.createElement('span');
    ctaIcon.classList.add('text-and-media-cta-icon', 'qd-icon', 'qd-icon--cheveron-right');
    ctaIcon.setAttribute('aria-hidden', 'true');
    ctaElement.append(ctaIcon);

    const ctaLabel = document.createElement('span');
    ctaLabel.classList.add('text-and-media-cta-label');
    ctaLabel.textContent = ctaLink.textContent.trim();
    ctaElement.append(ctaLabel);

    slideUpDiv.append(ctaElement);
  }

  slideWrap.append(slideUpDiv);
  textAndMediaContent.append(slideWrap);
  textAndMediaComponent.append(textAndMediaContent);

  const overflowFix = document.createElement('div');
  overflowFix.classList.add('text-and-media-overflow-fix');
  textAndMediaComponent.append(overflowFix);

  section.append(textAndMediaComponent);

  block.textContent = '';
  block.append(section);
}