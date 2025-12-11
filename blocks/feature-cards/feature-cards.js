import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsContainer = document.createElement('div');
  featureCardsContainer.classList.add('featurecards-container');

  const titleWrapper = document.createElement('div');
  titleWrapper.id = 'text-68763da680';
  titleWrapper.classList.add('featurecards-text-wrapper');
  const titleElement = document.createElement('h1');
  titleElement.classList.add('featurecards-title');

  // Extract title and highlight from the first row
  const firstRow = block.children[0];
  if (firstRow) {
    const titleText = firstRow.querySelector('[data-aue-prop="title"]') || firstRow.querySelector('h1');
    if (titleText) {
      titleElement.append(...titleText.childNodes);
      moveInstrumentation(titleText, titleElement);
    }
  }
  titleWrapper.append(titleElement);
  featureCardsContainer.append(titleWrapper);

  const cardsWrapper = document.createElement('div');
  cardsWrapper.classList.add('featurecards-cards-wrapper');

  // Iterate over feature cards starting from the second row
  Array.from(block.children).slice(1).forEach((row) => {
    const cardSection = document.createElement('section');
    cardSection.classList.add('featurecards-section');

    const linkElement = row.querySelector('[data-aue-prop="link"]');
    const cardLink = document.createElement('a');
    cardLink.classList.add('featurecards-card-link', 'analytics_cta_click');
    if (linkElement) {
      cardLink.href = linkElement.href;
      cardLink.title = linkElement.title || '';
      cardLink.setAttribute('data-cta-label', linkElement.getAttribute('data-cta-label') || 'Explore');
      moveInstrumentation(linkElement, cardLink);
    }

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('featurecards-card-image-wrapper');
    const imageElement = row.querySelector('[data-aue-prop="image"]');
    if (imageElement) {
      const img = imageElement.querySelector('img');
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt);
        imageWrapper.append(pic);
        moveInstrumentation(img, pic.querySelector('img'));
      }
    }
    cardLink.append(imageWrapper);

    const cardContent = document.createElement('div');
    cardContent.classList.add('featurecards-card-content');

    const cardTitle = document.createElement('h2');
    cardTitle.classList.add('featurecards-card-title', 'boing--text__heading-1');
    const titleAue = row.querySelector('[data-aue-prop="title"]');
    if (titleAue) {
      cardTitle.append(...titleAue.childNodes);
      moveInstrumentation(titleAue, cardTitle);
    }
    cardContent.append(cardTitle);

    const descriptionWrapper = document.createElement('div');
    descriptionWrapper.classList.add('featurecards-card-description-wrapper');
    const cardDescription = document.createElement('p');
    cardDescription.classList.add('featurecards-card-description', 'boing--text__body-2', 'text-boing-dark');
    const descriptionAue = row.querySelector('[data-aue-prop="description"]');
    if (descriptionAue) {
      descriptionWrapper.append(...descriptionAue.childNodes);
      moveInstrumentation(descriptionAue, descriptionWrapper);
    }
    cardContent.append(descriptionWrapper);

    const redirectButtonWrapper = document.createElement('div');
    redirectButtonWrapper.classList.add('featurecards-redirect-button-wrapper', 'd-none');
    const button = document.createElement('button');
    button.type = 'button';
    button.role = 'button';
    button.classList.add('featurecards-arrow-icon-button');
    // Assuming the button content is static or not directly authored via AUE prop in this context
    // If it were, we'd use a data-aue-prop for it.
    redirectButtonWrapper.append(button);
    cardContent.append(redirectButtonWrapper);

    cardLink.append(cardContent);
    cardSection.append(cardLink);
    cardsWrapper.append(cardSection);

    // Move instrumentation from the original row to the new cardSection
    moveInstrumentation(row, cardSection);
  });

  featureCardsContainer.append(cardsWrapper);

  // Append the curve container
  const curveContainer = document.createElement('div');
  curveContainer.classList.add('featurecards-curve-container', 'd-none');
  featureCardsContainer.append(curveContainer);

  block.textContent = '';
  block.append(featureCardsContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
