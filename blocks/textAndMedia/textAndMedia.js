import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Create the main container div
  const textAndMediaComponent = document.createElement('div');
  textAndMediaComponent.className = 'text-and-media-component';
  textAndMediaComponent.setAttribute('data-cmp-is', 'text-and-media');
  textAndMediaComponent.setAttribute('aria-labelledby', 'text-and-media-title');
  textAndMediaComponent.style.overflow = 'hidden';
  textAndMediaComponent.setAttribute('is-animated', 'true');
  textAndMediaComponent.setAttribute('data-is-reverse', 'true');

  // Process each row in the block
  [...block.children].forEach((row) => {
    moveInstrumentation(row, textAndMediaComponent);

    const cells = [...row.children];

    // Cell 1: Image
    const imageCell = cells[0];
    if (imageCell) {
      const img = imageCell.querySelector('img');
      if (img) {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'text-and-media-image-container animate-image-container-up-fade in-viewport slide-up';
        imageContainer.setAttribute('data-slide-type', 'slide-up');
        imageContainer.setAttribute('data-slide-no-wrap', '');

        const picture = document.createElement('picture');
        picture.className = 'text-and-media-image-container-picture';

        // Create source for webp (if available or needed)
        // For simplicity, we'll just create the img directly from createOptimizedPicture
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        const optimizedImg = optimizedPic.querySelector('img');
        if (optimizedImg) {
          moveInstrumentation(img, optimizedImg);
          optimizedImg.className = 'text-and-media-image-container-image layout-portrait animate-image-zoom-out in-viewport';
          optimizedImg.setAttribute('role', 'img');
          optimizedImg.setAttribute('loading', 'lazy');
        }
        picture.append(optimizedPic.querySelector('source'), optimizedPic.querySelector('img'));
        imageContainer.append(picture);
        textAndMediaComponent.append(imageContainer);
      }
    }

    // Cell 2: Title, Description, CTA
    const contentCell = cells[1];
    if (contentCell) {
      const contentDiv = document.createElement('div');
      contentDiv.className = 'text-and-media-content in-viewport';

      const slideWrap = document.createElement('div');
      slideWrap.className = 'slide-wrap';
      const slideUpDiv = document.createElement('div');
      slideUpDiv.setAttribute('data-slide-type', 'slide-up');
      slideUpDiv.className = 'slide-up';

      // Title
      const titleElement = contentCell.querySelector('h1, h2, h3, h4, h5, h6');
      if (titleElement) {
        const titleDiv = document.createElement('div');
        titleDiv.id = 'text-and-media-title';
        titleDiv.className = 'text-and-media-content-title';
        titleDiv.setAttribute('tabindex', '0');
        titleDiv.innerHTML = titleElement.innerHTML;
        slideUpDiv.append(titleDiv);
      }

      // Description
      const descriptionElement = contentCell.querySelector('p');
      if (descriptionElement) {
        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'text-and-media-content-description';
        descriptionDiv.setAttribute('tabindex', '0');
        descriptionDiv.innerHTML = descriptionElement.innerHTML;
        slideUpDiv.append(descriptionDiv);
      }

      // CTA
      const ctaLink = contentCell.querySelector('a');
      if (ctaLink) {
        const newCta = document.createElement('a');
        newCta.href = ctaLink.href;
        newCta.className = 'text-and-media-cta cta__primary text-and-media-content-cta ';
        newCta.target = ctaLink.target || '_self';
        newCta.setAttribute('aria-label', ctaLink.textContent.trim());

        const ctaIcon = document.createElement('span');
        ctaIcon.className = 'text-and-media-cta-icon qd-icon qd-icon--cheveron-right';
        ctaIcon.setAttribute('aria-hidden', 'true');
        newCta.append(ctaIcon);

        const ctaLabel = document.createElement('span');
        ctaLabel.className = 'text-and-media-cta-label';
        ctaLabel.textContent = ctaLink.textContent.trim();
        newCta.append(ctaLabel);

        slideUpDiv.append(newCta);
      }

      slideWrap.append(slideUpDiv);
      contentDiv.append(slideWrap);
      textAndMediaComponent.append(contentDiv);
    }
  });

  // Add the overflow fix div
  const overflowFix = document.createElement('div');
  overflowFix.className = 'text-and-media-overflow-fix';
  textAndMediaComponent.append(overflowFix);

  // Clear the block and append the new structure
  block.textContent = '';
  block.append(textAndMediaComponent);

  // Add the scarp image if it exists in the original block
  const originalScarpImg = block.querySelector('img.text-and-media-scarp');
  if (originalScarpImg) {
    const scarpImg = document.createElement('img');
    scarpImg.className = 'text-and-media-scarp fade-in';
    scarpImg.setAttribute('data-fade-in', '');
    scarpImg.src = originalScarpImg.src;
    scarpImg.alt = originalScarpImg.alt;
    scarpImg.setAttribute('loading', 'lazy');
    scarpImg.setAttribute('aria-label', originalScarpImg.getAttribute('aria-label'));
    scarpImg.setAttribute('is-animated', originalScarpImg.getAttribute('is-animated'));
    scarpImg.setAttribute('data-is-reverse', originalScarpImg.getAttribute('data-is-reverse'));
    block.prepend(scarpImg);
  }
}
