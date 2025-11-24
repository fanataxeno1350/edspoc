import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const textAndMediaSection = document.createElement('section');
  textAndMediaSection.className = 'text-and-media-section';
  moveInstrumentation(block, textAndMediaSection);

  const imageCell = block.querySelector(':scope > div:first-child > div:first-child');
  const titleCell = block.querySelector(':scope > div:nth-child(2) > div:first-child');
  const descriptionCell = block.querySelector(':scope > div:nth-child(3) > div:first-child');
  const ctaLabelCell = block.querySelector(':scope > div:nth-child(4) > div:first-child');
  const ctaLinkCell = block.querySelector(':scope > div:nth-child(5) > div:first-child');

  // Image Scarp
  const imgScarp = imageCell.querySelector('img');
  if (imgScarp) {
    const newImgScarp = createOptimizedPicture(imgScarp.src, imgScarp.alt);
    newImgScarp.querySelector('img').className = 'text-and-media-scarp fade-in';
    if (imgScarp.dataset.fadeIn) newImgScarp.querySelector('img').dataset.fadeIn = imgScarp.dataset.fadeIn;
    if (imgScarp.loading) newImgScarp.querySelector('img').loading = imgScarp.loading;
    if (imgScarp.ariaLabel) newImgScarp.querySelector('img').ariaLabel = imgScarp.ariaLabel;
    if (imgScarp.getAttribute('is-animated')) newImgScarp.querySelector('img').setAttribute('is-animated', imgScarp.getAttribute('is-animated'));
    if (imgScarp.dataset.isReverse) newImgScarp.querySelector('img').dataset.isReverse = imgScarp.dataset.isReverse;
    moveInstrumentation(imgScarp, newImgScarp.querySelector('img'));
    textAndMediaSection.append(newImgScarp);
  }

  // Text and Media Component
  const textAndMediaComponent = document.createElement('div');
  textAndMediaComponent.className = 'text-and-media-component';
  textAndMediaComponent.dataset.cmpIs = 'text-and-media';
  textAndMediaComponent.setAttribute('aria-labelledby', 'text-and-media-title');
  textAndMediaComponent.style.overflow = 'hidden';
  textAndMediaComponent.setAttribute('is-animated', 'true');
  textAndMediaComponent.dataset.isReverse = 'true';

  // Image Container
  const textAndMediaImageContainer = document.createElement('div');
  textAndMediaImageContainer.className = 'text-and-media-image-container animate-image-container-up-fade in-viewport slide-up';
  textAndMediaImageContainer.dataset.slideType = 'slide-up';
  textAndMediaImageContainer.dataset.slideNoWrap = '';

  const pictureElement = document.createElement('picture');
  pictureElement.className = 'text-and-media-image-container-picture';

  const sourceElement = document.createElement('source');
  sourceElement.setAttribute('srcset', `https://s7g10.scene7.com/is/image/qic/${imgScarp.src.split('/').pop().split('.')[0]}?w=500&h=400`);
  sourceElement.setAttribute('type', 'image/webp');
  pictureElement.append(sourceElement);

  const imgElement = document.createElement('img');
  imgElement.src = imgScarp.src;
  imgElement.alt = imgScarp.alt;
  imgElement.loading = 'lazy';
  imgElement.className = 'text-and-media-image-container-image layout-portrait animate-image-zoom-out in-viewport';
  imgElement.setAttribute('role', 'img');
  pictureElement.append(imgElement);
  moveInstrumentation(imgScarp, imgElement);

  textAndMediaImageContainer.append(pictureElement);
  textAndMediaComponent.append(textAndMediaImageContainer);

  // Content
  const textAndMediaContent = document.createElement('div');
  textAndMediaContent.className = 'text-and-media-content in-viewport';

  const slideWrap = document.createElement('div');
  slideWrap.className = 'slide-wrap';

  const slideUp = document.createElement('div');
  slideUp.dataset.slideType = 'slide-up';
  slideUp.className = 'slide-up';

  // Title
  if (titleCell) {
    const titleDiv = document.createElement('div');
    titleDiv.id = 'text-and-media-title';
    titleDiv.className = 'text-and-media-content-title';
    titleDiv.setAttribute('tabindex', '0');
    titleDiv.innerHTML = titleCell.innerHTML;
    moveInstrumentation(titleCell, titleDiv);
    slideUp.append(titleDiv);
  }

  // Description
  if (descriptionCell) {
    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'text-and-media-content-description';
    descriptionDiv.setAttribute('tabindex', '0');
    descriptionDiv.innerHTML = descriptionCell.innerHTML;
    moveInstrumentation(descriptionCell, descriptionDiv);
    slideUp.append(descriptionDiv);
  }

  // CTA
  if (ctaLabelCell && ctaLinkCell) {
    const ctaLink = document.createElement('a');
    ctaLink.href = ctaLinkCell.textContent.trim();
    ctaLink.className = 'text-and-media-cta cta__primary text-and-media-content-cta';
    ctaLink.target = '_self';
    ctaLink.setAttribute('aria-label', ctaLabelCell.textContent.trim());

    const ctaIcon = document.createElement('span');
    ctaIcon.className = 'text-and-media-cta-icon qd-icon qd-icon--cheveron-right';
    ctaIcon.setAttribute('aria-hidden', 'true');
    ctaLink.append(ctaIcon);

    const ctaLabel = document.createElement('span');
    ctaLabel.className = 'text-and-media-cta-label';
    ctaLabel.textContent = ctaLabelCell.textContent.trim();
    ctaLink.append(ctaLabel);

    moveInstrumentation(ctaLabelCell, ctaLink);
    moveInstrumentation(ctaLinkCell, ctaLink);
    slideUp.append(ctaLink);
  }

  slideWrap.append(slideUp);
  textAndMediaContent.append(slideWrap);
  textAndMediaComponent.append(textAndMediaContent);

  const overflowFix = document.createElement('div');
  overflowFix.className = 'text-and-media-overflow-fix';
  textAndMediaComponent.append(overflowFix);

  textAndMediaSection.append(textAndMediaComponent);

  block.textContent = '';
  block.append(textAndMediaSection);
}
