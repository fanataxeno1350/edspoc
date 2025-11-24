import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const textAndMediaSection = document.createElement('section');
  textAndMediaSection.classList.add('text-and-media-section');

  const textAndMediaComponent = document.createElement('div');
  textAndMediaComponent.classList.add('text-and-media-component');
  textAndMediaComponent.setAttribute('data-cmp-is', 'text-and-media');
  textAndMediaComponent.style.overflow = 'hidden';

  const imageContainer = document.createElement('div');
  imageContainer.classList.add('text-and-media-image-container', 'animate-image-container-up-fade', 'in-viewport', 'slide-up');
  imageContainer.setAttribute('data-slide-type', 'slide-up');
  imageContainer.setAttribute('data-slide-no-wrap', '');

  const picture = document.createElement('picture');
  picture.classList.add('text-and-media-image-container-picture');

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('text-and-media-content', 'in-viewport');

  const slideWrap = document.createElement('div');
  slideWrap.classList.add('slide-wrap');

  const slideUpDiv = document.createElement('div');
  slideUpDiv.setAttribute('data-slide-type', 'slide-up');
  slideUpDiv.classList.add('slide-up');

  let imageElement;
  let titleElement;
  let descriptionElement;
  let ctaLabelElement;
  let ctaUrlElement;

  // Assuming the block has only one row for all content
  const row = block.children[0];
  if (row) {
    moveInstrumentation(row, textAndMediaComponent);
    const cells = [...row.children];

    // Extract content based on the order in the block.json fields
    cells.forEach((cell, index) => {
      if (index === 0) { // Image
        const img = cell.querySelector('img');
        if (img) {
          imageElement = createOptimizedPicture(img.src, img.alt);
          moveInstrumentation(img, imageElement.querySelector('img'));

          // Add attributes from the original img
          const originalImg = imageElement.querySelector('img');
          originalImg.classList.add('text-and-media-image-container-image', 'layout-portrait', 'animate-image-zoom-out', 'in-viewport');
          originalImg.setAttribute('role', 'img');
          originalImg.setAttribute('loading', 'lazy');

          // Create source element for webp if available (or just use img.src)
          const source = document.createElement('source');
          source.setAttribute('type', 'image/webp');
          // For simplicity, we'll derive a webp srcset from the original img src
          // In a real scenario, you might have a dedicated webp field or a more sophisticated createOptimizedPicture
          source.setAttribute('srcset', `${img.src.split('?')[0]}?w=500&h=400&format=webp`); // Example transformation
          picture.append(source);
          picture.append(imageElement.querySelector('img')); // Append the img from optimized picture
        }
      } else if (index === 1) { // Title
        titleElement = document.createElement('div');
        titleElement.id = 'text-and-media-title';
        titleElement.classList.add('text-and-media-content-title');
        titleElement.setAttribute('tabindex', '0');
        titleElement.innerHTML = cell.innerHTML;
      } else if (index === 2) { // Description
        descriptionElement = document.createElement('div');
        descriptionElement.classList.add('text-and-media-content-description');
        descriptionElement.setAttribute('tabindex', '0');
        descriptionElement.innerHTML = cell.innerHTML;
      } else if (index === 3) { // CTA Label
        ctaLabelElement = cell.textContent.trim();
      } else if (index === 4) { // CTA URL
        const link = cell.querySelector('a');
        if (link) { // Ensure there's a link to extract href from
          ctaUrlElement = link.href;
        }
      }
    });
  }

  // Build the DOM structure
  imageContainer.append(picture);
  textAndMediaComponent.append(imageContainer);

  if (titleElement) {
    slideUpDiv.append(titleElement);
  }
  if (descriptionElement) {
    slideUpDiv.append(descriptionElement);
  }

  if (ctaLabelElement && ctaUrlElement) {
    const ctaLink = document.createElement('a');
    ctaLink.href = ctaUrlElement;
    ctaLink.classList.add('text-and-media-cta', 'cta__primary', 'text-and-media-content-cta');
    ctaLink.setAttribute('target', '_self');
    ctaLink.setAttribute('aria-label', ctaLabelElement);

    const ctaIcon = document.createElement('span');
    ctaIcon.classList.add('text-and-media-cta-icon', 'qd-icon', 'qd-icon--cheveron-right');
    ctaIcon.setAttribute('aria-hidden', 'true');
    ctaLink.append(ctaIcon);

    const ctaLabelSpan = document.createElement('span');
    ctaLabelSpan.classList.add('text-and-media-cta-label');
    ctaLabelSpan.textContent = ctaLabelElement;
    ctaLink.append(ctaLabelSpan);

    slideUpDiv.append(ctaLink);
  }

  slideWrap.append(slideUpDiv);
  contentDiv.append(slideWrap);
  textAndMediaComponent.append(contentDiv);

  const overflowFix = document.createElement('div');
  overflowFix.classList.add('text-and-media-overflow-fix');
  textAndMediaComponent.append(overflowFix);

  // Add the optional scarp image if it exists in the original block
  const originalScarpImg = block.querySelector('img.text-and-media-scarp');
  if (originalScarpImg) {
    const scarpImg = document.createElement('img');
    scarpImg.classList.add('text-and-media-scarp', 'fade-in');
    scarpImg.setAttribute('data-fade-in', '');
    scarpImg.src = originalScarpImg.src;
    scarpImg.alt = originalScarpImg.alt;
    scarpImg.setAttribute('loading', 'lazy');
    scarpImg.setAttribute('aria-label', originalScarpImg.getAttribute('aria-label'));
    scarpImg.setAttribute('is-animated', originalScarpImg.getAttribute('is-animated'));
    scarpImg.setAttribute('data-is-reverse', originalScarpImg.getAttribute('data-is-reverse'));
    textAndMediaSection.append(scarpImg);
  }

  textAndMediaSection.append(textAndMediaComponent);

  // Transfer attributes from the original block to the new section if needed
  // For example, if the block itself had data-is-reverse
  if (block.hasAttribute('data-is-reverse')) {
    textAndMediaComponent.setAttribute('data-is-reverse', block.getAttribute('data-is-reverse'));
  }
  if (block.hasAttribute('is-animated')) {
    textAndMediaComponent.setAttribute('is-animated', block.getAttribute('is-animated'));
  }

  block.textContent = '';
  block.append(textAndMediaSection);
}
