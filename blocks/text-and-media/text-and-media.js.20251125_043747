import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const textAndMediaSection = document.createElement('section');
  textAndMediaSection.classList.add('text-and-media-section');

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

  const textAndMediaContent = document.createElement('div');
  textAndMediaContent.classList.add('text-and-media-content', 'in-viewport');

  const slideWrap = document.createElement('div');
  slideWrap.classList.add('slide-wrap');

  const slideUpDiv = document.createElement('div');
  slideUpDiv.setAttribute('data-slide-type', 'slide-up');
  slideUpDiv.classList.add('slide-up');

  // Process each row in the block
  [...block.children].forEach((row, index) => {
    // Assuming the first row contains the image, title, description, ctaLabel, ctaUrl
    if (index === 0) {
      const cells = [...row.children];

      // Image
      const imageCell = cells[0];
      const img = imageCell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.classList.add('text-and-media-image-container-picture');
        const pictureImg = optimizedPic.querySelector('img');
        if (pictureImg) {
          pictureImg.classList.add('text-and-media-image-container-image', 'layout-portrait', 'animate-image-zoom-out', 'in-viewport');
          pictureImg.setAttribute('role', 'img');
        }
        textAndMediaImageContainer.append(optimizedPic);

        // Create the scarp image
        const scarpImg = createOptimizedPicture(img.src, img.alt);
        const scarpImgElement = scarpImg.querySelector('img');
        if (scarpImgElement) {
          scarpImgElement.classList.add('text-and-media-scarp', 'fade-in');
          scarpImgElement.setAttribute('data-fade-in', '');
          scarpImgElement.setAttribute('is-animated', 'true');
          scarpImgElement.setAttribute('data-is-reverse', 'true');
        }
        textAndMediaSection.append(scarpImgElement);
      }

      // Title
      const titleCell = cells[1];
      const titleDiv = document.createElement('div');
      titleDiv.id = 'text-and-media-title';
      titleDiv.classList.add('text-and-media-content-title');
      titleDiv.setAttribute('tabindex', '0');
      titleDiv.innerHTML = titleCell.innerHTML;
      slideUpDiv.append(titleDiv);

      // Description
      const descriptionCell = cells[2];
      const descriptionDiv = document.createElement('div');
      descriptionDiv.classList.add('text-and-media-content-description');
      descriptionDiv.setAttribute('tabindex', '0');
      descriptionDiv.innerHTML = descriptionCell.innerHTML;
      slideUpDiv.append(descriptionDiv);

      // CTA
      const ctaLabelCell = cells[3];
      const ctaUrlCell = cells[4];
      const ctaLink = document.createElement('a');
      ctaLink.classList.add('text-and-media-cta', 'cta__primary', 'text-and-media-content-cta');
      ctaLink.target = '_self';
      ctaLink.href = ctaUrlCell.textContent.trim();
      ctaLink.setAttribute('aria-label', ctaLabelCell.textContent.trim());

      const ctaIcon = document.createElement('span');
      ctaIcon.classList.add('text-and-media-cta-icon', 'qd-icon', 'qd-icon--cheveron-right');
      ctaIcon.setAttribute('aria-hidden', 'true');
      ctaLink.append(ctaIcon);

      const ctaLabel = document.createElement('span');
      ctaLabel.classList.add('text-and-media-cta-label');
      ctaLabel.textContent = ctaLabelCell.textContent.trim();
      ctaLink.append(ctaLabel);

      slideUpDiv.append(ctaLink);
    }
    moveInstrumentation(row, textAndMediaComponent);
  });

  slideWrap.append(slideUpDiv);
  textAndMediaContent.append(slideWrap);
  textAndMediaComponent.append(textAndMediaImageContainer, textAndMediaContent);

  const overflowFix = document.createElement('div');
  overflowFix.classList.add('text-and-media-overflow-fix');
  textAndMediaComponent.append(overflowFix);

  textAndMediaSection.append(textAndMediaComponent);

  block.textContent = '';
  block.append(textAndMediaSection);
}
