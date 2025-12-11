import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featurecardsContainer = document.createElement('div');
  featurecardsContainer.className = 'featurecards-container';

  const titleWrapper = block.querySelector('[data-aue-prop="title"]');
  if (titleWrapper) {
    const newTitleWrapper = document.createElement('div');
    newTitleWrapper.id = 'text-68763da680'; // Hardcoded ID from authored HTML
    newTitleWrapper.className = 'featurecards-text-wrapper';
    const h1 = document.createElement('h1');
    h1.className = 'featurecards-title';

    const titleText = titleWrapper.textContent.trim();
    if (titleText.includes('LetsBoing!')) {
      const parts = titleText.split('LetsBoing!');
      h1.textContent = parts[0];
      const highlightSpan = document.createElement('span');
      highlightSpan.className = 'featurecards-title-highlight';
      highlightSpan.textContent = 'LetsBoing!';
      h1.appendChild(highlightSpan);
      h1.append(parts[1]); // Append any text after LetsBoing!
    } else {
      h1.textContent = titleText;
    }
    newTitleWrapper.appendChild(h1);
    moveInstrumentation(titleWrapper, newTitleWrapper);
    featurecardsContainer.appendChild(newTitleWrapper);
  }

  const featurecardsSection = document.createElement('div');
  featurecardsSection.className = 'featurecards-section-wrapper';

  const featurecardItems = block.querySelectorAll('[data-aue-model="featurecard"]');
  featurecardItems.forEach((card, index) => {
    const linkElement = card.querySelector('[data-aue-prop="link"]') || card.querySelector('a');
    const imageElement = card.querySelector('[data-aue-prop="image"] img');
    const titleElement = card.querySelector('[data-aue-prop="title"]');
    const descriptionElement = card.querySelector('[data-aue-prop="description"]');

    const cardLink = document.createElement('a');
    cardLink.className = 'featurecards-card-link analytics_cta_click';
    if (linkElement) {
      cardLink.href = linkElement.href || '#';
      cardLink.title = linkElement.title || titleElement?.textContent || 'Explore';
      cardLink.setAttribute('data-cta-label', linkElement.title || titleElement?.textContent || 'Explore');
      moveInstrumentation(linkElement, cardLink);
    }

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.className = 'featurecards-card-image-wrapper';
    if (imageElement) {
      const picture = createOptimizedPicture(imageElement.src, imageElement.alt);
      picture.querySelector('img').className = 'featurecards-card-image';
      moveInstrumentation(imageElement, picture.querySelector('img'));
      cardImageWrapper.appendChild(picture);
    }
    cardLink.appendChild(cardImageWrapper);

    const cardContent = document.createElement('div');
    cardContent.className = 'featurecards-card-content';

    if (titleElement) {
      const h2 = document.createElement('h2');
      h2.className = 'featurecards-card-title boing--text__heading-1';
      h2.textContent = titleElement.textContent;
      moveInstrumentation(titleElement, h2);
      cardContent.appendChild(h2);
    }

    if (descriptionElement) {
      const descriptionWrapper = document.createElement('div');
      descriptionWrapper.className = 'featurecards-card-description-wrapper';
      const p = document.createElement('p');
      p.className = 'featurecards-card-description boing--text__body-2 text-boing-dark';
      p.innerHTML = descriptionElement.innerHTML;
      moveInstrumentation(descriptionElement, p);
      descriptionWrapper.appendChild(p);
      cardContent.appendChild(descriptionWrapper);
    }

    const redirectButtonWrapper = document.createElement('div');
    redirectButtonWrapper.className = 'featurecards-redirect-button-wrapper d-none';
    const button = document.createElement('button');
    button.type = 'button';
    button.role = 'button';
    button.className = 'featurecards-arrow-icon-button';
    // The content of this button is an SVG path, which is not directly authored as a field.
    // Assuming it's a fixed asset or derived, we'll hardcode it for now based on the example.
    button.textContent = '/content/dam/aemigrate/uploaded-folder/image/1765368595856.svg+xml';
    redirectButtonWrapper.appendChild(button);
    cardContent.appendChild(redirectButtonWrapper);

    cardLink.appendChild(cardContent);

    const section = document.createElement('section');
    section.className = 'featurecards-section';
    section.appendChild(cardLink);
    featurecardsSection.appendChild(section);
  });

  featurecardsContainer.appendChild(featurecardsSection);

  // Handle the 'bolte-sitare' cards which are initially d-none but present in authored HTML
  featurecardItems.forEach((card, index) => {
    const linkElement = card.querySelector('[data-aue-prop="link"]') || card.querySelector('a');
    const imageElement = card.querySelector('[data-aue-prop="image"] img');
    const titleElement = card.querySelector('[data-aue-prop="title"]');
    const descriptionElement = card.querySelector('[data-aue-prop="description"]');

    const bolteSitareCardSection = document.createElement('a');
    bolteSitareCardSection.className = 'featurecards-bolte-sitare-card-section d-none analytics_cta_click text-decoration-none';
    if (linkElement) {
      bolteSitareCardSection.href = linkElement.href || '#';
      bolteSitareCardSection.title = titleElement?.textContent || 'Explore';
      bolteSitareCardSection.setAttribute('data-title', titleElement?.textContent || 'Explore');
      // No direct instrumentation move needed here as it's a 'duplicate' structure
    }

    const bolteSitareCardWrapper = document.createElement('div');
    bolteSitareCardWrapper.className = 'featurecards-bolte-sitare-card-wrapper d-flex';

    const bolteSitareCardImage = document.createElement('div');
    bolteSitareCardImage.className = 'featurecards-bolte-sitare-card-image';
    if (imageElement) {
      const picture = createOptimizedPicture(imageElement.src, imageElement.alt);
      picture.querySelector('img').className = 'featurecards-card-image-item';
      bolteSitareCardImage.appendChild(picture);
    }
    bolteSitareCardWrapper.appendChild(bolteSitareCardImage);

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'featurecards-content-wrapper d-flex flex-column justify-content-between';

    const textDiv = document.createElement('div');
    if (titleElement) {
      const h2 = document.createElement('h2');
      h2.className = 'featurecards-bolte-sitare-card-title boing--text__heading-3 text-boing-dark';
      h2.textContent = titleElement.textContent;
      textDiv.appendChild(h2);
    }
    if (descriptionElement) {
      const p = document.createElement('p');
      p.className = 'featurecards-bolte-sitare-card-text boing--text__body-3 text-boing-dark';
      p.innerHTML = descriptionElement.innerHTML;
      textDiv.appendChild(p);
    }
    contentWrapper.appendChild(textDiv);

    const buttonDiv = document.createElement('div');
    const button = document.createElement('button');
    button.className = 'featurecards-bolte-sitare-card-button text-white boing--text__body-4 d-inline-block';
    button.textContent = 'Explore';
    buttonDiv.appendChild(button);
    contentWrapper.appendChild(buttonDiv);

    bolteSitareCardWrapper.appendChild(contentWrapper);
    bolteSitareCardSection.appendChild(bolteSitareCardWrapper);
    featurecardsContainer.appendChild(bolteSitareCardSection);
  });

  const curveContainer = document.createElement('div');
  curveContainer.className = 'featurecards-curve-container d-none';
  featurecardsContainer.appendChild(curveContainer);

  block.textContent = '';
  block.appendChild(featurecardsContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}