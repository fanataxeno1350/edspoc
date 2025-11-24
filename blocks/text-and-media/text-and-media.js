import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const textAndMediaComponent = block.querySelector('.text-and-media-component');
  if (!textAndMediaComponent) {
    // If the main component wrapper is not found, preserve original content.
    return;
  }

  // Create a new root element for the reconstructed block
  const newBlock = document.createElement('div');
  newBlock.className = 'text-and-media'; // A generic class for the block itself

  // Handle image
  const imageContainer = textAndMediaComponent.querySelector('.text-and-media-image-container');
  if (imageContainer) {
    const authoredImg = imageContainer.querySelector('picture img');
    if (authoredImg) {
      const optimizedPic = createOptimizedPicture(authoredImg.src, authoredImg.alt);
      moveInstrumentation(authoredImg, optimizedPic.querySelector('img'));
      
      const newImageWrapper = document.createElement('div');
      newImageWrapper.className = 'text-and-media-image';
      newImageWrapper.append(optimizedPic);
      newBlock.append(newImageWrapper);
    }
  }

  // Handle content (title, description, cta)
  const contentContainer = textAndMediaComponent.querySelector('.text-and-media-content');
  if (contentContainer) {
    const newContentWrapper = document.createElement('div');
    newContentWrapper.className = 'text-and-media-content-wrapper';

    // Title
    const titleElement = contentContainer.querySelector('.text-and-media-content-title');
    if (titleElement) {
      const newTitle = document.createElement('div');
      newTitle.className = 'text-and-media-title';
      newTitle.innerHTML = titleElement.innerHTML; // Preserve rich text
      moveInstrumentation(titleElement, newTitle);
      newContentWrapper.append(newTitle);
    }

    // Description
    const descriptionElement = contentContainer.querySelector('.text-and-media-content-description');
    if (descriptionElement) {
      const newDescription = document.createElement('div');
      newDescription.className = 'text-and-media-description';
      newDescription.innerHTML = descriptionElement.innerHTML; // Preserve rich text
      moveInstrumentation(descriptionElement, newDescription);
      newContentWrapper.append(newDescription);
    }

    // CTA
    const ctaElement = contentContainer.querySelector('.text-and-media-cta');
    if (ctaElement) {
      const newCta = document.createElement('div');
      newCta.className = 'text-and-media-cta-wrapper'; // Wrapper for the CTA link
      newCta.append(ctaElement.cloneNode(true)); // Clone to avoid moving it directly if other elements are still needed
      moveInstrumentation(ctaElement, newCta.querySelector('.text-and-media-cta'));
      newContentWrapper.append(newCta);
    }

    newBlock.append(newContentWrapper);
  }

  // Replace the block's content with the new structure
  block.textContent = '';
  block.append(newBlock);
}