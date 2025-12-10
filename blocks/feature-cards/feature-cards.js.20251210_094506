import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsContainer = document.createElement('div');
  featureCardsContainer.classList.add('featurecards-container');

  const titleWrapper = block.children[0];
  const titleElement = titleWrapper.querySelector('h1');
  if (titleElement) {
    const featurecardsTextWrapper = document.createElement('div');
    featurecardsTextWrapper.classList.add('featurecards-text-wrapper');
    featurecardsTextWrapper.id = titleWrapper.id;

    const featurecardsTitle = document.createElement('h1');
    featurecardsTitle.classList.add('featurecards-title');

    const titleText = titleElement.textContent.trim();
    const highlightSpan = titleElement.querySelector('span');

    if (highlightSpan) {
      const parts = titleText.split(highlightSpan.textContent);
      if (parts[0]) {
        featurecardsTitle.append(document.createTextNode(parts[0]));
      }
      const newHighlightSpan = document.createElement('span');
      newHighlightSpan.classList.add('featurecards-title-highlight');
      newHighlightSpan.textContent = highlightSpan.textContent;
      moveInstrumentation(highlightSpan, newHighlightSpan);
      featurecardsTitle.append(newHighlightSpan);
      if (parts[1]) {
        featurecardsTitle.append(document.createTextNode(parts[1]));
      }
    } else {
      featurecardsTitle.textContent = titleText;
    }
    moveInstrumentation(titleElement, featurecardsTitle);
    featurecardsTextWrapper.append(featurecardsTitle);
    moveInstrumentation(titleWrapper, featurecardsTextWrapper);
    featureCardsContainer.append(featurecardsTextWrapper);
  }

  const featureCardsSection = document.createElement('div');
  featureCardsSection.classList.add('featurecards-section-wrapper');

  Array.from(block.children).slice(1).forEach((row) => {
    const linkElement = row.querySelector('a[data-aue-prop="link"]');
    const imageElement = row.querySelector('img[data-aue-prop="image"]');
    const titleElement = row.querySelector('h1[data-aue-prop="title"], h2[data-aue-prop="title"], h3[data-aue-prop="title"], p[data-aue-prop="title"]');
    const descriptionElement = row.querySelector('p[data-aue-prop="description"]');

    if (linkElement) {
      const section = document.createElement('section');
      section.classList.add('featurecards-section');

      const cardLink = document.createElement('a');
      cardLink.classList.add('featurecards-card-link', 'analytics_cta_click');
      cardLink.href = linkElement.href;
      cardLink.title = linkElement.title || '';
      cardLink.setAttribute('data-cta-label', linkElement.getAttribute('data-aue-label') || linkElement.title || '');
      moveInstrumentation(linkElement, cardLink);

      if (imageElement) {
        const cardImageWrapper = document.createElement('div');
        cardImageWrapper.classList.add('featurecards-card-image-wrapper');
        const pic = createOptimizedPicture(imageElement.src, imageElement.alt);
        cardImageWrapper.append(pic);
        pic.querySelector('img').classList.add('featurecards-card-image');
        moveInstrumentation(imageElement, pic.querySelector('img'));
        cardLink.append(cardImageWrapper);
      }

      const cardContent = document.createElement('div');
      cardContent.classList.add('featurecards-card-content');

      if (titleElement) {
        const cardTitle = document.createElement('h2');
        cardTitle.classList.add('featurecards-card-title', 'boing--text__heading-1');
        cardTitle.textContent = titleElement.textContent;
        moveInstrumentation(titleElement, cardTitle);
        cardContent.append(cardTitle);
      }

      if (descriptionElement) {
        const cardDescriptionWrapper = document.createElement('div');
        cardDescriptionWrapper.classList.add('featurecards-card-description-wrapper');
        const cardDescription = document.createElement('p');
        cardDescription.classList.add('featurecards-card-description', 'boing--text__body-2', 'text-boing-dark');
        cardDescription.textContent = descriptionElement.textContent;
        moveInstrumentation(descriptionElement, cardDescription);
        cardDescriptionWrapper.append(cardDescription);
        cardContent.append(cardDescriptionWrapper);
      }

      // Add the redirect button wrapper (always present but d-none) for consistency
      const redirectButtonWrapper = document.createElement('div');
      redirectButtonWrapper.classList.add('featurecards-redirect-button-wrapper', 'd-none');
      const arrowIconButton = document.createElement('button');
      arrowIconButton.type = 'button';
      arrowIconButton.role = 'button';
      arrowIconButton.classList.add('featurecards-arrow-icon-button');
      // The content of the button is an SVG path, which is not directly authorable via the JSON. 
      // For now, we'll leave it empty or add a placeholder if needed.
      redirectButtonWrapper.append(arrowIconButton);
      cardContent.append(redirectButtonWrapper);

      cardLink.append(cardContent);
      section.append(cardLink);
      moveInstrumentation(row, section);
      featureCardsSection.append(section);
    }
  });

  featureCardsContainer.append(featureCardsSection);

  // Bolte Sitare Card Sections (d-none by default)
  Array.from(block.children).slice(1).forEach((row) => {
    const linkElement = row.querySelector('a[data-aue-prop="link"]');
    const imageElement = row.querySelector('img[data-aue-prop="image"]');
    const titleElement = row.querySelector('h1[data-aue-prop="title"], h2[data-aue-prop="title"], h3[data-aue-prop="title"], p[data-aue-prop="title"]');
    const descriptionElement = row.querySelector('p[data-aue-prop="description"]');

    if (linkElement) {
      const bolteSitareCardSection = document.createElement('a');
      bolteSitareCardSection.classList.add('featurecards-bolte-sitare-card-section', 'd-none', 'analytics_cta_click', 'text-decoration-none');
      bolteSitareCardSection.href = linkElement.href;
      bolteSitareCardSection.title = linkElement.title || '';
      bolteSitareCardSection.setAttribute('data-title', linkElement.title || '');
      // Instrumentation for the link is already moved to the main cardLink, 
      // but if this is a distinct authorable item, it would need its own instrumentation.
      // For now, assuming it's a representation of the same data.

      const bolteSitareCardWrapper = document.createElement('div');
      bolteSitareCardWrapper.classList.add('featurecards-bolte-sitare-card-wrapper', 'd-flex');

      if (imageElement) {
        const bolteSitareCardImage = document.createElement('div');
        bolteSitareCardImage.classList.add('featurecards-bolte-sitare-card-image');
        const pic = createOptimizedPicture(imageElement.src, imageElement.alt);
        bolteSitareCardImage.append(pic);
        pic.querySelector('img').classList.add('featurecards-card-image-item');
        // Instrumentation for the image is already moved to the main card image.
        bolteSitareCardWrapper.append(bolteSitareCardImage);
      }

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('featurecards-content-wrapper', 'd-flex', 'flex-column', 'justify-content-between');

      const textContentDiv = document.createElement('div');
      if (titleElement) {
        const bolteSitareCardTitle = document.createElement('h2');
        bolteSitareCardTitle.classList.add('featurecards-bolte-sitare-card-title', 'boing--text__heading-3', 'text-boing-dark');
        bolteSitareCardTitle.textContent = titleElement.textContent;
        textContentDiv.append(bolteSitareCardTitle);
      }
      if (descriptionElement) {
        const bolteSitareCardText = document.createElement('p');
        bolteSitareCardText.classList.add('featurecards-bolte-sitare-card-text', 'boing--text__body-3', 'text-boing-dark');
        bolteSitareCardText.textContent = descriptionElement.textContent;
        textContentDiv.append(bolteSitareCardText);
      }
      contentWrapper.append(textContentDiv);

      const buttonDiv = document.createElement('div');
      const bolteSitareCardButton = document.createElement('button');
      bolteSitareCardButton.classList.add('featurecards-bolte-sitare-card-button', 'text-white', 'boing--text__body-4', 'd-inline-block');
      bolteSitareCardButton.textContent = 'Explore'; // This text is static in the HTML, not from JSON.
      buttonDiv.append(bolteSitareCardButton);
      contentWrapper.append(buttonDiv);

      bolteSitareCardWrapper.append(contentWrapper);
      bolteSitareCardSection.append(bolteSitareCardWrapper);
      featureCardsContainer.append(bolteSitareCardSection);
    }
  });

  const curveContainer = document.createElement('div');
  curveContainer.classList.add('featurecards-curve-container', 'd-none');
  featureCardsContainer.append(curveContainer);

  block.textContent = '';
  block.append(featureCardsContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
