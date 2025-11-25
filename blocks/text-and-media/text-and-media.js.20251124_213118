import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const imageEl = block.querySelector('div:nth-child(1) > div');
  const titleEl = block.querySelector('div:nth-child(2) > div');
  const descriptionEl = block.querySelector('div:nth-child(3) > div');
  const ctaLabelEl = block.querySelector('div:nth-child(4) > div');
  const ctaUrlEl = block.querySelector('div:nth-child(5) > div');

  const image = imageEl ? imageEl.querySelector('img') : null;
  const title = titleEl ? titleEl.innerHTML : '';
  const description = descriptionEl ? descriptionEl.innerHTML : '';
  const ctaLabel = ctaLabelEl ? ctaLabelEl.textContent.trim() : '';
  const ctaUrl = ctaUrlEl ? ctaUrlEl.textContent.trim() : '';

  block.textContent = '';

  const section = document.createElement('section');
  section.className = 'text-and-media-section';

  if (image) {
    const scarpImg = createOptimizedPicture(image.src, image.alt);
    const scarpImgElement = scarpImg.querySelector('img');
    scarpImgElement.className = 'text-and-media-scarp fade-in';
    scarpImgElement.setAttribute('data-fade-in', '');
    scarpImgElement.setAttribute('loading', 'lazy');
    scarpImgElement.setAttribute('aria-label', image.alt);
    scarpImgElement.setAttribute('is-animated', 'true');
    scarpImgElement.setAttribute('data-is-reverse', 'true');
    moveInstrumentation(image, scarpImgElement);
    section.append(scarpImg);
  }

  const textAndMediaComponent = document.createElement('div');
  textAndMediaComponent.className = 'text-and-media-component';
  textAndMediaComponent.setAttribute('data-cmp-is', 'text-and-media');
  textAndMediaComponent.setAttribute('aria-labelledby', 'text-and-media-title');
  textAndMediaComponent.style.overflow = 'hidden';
  textAndMediaComponent.setAttribute('is-animated', 'true');
  textAndMediaComponent.setAttribute('data-is-reverse', 'true');

  const textAndMediaImageContainer = document.createElement('div');
  textAndMediaImageContainer.className = 'text-and-media-image-container animate-image-container-up-fade in-viewport slide-up';
  textAndMediaImageContainer.setAttribute('data-slide-type', 'slide-up');
  textAndMediaImageContainer.setAttribute('data-slide-no-wrap', '');

  if (image) {
    const picture = createOptimizedPicture(image.src, image.alt, false, [{ width: '500' }]);
    picture.className = 'text-and-media-image-container-picture';
    const imgElement = picture.querySelector('img');
    imgElement.className = 'text-and-media-image-container-image layout-portrait animate-image-zoom-out in-viewport';
    imgElement.setAttribute('loading', 'lazy');
    imgElement.setAttribute('role', 'img');
    moveInstrumentation(image, imgElement);
    textAndMediaImageContainer.append(picture);
  }

  textAndMediaComponent.append(textAndMediaImageContainer);

  const textAndMediaContent = document.createElement('div');
  textAndMediaContent.className = 'text-and-media-content in-viewport';

  const slideWrap = document.createElement('div');
  slideWrap.className = 'slide-wrap';

  const slideUpDiv = document.createElement('div');
  slideUpDiv.setAttribute('data-slide-type', 'slide-up');
  slideUpDiv.className = 'slide-up';

  const titleDiv = document.createElement('div');
  titleDiv.id = 'text-and-media-title';
  titleDiv.className = 'text-and-media-content-title';
  titleDiv.setAttribute('tabindex', '0');
  titleDiv.innerHTML = title;
  moveInstrumentation(titleEl, titleDiv);
  slideUpDiv.append(titleDiv);

  const descriptionDiv = document.createElement('div');
  descriptionDiv.className = 'text-and-media-content-description';
  descriptionDiv.setAttribute('tabindex', '0');
  descriptionDiv.innerHTML = description;
  moveInstrumentation(descriptionEl, descriptionDiv);
  slideUpDiv.append(descriptionDiv);

  if (ctaLabel && ctaUrl) {
    const ctaLink = document.createElement('a');
    ctaLink.href = ctaUrl;
    ctaLink.className = 'text-and-media-cta cta__primary text-and-media-content-cta ';
    ctaLink.setAttribute('target', '_self');
    ctaLink.setAttribute('aria-label', ctaLabel);
    moveInstrumentation(ctaLabelEl, ctaLink);
    moveInstrumentation(ctaUrlEl, ctaLink);

    const ctaIcon = document.createElement('span');
    ctaIcon.className = 'text-and-media-cta-icon qd-icon qd-icon--cheveron-right';
    ctaIcon.setAttribute('aria-hidden', 'true');
    ctaLink.append(ctaIcon);

    const ctaLabelSpan = document.createElement('span');
    ctaLabelSpan.className = 'text-and-media-cta-label';
    ctaLabelSpan.textContent = ctaLabel;
    ctaLink.append(ctaLabelSpan);

    slideUpDiv.append(ctaLink);
  }

  slideWrap.append(slideUpDiv);
  textAndMediaContent.append(slideWrap);
  textAndMediaComponent.append(textAndMediaContent);

  const overflowFixDiv = document.createElement('div');
  overflowFixDiv.className = 'text-and-media-overflow-fix';
  textAndMediaComponent.append(overflowFixDiv);

  section.append(textAndMediaComponent);
  block.append(section);
}
