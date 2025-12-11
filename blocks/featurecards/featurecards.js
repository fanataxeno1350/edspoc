import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsContainer = document.createElement('div');
  featureCardsContainer.classList.add('featurecards-container');

  const titleWrapper = block.children[0];
  const titleElement = titleWrapper.querySelector('h1');
  if (titleElement) {
    const newTitleWrapper = document.createElement('div');
    newTitleWrapper.id = 'text-68763da680'; // Hardcoded based on example, ideally dynamic if possible
    newTitleWrapper.classList.add('featurecards-text-wrapper');
    const newTitle = document.createElement('h1');
    newTitle.classList.add('featurecards-title');

    // Move instrumentation from the original h1 to the new h1
    moveInstrumentation(titleElement, newTitle);

    const titleText = titleElement.textContent;
    const highlightSpan = titleElement.querySelector('span');

    if (highlightSpan) {
      const parts = titleText.split(highlightSpan.textContent);
      if (parts[0]) {
        newTitle.append(document.createTextNode(parts[0]));
      }
      const newHighlightSpan = document.createElement('span');
      newHighlightSpan.classList.add('featurecards-title-highlight');
      newHighlightSpan.textContent = highlightSpan.textContent;
      newTitle.append(newHighlightSpan);
      if (parts[1]) {
        newTitle.append(document.createTextNode(parts[1]));
      }
    } else {
      newTitle.textContent = titleText;
    }
    newTitleWrapper.append(newTitle);
    featureCardsContainer.append(newTitleWrapper);
  }

  const featureCardsSection = document.createElement('div');
  featureCardsSection.classList.add('featurecards-section-wrapper');

  Array.from(block.children).slice(1).forEach((row) => {
    const linkElement = row.querySelector('a[data-aue-prop="link"]');
    const imageElement = row.querySelector('img[data-aue-prop="image"]');
    const titleTextElement = row.querySelector('[data-aue-prop="title"]');
    const descriptionElement = row.querySelector('[data-aue-prop="description"]');

    if (linkElement) {
      const section = document.createElement('section');
      section.classList.add('featurecards-section');

      const cardLink = document.createElement('a');
      cardLink.classList.add('featurecards-card-link', 'analytics_cta_click');
      cardLink.href = linkElement.href;
      cardLink.title = linkElement.title || '';
      cardLink.setAttribute('data-cta-label', linkElement.getAttribute('data-cta-label') || 'Explore');
      moveInstrumentation(linkElement, cardLink);

      const cardImageWrapper = document.createElement('div');
      cardImageWrapper.classList.add('featurecards-card-image-wrapper');

      if (imageElement) {
        const pic = createOptimizedPicture(imageElement.src, imageElement.alt);
        pic.classList.add('featurecards-card-image');
        moveInstrumentation(imageElement, pic.querySelector('img'));
        cardImageWrapper.append(pic);
      } else {
        // Fallback for image within a link if direct img not found
        const anchorWithImg = row.querySelector('a[data-aue-prop="image"]');
        if (anchorWithImg) {
          const imgSrc = anchorWithImg.href;
          const imgAlt = anchorWithImg.title || '';
          const pic = createOptimizedPicture(imgSrc, imgAlt);
          pic.classList.add('featurecards-card-image');
          cardImageWrapper.append(pic);
        }
      }
      cardLink.append(cardImageWrapper);

      const cardContent = document.createElement('div');
      cardContent.classList.add('featurecards-card-content');

      if (titleTextElement) {
        const cardTitle = document.createElement('h2');
        cardTitle.classList.add('featurecards-card-title', 'boing--text__heading-1');
        cardTitle.textContent = titleTextElement.textContent;
        moveInstrumentation(titleTextElement, cardTitle);
        cardContent.append(cardTitle);
      }

      if (descriptionElement) {
        const descriptionWrapper = document.createElement('div');
        descriptionWrapper.classList.add('featurecards-card-description-wrapper');
        const cardDescription = document.createElement('p');
        cardDescription.classList.add('featurecards-card-description', 'boing--text__body-2', 'text-boing-dark');
        cardDescription.textContent = descriptionElement.textContent;
        moveInstrumentation(descriptionElement, cardDescription);
        descriptionWrapper.append(cardDescription);
        cardContent.append(descriptionWrapper);
      }

      // Add the redirect button wrapper (empty as per example, but structure is there)
      const redirectButtonWrapper = document.createElement('div');
      redirectButtonWrapper.classList.add('featurecards-redirect-button-wrapper', 'd-none');
      const arrowButton = document.createElement('button');
      arrowButton.type = 'button';
      arrowButton.role = 'button';
      arrowButton.classList.add('featurecards-arrow-icon-button');
      // The content of the button is a path in the example, which might be an SVG. 
      // For now, we'll leave it empty or add a placeholder if needed.
      redirectButtonWrapper.append(arrowButton);
      cardContent.append(redirectButtonWrapper);

      cardLink.append(cardContent);
      section.append(cardLink);
      featureCardsSection.append(section);
    }
  });

  featureCardsContainer.append(featureCardsSection);

  // Add the additional 'bolte-sitare-card-section' elements if they are part of the block's structure
  // Based on the provided HTML, these seem to be alternative representations of the cards
  // and are marked 'd-none'. We will reconstruct them if their content is authorable.
  // For now, assuming they are not directly authored via the 'featurecard' model.
  // If they were, they would have data-aue-prop attributes.

  // Assuming these are not directly authored by the 'featurecard' model, but are static additions
  // or derived from the same data. If they need to be authored, the JSON would need to reflect that.
  // For this exercise, we'll skip recreating the 'd-none' elements unless their content is in the block's children.
  // The provided block JSON only defines 'featurecard' as a repeatable item.

  const curveContainer = document.createElement('div');
  curveContainer.classList.add('featurecards-curve-container', 'd-none');
  featureCardsContainer.append(curveContainer);

  block.textContent = '';
  block.append(featureCardsContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
