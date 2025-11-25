import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const imageEl = block.querySelector('div:nth-child(1) > div');
  const titleEl = block.querySelector('div:nth-child(2) > div');
  const descriptionEl = block.querySelector('div:nth-child(3) > div');
  const ctaLabelEl = block.querySelector('div:nth-child(4) > div');
  const ctaUrlEl = block.querySelector('div:nth-child(5) > div');

  const section = document.createElement('section');
  section.className = 'text-and-media-section';

  // Scarp image (if present)
  const originalScarpImg = block.querySelector('img.text-and-media-scarp');
  if (originalScarpImg) {
    const scarpPic = createOptimizedPicture(originalScarpImg.src, originalScarpImg.alt);
    const scarpImg = scarpPic.querySelector('img');
    scarpImg.className = 'text-and-media-scarp fade-in';
    scarpImg.setAttribute('data-fade-in', '');
    if (originalScarpImg.hasAttribute('loading')) scarpImg.setAttribute('loading', originalScarpImg.getAttribute('loading'));
    if (originalScarpImg.hasAttribute('aria-label')) scarpImg.setAttribute('aria-label', originalScarpImg.getAttribute('aria-label'));
    if (originalScarpImg.hasAttribute('is-animated')) scarpImg.setAttribute('is-animated', originalScarpImg.getAttribute('is-animated'));
    if (originalScarpImg.hasAttribute('data-is-reverse')) scarpImg.setAttribute('data-is-reverse', originalScarpImg.getAttribute('data-is-reverse'));
    moveInstrumentation(originalScarpImg, scarpImg);
    section.append(scarpPic);
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

  const picture = document.createElement('picture');
  picture.className = 'text-and-media-image-container-picture';

  const img = imageEl.querySelector('img');
  if (img) {
    const optimizedPic = createOptimizedPicture(img.src, img.alt);
    const optimizedImg = optimizedPic.querySelector('img');

    // Transfer attributes from original img to optimized img
    optimizedImg.className = 'text-and-media-image-container-image layout-portrait animate-image-zoom-out in-viewport';
    if (img.hasAttribute('loading')) optimizedImg.setAttribute('loading', img.getAttribute('loading'));
    if (img.hasAttribute('role')) optimizedImg.setAttribute('role', img.getAttribute('role'));

    // Transfer source elements
    const sources = imageEl.querySelectorAll('source');
    sources.forEach((source) => picture.append(source.cloneNode(true)));

    picture.append(optimizedImg);
    moveInstrumentation(img, optimizedImg);
  }
  imageContainer.append(picture);
  textAndMediaComponent.append(imageContainer);

  const contentDiv = document.createElement('div');
  contentDiv.className = 'text-and-media-content in-viewport';

  const slideWrap = document.createElement('div');
  slideWrap.className = 'slide-wrap';

  const slideUpDiv = document.createElement('div');
  slideUpDiv.setAttribute('data-slide-type', 'slide-up');
  slideUpDiv.className = 'slide-up';

  if (titleEl && titleEl.textContent.trim()) {
    const titleDiv = document.createElement('div');
    titleDiv.id = 'text-and-media-title';
    titleDiv.className = 'text-and-media-content-title';
    titleDiv.setAttribute('tabindex', '0');
    titleDiv.innerHTML = titleEl.innerHTML;
    moveInstrumentation(titleEl, titleDiv);
    slideUpDiv.append(titleDiv);
  }

  if (descriptionEl && descriptionEl.textContent.trim()) {
    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'text-and-media-content-description';
    descriptionDiv.setAttribute('tabindex', '0');
    descriptionDiv.innerHTML = descriptionEl.innerHTML;
    moveInstrumentation(descriptionEl, descriptionDiv);
    slideUpDiv.append(descriptionDiv);
  }

  if (ctaLabelEl && ctaLabelEl.textContent.trim() && ctaUrlEl && ctaUrlEl.textContent.trim()) {
    const ctaLink = document.createElement('a');
    ctaLink.href = ctaUrlEl.textContent.trim();
    ctaLink.className = 'text-and-media-cta cta__primary text-and-media-content-cta ';
    ctaLink.target = '_self';
    ctaLink.setAttribute('aria-label', ctaLabelEl.textContent.trim());

    const iconSpan = document.createElement('span');
    iconSpan.className = 'text-and-media-cta-icon qd-icon qd-icon--cheveron-right';
    iconSpan.setAttribute('aria-hidden', 'true');
    ctaLink.append(iconSpan);

    const labelSpan = document.createElement('span');
    labelSpan.className = 'text-and-media-cta-label';
    labelSpan.textContent = ctaLabelEl.textContent.trim();
    ctaLink.append(labelSpan);

    moveInstrumentation(ctaLabelEl, ctaLink);
    moveInstrumentation(ctaUrlEl, ctaLink);
    slideUpDiv.append(ctaLink);
  }

  slideWrap.append(slideUpDiv);
  contentDiv.append(slideWrap);
  textAndMediaComponent.append(contentDiv);

  const overflowFixDiv = document.createElement('div');
  overflowFixDiv.className = 'text-and-media-overflow-fix';
  textAndMediaComponent.append(overflowFixDiv);

  section.append(textAndMediaComponent);

  block.textContent = '';
  block.append(section);
}
