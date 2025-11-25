import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const image = block.querySelector('[data-aue-prop="image"]');
  const title = block.querySelector('[data-aue-prop="title"]');
  const description = block.querySelector('[data-aue-prop="description"]');
  const ctaLabel = block.querySelector('[data-aue-prop="ctaLabel"]');
  const ctaUrl = block.querySelector('[data-aue-prop="ctaUrl"]');

  const section = document.createElement('section');
  section.classList.add('text-and-media-section');

  if (image) {
    const scarpImg = image.querySelector('img');
    if (scarpImg) {
      const scarp = document.createElement('img');
      scarp.classList.add('text-and-media-scarp', 'fade-in');
      scarp.dataset.fadeIn = '';
      scarp.src = scarpImg.src;
      scarp.alt = scarpImg.alt;
      scarp.loading = 'lazy';
      scarp.setAttribute('aria-label', scarpImg.alt);
      scarp.setAttribute('is-animated', 'true');
      scarp.dataset.isReverse = 'true';
      moveInstrumentation(scarpImg, scarp);
      section.append(scarp);
    }
  }

  const textAndMediaComponent = document.createElement('div');
  textAndMediaComponent.classList.add('text-and-media-component');
  textAndMediaComponent.dataset.cmpIs = 'text-and-media';
  textAndMediaComponent.setAttribute('aria-labelledby', 'text-and-media-title');
  textAndMediaComponent.style.overflow = 'hidden';
  textAndMediaComponent.setAttribute('is-animated', 'true');
  textAndMediaComponent.dataset.isReverse = 'true';

  const imageContainer = document.createElement('div');
  imageContainer.classList.add('text-and-media-image-container', 'animate-image-container-up-fade', 'in-viewport', 'slide-up');
  imageContainer.dataset.slideType = 'slide-up';
  imageContainer.dataset.slideNoWrap = '';

  if (image) {
    const imgElement = image.querySelector('img');
    if (imgElement) {
      const picture = createOptimizedPicture(imgElement.src, imgElement.alt);
      picture.classList.add('text-and-media-image-container-picture');
      const imgInPicture = picture.querySelector('img');
      if (imgInPicture) {
        imgInPicture.classList.add('text-and-media-image-container-image', 'layout-portrait', 'animate-image-zoom-out', 'in-viewport');
        imgInPicture.setAttribute('role', 'img');
      }
      moveInstrumentation(imgElement, picture.querySelector('img'));
      imageContainer.append(picture);
    }
  }
  textAndMediaComponent.append(imageContainer);

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('text-and-media-content', 'in-viewport');

  const slideWrap = document.createElement('div');
  slideWrap.classList.add('slide-wrap');

  const slideUpDiv = document.createElement('div');
  slideUpDiv.dataset.slideType = 'slide-up';
  slideUpDiv.classList.add('slide-up');

  const titleDiv = document.createElement('div');
  titleDiv.id = 'text-and-media-title';
  titleDiv.classList.add('text-and-media-content-title');
  titleDiv.setAttribute('tabindex', '0');
  if (title) {
    moveInstrumentation(title, titleDiv);
    titleDiv.append(...title.children);
  }
  slideUpDiv.append(titleDiv);

  const descriptionDiv = document.createElement('div');
  descriptionDiv.classList.add('text-and-media-content-description');
  descriptionDiv.setAttribute('tabindex', '0');
  if (description) {
    moveInstrumentation(description, descriptionDiv);
    descriptionDiv.append(...description.children);
  }
  slideUpDiv.append(descriptionDiv);

  if (ctaLabel && ctaUrl) {
    const ctaLink = document.createElement('a');
    ctaLink.href = ctaUrl.textContent.trim();
    ctaLink.classList.add('text-and-media-cta', 'cta__primary', 'text-and-media-content-cta');
    ctaLink.target = '_self';
    ctaLink.setAttribute('aria-label', ctaLabel.textContent.trim());

    const ctaIcon = document.createElement('span');
    ctaIcon.classList.add('text-and-media-cta-icon', 'qd-icon', 'qd-icon--cheveron-right');
    ctaIcon.setAttribute('aria-hidden', 'true');
    ctaLink.append(ctaIcon);

    const ctaLabelSpan = document.createElement('span');
    ctaLabelSpan.classList.add('text-and-media-cta-label');
    ctaLabelSpan.textContent = ctaLabel.textContent.trim();
    moveInstrumentation(ctaLabel, ctaLabelSpan);
    ctaLink.append(ctaLabelSpan);

    // Move instrumentation from ctaUrl if it's a separate node
    if (ctaUrl !== ctaLabel) { // Avoid moving instrumentation twice if they are the same node
      const tempDiv = document.createElement('div');
      tempDiv.append(ctaUrl.cloneNode(true));
      moveInstrumentation(ctaUrl, tempDiv.children[0]);
    }

    slideUpDiv.append(ctaLink);
  }

  slideWrap.append(slideUpDiv);
  contentDiv.append(slideWrap);
  textAndMediaComponent.append(contentDiv);

  const overflowFix = document.createElement('div');
  overflowFix.classList.add('text-and-media-overflow-fix');
  textAndMediaComponent.append(overflowFix);

  section.append(textAndMediaComponent);

  block.textContent = '';
  block.append(section);

  const blockName = block.dataset.blockName;
  block.className = `${blockName} block`;
  block.dataset.blockStatus = "loaded";
}
