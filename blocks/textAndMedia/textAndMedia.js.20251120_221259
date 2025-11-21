import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Create the main wrapper div
  const textAndMediaWrapper = document.createElement('div');
  textAndMediaWrapper.classList.add('text-and-media-wrapper');
  moveInstrumentation(block, textAndMediaWrapper);

  // Get the first row, which contains all the content
  const row = block.children[0];
  if (!row) return;

  // Extract content from cells
  const imageCell = row.children[0];
  const titleCell = row.children[1];
  const descriptionCell = row.children[2];
  const ctaCell = row.children[3];
  const ctaLabelCell = row.children[4];
  const ctaAriaLabelCell = row.children[5];

  // Create the image element
  const imgElement = imageCell ? imageCell.querySelector('img') : null;
  if (imgElement) {
    const optimizedPic = createOptimizedPicture(imgElement.src, imgElement.alt);
    moveInstrumentation(imgElement, optimizedPic.querySelector('img'));

    const pictureImg = optimizedPic.querySelector('img');
    pictureImg.classList.add('text-and-media-scarp', 'fade-in');
    pictureImg.setAttribute('data-fade-in', '');
    pictureImg.setAttribute('is-animated', 'true');
    pictureImg.setAttribute('data-is-reverse', 'true');
    if (imgElement.getAttribute('aria-label')) {
      pictureImg.setAttribute('aria-label', imgElement.getAttribute('aria-label'));
    }
    textAndMediaWrapper.append(optimizedPic);
  }

  // Create the .text-and-media div
  const textAndMediaDiv = document.createElement('div');
  textAndMediaDiv.classList.add('text-and-media');
  textAndMediaDiv.setAttribute('data-cmp-is', 'text-and-media');
  textAndMediaDiv.setAttribute('aria-labelledby', 'text-and-media-title');
  textAndMediaDiv.style.overflow = 'hidden';
  textAndMediaDiv.setAttribute('is-animated', 'true');
  textAndMediaDiv.setAttribute('data-is-reverse', 'true');
  moveInstrumentation(row, textAndMediaDiv);

  // Create the .text-and-media-image-container
  if (imgElement) {
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('text-and-media-image-container', 'animate-image-container-up-fade', 'in-viewport', 'slide-up');
    imageContainer.setAttribute('data-slide-type', 'slide-up');
    imageContainer.setAttribute('data-slide-no-wrap', '');

    const pictureElement = document.createElement('picture');
    pictureElement.classList.add('text-and-media-image-container-picture');

    const sourceElement = document.createElement('source');
    sourceElement.setAttribute('srcset', imgElement.src.replace('/content/dam/aemigrate/uploaded-folder/image/', 'https://s7g10.scene7.com/is/image/qic/') + '?w=500&h=400');
    sourceElement.setAttribute('type', 'image/webp');
    pictureElement.append(sourceElement);

    const imgContent = document.createElement('img');
    imgContent.src = imgElement.src;
    imgContent.alt = imgElement.alt;
    imgContent.loading = 'lazy';
    imgContent.classList.add('text-and-media-image-container-image', 'layout-portrait', 'animate-image-zoom-out', 'in-viewport');
    imgContent.setAttribute('role', 'img');
    pictureElement.append(imgContent);
    imageContainer.append(pictureElement);
    textAndMediaDiv.append(imageContainer);
  }

  // Create the .text-and-media-content
  const contentDiv = document.createElement('div');
  contentDiv.classList.add('text-and-media-content', 'in-viewport');

  const slideWrap = document.createElement('div');
  slideWrap.classList.add('slide-wrap');

  const slideUpDiv = document.createElement('div');
  slideUpDiv.setAttribute('data-slide-type', 'slide-up');
  slideUpDiv.classList.add('slide-up');

  // Title
  const titleDiv = document.createElement('div');
  titleDiv.id = 'text-and-media-title';
  titleDiv.classList.add('text-and-media-content-title');
  titleDiv.setAttribute('tabindex', '0');
  if (titleCell) {
    const h2 = titleCell.querySelector('h2');
    if (h2) {
      titleDiv.append(h2);
    } else {
      titleDiv.innerHTML = titleCell.innerHTML;
    }
  }
  slideUpDiv.append(titleDiv);

  // Description
  const descriptionDiv = document.createElement('div');
  descriptionDiv.classList.add('text-and-media-content-description');
  descriptionDiv.setAttribute('tabindex', '0');
  if (descriptionCell) {
    const p = descriptionCell.querySelector('p');
    if (p) {
      descriptionDiv.append(p);
    } else {
      descriptionDiv.innerHTML = descriptionCell.innerHTML;
    }
  }
  slideUpDiv.append(descriptionDiv);

  // CTA
  const ctaLink = document.createElement('a');
  ctaLink.classList.add('text-and-media-cta', 'text-and-media-content-cta');
  if (ctaCell) {
    const link = ctaCell.querySelector('a');
    if (link) {
      ctaLink.href = link.href;
      if (link.target) ctaLink.target = link.target;
      if (link.getAttribute('aria-label')) ctaLink.setAttribute('aria-label', link.getAttribute('aria-label'));
    }
  }
  if (ctaAriaLabelCell) {
    ctaLink.setAttribute('aria-label', ctaAriaLabelCell.textContent.trim());
  }

  const ctaIcon = document.createElement('span');
  ctaIcon.classList.add('text-and-media-cta-icon', 'qd-icon', 'qd-icon--cheveron-right');
  ctaIcon.setAttribute('aria-hidden', 'true');
  ctaLink.append(ctaIcon);

  const ctaLabel = document.createElement('span');
  ctaLabel.classList.add('text-and-media-cta-label');
  if (ctaLabelCell) {
    ctaLabel.textContent = ctaLabelCell.textContent.trim();
  }
  ctaLink.append(ctaLabel);
  slideUpDiv.append(ctaLink);

  slideWrap.append(slideUpDiv);
  contentDiv.append(slideWrap);
  textAndMediaDiv.append(contentDiv);

  // Create the .text-and-media-overflow-fix
  const overflowFixDiv = document.createElement('div');
  overflowFixDiv.classList.add('text-and-media-overflow-fix');
  textAndMediaDiv.append(overflowFixDiv);

  textAndMediaWrapper.append(textAndMediaDiv);

  // Clear the block and append the new structure
  block.textContent = '';
  block.append(textAndMediaWrapper);
}
