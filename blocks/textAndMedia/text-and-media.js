import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Create the main container div with classes and attributes
  const textAndMediaComponent = document.createElement('div');
  textAndMediaComponent.className = 'text-and-media-component';
  textAndMediaComponent.setAttribute('data-cmp-is', 'text-and-media');
  textAndMediaComponent.setAttribute('aria-labelledby', 'text-and-media-title');
  textAndMediaComponent.style.overflow = 'hidden';
  textAndMediaComponent.setAttribute('is-animated', 'true');
  textAndMediaComponent.setAttribute('data-is-reverse', 'true');

  // Create the image container
  const imageContainer = document.createElement('div');
  imageContainer.className = 'text-and-media-image-container animate-image-container-up-fade in-viewport slide-up';
  imageContainer.setAttribute('data-slide-type', 'slide-up');
  imageContainer.setAttribute('data-slide-no-wrap', '');

  // Create the picture element
  const picture = document.createElement('picture');
  picture.className = 'text-and-media-image-container-picture';

  // Create the content container
  const contentContainer = document.createElement('div');
  contentContainer.className = 'text-and-media-content in-viewport';

  const slideWrap = document.createElement('div');
  slideWrap.className = 'slide-wrap';
  const slideUp = document.createElement('div');
  slideUp.setAttribute('data-slide-type', 'slide-up');
  slideUp.className = 'slide-up';

  // Process each row in the block
  [...block.children].forEach((row) => {
    // Assuming the first row contains all the content fields in order
    const cells = [...row.children];

    if (cells.length > 0) {
      // Image (first cell)
      const imageCell = cells[0];
      const img = imageCell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        // Append source and img to picture
        const source = document.createElement('source');
        source.srcset = img.src.replace(/\?.*$/, '') + '?w=500&h=400'; // Example transformation, adjust as needed
        source.type = 'image/webp';
        picture.append(source);

        const imgElement = optimizedPic.querySelector('img');
        imgElement.className = 'text-and-media-image-container-image layout-portrait animate-image-zoom-out in-viewport';
        imgElement.setAttribute('role', 'img');
        picture.append(imgElement);
        imageContainer.append(picture);
      }

      // Title (second cell)
      const titleCell = cells[1];
      if (titleCell) {
        const titleDiv = document.createElement('div');
        titleDiv.id = 'text-and-media-title';
        titleDiv.className = 'text-and-media-content-title';
        titleDiv.setAttribute('tabindex', '0');
        titleDiv.innerHTML = titleCell.innerHTML;
        slideUp.append(titleDiv);
      }

      // Description (third cell)
      const descriptionCell = cells[2];
      if (descriptionCell) {
        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'text-and-media-content-description';
        descriptionDiv.setAttribute('tabindex', '0');
        descriptionDiv.innerHTML = descriptionCell.innerHTML;
        slideUp.append(descriptionDiv);
      }

      // CTA (fourth and fifth cells)
      const ctaLabelCell = cells[3];
      const ctaUrlCell = cells[4];
      if (ctaLabelCell && ctaUrlCell) {
        const ctaLink = document.createElement('a');
        ctaLink.href = ctaUrlCell.textContent.trim();
        ctaLink.className = 'text-and-media-cta cta__primary text-and-media-content-cta ';
        ctaLink.target = '_self';
        ctaLink.setAttribute('aria-label', ctaLabelCell.textContent.trim());

        const iconSpan = document.createElement('span');
        iconSpan.className = 'text-and-media-cta-icon qd-icon qd-icon--cheveron-right';
        iconSpan.setAttribute('aria-hidden', 'true');
        ctaLink.append(iconSpan);

        const labelSpan = document.createElement('span');
        labelSpan.className = 'text-and-media-cta-label';
        labelSpan.textContent = ctaLabelCell.textContent.trim();
        ctaLink.append(labelSpan);

        slideUp.append(ctaLink);
      }
    }
  });

  slideWrap.append(slideUp);
  contentContainer.append(slideWrap);

  // Append image and content to the main component
  textAndMediaComponent.append(imageContainer);
  textAndMediaComponent.append(contentContainer);

  // Add the overflow fix div
  const overflowFix = document.createElement('div');
  overflowFix.className = 'text-and-media-overflow-fix';
  textAndMediaComponent.append(overflowFix);

  // Clear the block and append the new structure
  block.textContent = '';
  block.append(textAndMediaComponent);
}
