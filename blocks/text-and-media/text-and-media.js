import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const textAndMediaWrapper = document.createElement('section');
  textAndMediaWrapper.classList.add('text-and-media-wrapper');
  moveInstrumentation(block, textAndMediaWrapper);

  const imageEl = block.querySelector('[data-aue-prop="image"]');
  if (imageEl) {
    const img = imageEl.querySelector('img');
    if (img) {
      const scarpImg = document.createElement('img');
      scarpImg.classList.add('text-and-media-scarp', 'fade-in');
      scarpImg.setAttribute('data-fade-in', '');
      scarpImg.setAttribute('is-animated', 'true');
      scarpImg.setAttribute('data-is-reverse', 'true');
      scarpImg.setAttribute('loading', 'lazy');
      scarpImg.setAttribute('aria-label', img.alt);
      scarpImg.src = img.src;
      scarpImg.alt = img.alt;
      moveInstrumentation(imageEl, scarpImg);
      textAndMediaWrapper.append(scarpImg);
    }
  }

  const textAndMediaDiv = document.createElement('div');
  textAndMediaDiv.classList.add('text-and-media');
  textAndMediaDiv.setAttribute('data-cmp-is', 'text-and-media');
  textAndMediaDiv.setAttribute('aria-labelledby', 'text-and-media-title');
  textAndMediaDiv.style.overflow = 'hidden';
  textAndMediaDiv.setAttribute('is-animated', 'true');
  textAndMediaDiv.setAttribute('data-is-reverse', 'true');

  const imageContainer = document.createElement('div');
  imageContainer.classList.add('text-and-media-image-container', 'animate-image-container-up-fade', 'in-viewport', 'slide-up');
  imageContainer.setAttribute('data-slide-type', 'slide-up');
  imageContainer.setAttribute('data-slide-no-wrap', '');

  const pictureEl = document.createElement('picture');
  pictureEl.classList.add('text-and-media-image-container-picture');

  if (imageEl) {
    const img = imageEl.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt);
      pictureEl.append(...pic.children);
      moveInstrumentation(img, pictureEl.querySelector('img'));
    }
  }
  imageContainer.append(pictureEl);
  textAndMediaDiv.append(imageContainer);

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('text-and-media-content', 'in-viewport');

  const slideWrap = document.createElement('div');
  slideWrap.classList.add('slide-wrap');

  const slideUpDiv = document.createElement('div');
  slideUpDiv.setAttribute('data-slide-type', 'slide-up');
  slideUpDiv.classList.add('slide-up');

  const titleDiv = document.createElement('div');
  titleDiv.id = 'text-and-media-title';
  titleDiv.classList.add('text-and-media-content-title');
  titleDiv.setAttribute('tabindex', '0');

  const titleContent = block.querySelector('[data-aue-prop="title"]');
  if (titleContent) {
    titleDiv.append(...titleContent.childNodes);
    moveInstrumentation(titleContent, titleDiv);
  }
  slideUpDiv.append(titleDiv);

  const descriptionDiv = document.createElement('div');
  descriptionDiv.classList.add('text-and-media-content-description');
  descriptionDiv.setAttribute('tabindex', '0');

  const descriptionContent = block.querySelector('[data-aue-prop="description"]');
  if (descriptionContent) {
    descriptionDiv.append(...descriptionContent.childNodes);
    moveInstrumentation(descriptionContent, descriptionDiv);
  }
  slideUpDiv.append(descriptionDiv);

  const ctaLink = block.querySelector('[data-aue-prop="ctaLink"]');
  const ctaLabel = block.querySelector('[data-aue-prop="ctaLabel"]');

  if (ctaLink || ctaLabel) {
    const ctaAnchor = document.createElement('a');
    ctaAnchor.classList.add('cta', 'cta-primary', 'text-and-media-content-cta');
    ctaAnchor.setAttribute('target', '_self');

    if (ctaLink) {
      const link = ctaLink.querySelector('a');
      if (link) {
        ctaAnchor.href = link.href;
        ctaAnchor.setAttribute('aria-label', link.textContent);
        moveInstrumentation(link, ctaAnchor);
      }
    }

    const ctaIcon = document.createElement('span');
    ctaIcon.classList.add('cta-icon', 'qd-icon', 'qd-icon--cheveron-right');
    ctaIcon.setAttribute('aria-hidden', 'true');
    ctaAnchor.append(ctaIcon);

    const ctaLabelSpan = document.createElement('span');
    ctaLabelSpan.classList.add('cta-label');
    if (ctaLabel) {
      ctaLabelSpan.textContent = ctaLabel.textContent;
      moveInstrumentation(ctaLabel, ctaLabelSpan);
    }
    ctaAnchor.append(ctaLabelSpan);
    slideUpDiv.append(ctaAnchor);
  }

  slideWrap.append(slideUpDiv);
  contentDiv.append(slideWrap);
  textAndMediaDiv.append(contentDiv);

  const overflowFix = document.createElement('div');
  overflowFix.classList.add('text-and-media-overflow-fix');
  textAndMediaDiv.append(overflowFix);

  textAndMediaWrapper.append(textAndMediaDiv);

  block.innerHTML = '';
  block.append(textAndMediaWrapper);
}
