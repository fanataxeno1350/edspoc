import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const imageCell = block.querySelector('div:nth-child(1) > div');
  const titleCell = block.querySelector('div:nth-child(2) > div');
  const descriptionCell = block.querySelector('div:nth-child(3) > div');
  const ctaLabelCell = block.querySelector('div:nth-child(4) > div');
  const ctaUrlCell = block.querySelector('div:nth-child(5) > div');

  // Extract content
  const image = imageCell ? imageCell.querySelector('img') : null;
  const title = titleCell ? titleCell.innerHTML : '';
  const description = descriptionCell ? descriptionCell.innerHTML : '';
  const ctaLabel = ctaLabelCell ? ctaLabelCell.textContent.trim() : '';
  const ctaUrl = ctaUrlCell ? ctaUrlCell.textContent.trim() : '';

  // Create elements based on HTML structure
  const section = document.createElement('section');
  section.className = 'text-and-media-section';
  moveInstrumentation(block, section);

  if (image) {
    const scarpImg = createOptimizedPicture(image.src, image.alt);
    const originalScarpImg = block.querySelector('.text-and-media-scarp');
    if (originalScarpImg) {
      moveInstrumentation(originalScarpImg, scarpImg.querySelector('img'));
      scarpImg.querySelector('img').className = 'text-and-media-scarp fade-in';
      scarpImg.querySelector('img').setAttribute('data-fade-in', '');
      if (originalScarpImg.hasAttribute('is-animated')) {
        scarpImg.querySelector('img').setAttribute('is-animated', originalScarpImg.getAttribute('is-animated'));
      }
      if (originalScarpImg.hasAttribute('data-is-reverse')) {
        scarpImg.querySelector('img').setAttribute('data-is-reverse', originalScarpImg.getAttribute('data-is-reverse'));
      }
      if (originalScarpImg.hasAttribute('aria-label')) {
        scarpImg.querySelector('img').setAttribute('aria-label', originalScarpImg.getAttribute('aria-label'));
      }
    }
    section.append(scarpImg.querySelector('img'));
  }

  const textAndMediaComponent = document.createElement('div');
  textAndMediaComponent.className = 'text-and-media-component';
  textAndMediaComponent.setAttribute('data-cmp-is', 'text-and-media');
  textAndMediaComponent.setAttribute('aria-labelledby', 'text-and-media-title');
  textAndMediaComponent.style.overflow = 'hidden';
  // Transfer attributes from the original text-and-media-component if it exists
  const originalTextAndMediaComponent = block.querySelector('.text-and-media-component');
  if (originalTextAndMediaComponent) {
    moveInstrumentation(originalTextAndMediaComponent, textAndMediaComponent);
    if (originalTextAndMediaComponent.hasAttribute('is-animated')) {
      textAndMediaComponent.setAttribute('is-animated', originalTextAndMediaComponent.getAttribute('is-animated'));
    }
    if (originalTextAndMediaComponent.hasAttribute('data-is-reverse')) {
      textAndMediaComponent.setAttribute('data-is-reverse', originalTextAndMediaComponent.getAttribute('data-is-reverse'));
    }
  }

  const imageContainer = document.createElement('div');
  imageContainer.className = 'text-and-media-image-container animate-image-container-up-fade in-viewport slide-up';
  imageContainer.setAttribute('data-slide-type', 'slide-up');
  imageContainer.setAttribute('data-slide-no-wrap', '');

  const picture = document.createElement('picture');
  picture.className = 'text-and-media-image-container-picture';

  if (image) {
    const optimizedPicture = createOptimizedPicture(image.src, image.alt, false, [{ width: '500', height: '400' }]);
    const source = optimizedPicture.querySelector('source');
    const img = optimizedPicture.querySelector('img');

    if (source) {
      picture.append(source);
    }
    if (img) {
      img.className = 'text-and-media-image-container-image layout-portrait animate-image-zoom-out in-viewport';
      img.setAttribute('role', 'img');
      picture.append(img);
      moveInstrumentation(image, img);
    }
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

  if (title) {
    const titleDiv = document.createElement('div');
    titleDiv.id = 'text-and-media-title';
    titleDiv.className = 'text-and-media-content-title';
    titleDiv.setAttribute('tabindex', '0');
    titleDiv.innerHTML = title;
    slideUpDiv.append(titleDiv);
  }

  if (description) {
    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'text-and-media-content-description';
    descriptionDiv.setAttribute('tabindex', '0');
    descriptionDiv.innerHTML = description;
    slideUpDiv.append(descriptionDiv);
  }

  if (ctaLabel && ctaUrl) {
    const ctaLink = document.createElement('a');
    ctaLink.href = ctaUrl;
    ctaLink.className = 'text-and-media-cta cta__primary text-and-media-content-cta';
    ctaLink.setAttribute('target', '_self');
    ctaLink.setAttribute('aria-label', ctaLabel);

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
  contentDiv.append(slideWrap);
  textAndMediaComponent.append(contentDiv);

  const overflowFixDiv = document.createElement('div');
  overflowFixDiv.className = 'text-and-media-overflow-fix';
  textAndMediaComponent.append(overflowFixDiv);

  section.append(textAndMediaComponent);

  block.textContent = '';
  block.append(section);
}
