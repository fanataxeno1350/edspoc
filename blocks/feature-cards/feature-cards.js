import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsContainer = document.createElement('div');
  featureCardsContainer.classList.add('featurecards-container');

  const titleWrapper = document.createElement('div');
  titleWrapper.classList.add('featurecards-text-wrapper');
  const titleElement = block.querySelector('h1.featurecards-title');
  if (titleElement) {
    titleWrapper.append(titleElement);
    moveInstrumentation(block.querySelector('div[data-aue-prop="title"]'), titleWrapper);
  }
  featureCardsContainer.append(titleWrapper);

  const featureCardsSectionWrapper = document.createElement('div');
  featureCardsSectionWrapper.classList.add('featurecards-section-wrapper');

  const authoredCards = block.querySelectorAll('section[data-aue-model="featureCard"]');
  authoredCards.forEach((authoredCard) => {
    const cardLink = document.createElement('a');
    cardLink.classList.add('featurecards-card-link', 'analytics_cta_click');

    const linkElement = authoredCard.querySelector('a[data-aue-prop="link"]');
    if (linkElement) {
      cardLink.href = linkElement.href;
      cardLink.title = linkElement.title || '';
      cardLink.setAttribute('data-cta-label', linkElement.getAttribute('data-cta-label') || '');
      moveInstrumentation(linkElement, cardLink);
    }

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.classList.add('featurecards-card-image-wrapper');
    const imgElement = authoredCard.querySelector('img[data-aue-prop="image"]');
    if (imgElement) {
      const picture = createOptimizedPicture(imgElement.src, imgElement.alt);
      cardImageWrapper.append(picture);
      moveInstrumentation(imgElement, picture.querySelector('img'));
    }
    cardLink.append(cardImageWrapper);

    const cardContent = document.createElement('div');
    cardContent.classList.add('featurecards-card-content');

    const cardTitle = document.createElement('h2');
    cardTitle.classList.add('featurecards-card-title', 'boing--text__heading-1');
    const authoredTitle = authoredCard.querySelector('h2[data-aue-prop="title"]');
    if (authoredTitle) {
      cardTitle.innerHTML = authoredTitle.innerHTML;
      moveInstrumentation(authoredTitle, cardTitle);
    }
    cardContent.append(cardTitle);

    const descriptionWrapper = document.createElement('div');
    descriptionWrapper.classList.add('featurecards-card-description-wrapper');
    const cardDescription = document.createElement('p');
    cardDescription.classList.add('featurecards-card-description', 'boing--text__body-2', 'text-boing-dark');
    const authoredDescription = authoredCard.querySelector('p[data-aue-prop="description"]');
    if (authoredDescription) {
      cardDescription.innerHTML = authoredDescription.innerHTML;
      moveInstrumentation(authoredDescription, cardDescription);
    }
    descriptionWrapper.append(cardDescription);
    cardContent.append(descriptionWrapper);

    const redirectButtonWrapper = document.createElement('div');
    redirectButtonWrapper.classList.add('featurecards-redirect-button-wrapper', 'd-none');
    const arrowButton = document.createElement('button');
    arrowButton.type = 'button';
    arrowButton.role = 'button';
    arrowButton.classList.add('featurecards-arrow-icon-button');
    // The button content is hardcoded in the HTML, no AUE prop for it.
    arrowButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1765368595856.svg+xml';
    redirectButtonWrapper.append(arrowButton);
    cardContent.append(redirectButtonWrapper);

    cardLink.append(cardContent);
    featureCardsSectionWrapper.append(cardLink);
  });
  featureCardsContainer.append(featureCardsSectionWrapper);

  // Bolte Sitare Card Section (d-none by default in authored HTML)
  const authoredBolteSitareCards = block.querySelectorAll('a.featurecards-bolte-sitare-card-section');
  authoredBolteSitareCards.forEach((authoredCard) => {
    const bolteSitareCardLink = document.createElement('a');
    bolteSitareCardLink.classList.add('featurecards-bolte-sitare-card-section', 'd-none', 'analytics_cta_click', 'text-decoration-none');

    const linkElement = authoredCard.querySelector('a'); // Re-using the authored link for href/title/data-title
    if (linkElement) {
      bolteSitareCardLink.href = linkElement.href;
      bolteSitareCardLink.title = linkElement.title || '';
      bolteSitareCardLink.setAttribute('data-title', linkElement.getAttribute('data-title') || '');
      moveInstrumentation(linkElement, bolteSitareCardLink);
    }

    const bolteSitareCardWrapper = document.createElement('div');
    bolteSitareCardWrapper.classList.add('featurecards-bolte-sitare-card-wrapper', 'd-flex');

    const bolteSitareCardImage = document.createElement('div');
    bolteSitareCardImage.classList.add('featurecards-bolte-sitare-card-image');
    const imgElement = authoredCard.querySelector('img.featurecards-card-image-item');
    if (imgElement) {
      const picture = createOptimizedPicture(imgElement.src, imgElement.alt);
      bolteSitareCardImage.append(picture);
      moveInstrumentation(imgElement, picture.querySelector('img'));
    }
    bolteSitareCardWrapper.append(bolteSitareCardImage);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('featurecards-content-wrapper', 'd-flex', 'flex-column', 'justify-content-between');

    const textDiv = document.createElement('div');
    const cardTitle = document.createElement('h2');
    cardTitle.classList.add('featurecards-bolte-sitare-card-title', 'boing--text__heading-3', 'text-boing-dark');
    const authoredTitle = authoredCard.querySelector('h2.featurecards-bolte-sitare-card-title');
    if (authoredTitle) {
      cardTitle.innerHTML = authoredTitle.innerHTML;
      moveInstrumentation(authoredTitle, cardTitle);
    }
    textDiv.append(cardTitle);

    const cardText = document.createElement('p');
    cardText.classList.add('featurecards-bolte-sitare-card-text', 'boing--text__body-3', 'text-boing-dark');
    const authoredText = authoredCard.querySelector('p.featurecards-bolte-sitare-card-text');
    if (authoredText) {
      cardText.innerHTML = authoredText.innerHTML;
      moveInstrumentation(authoredText, cardText);
    }
    textDiv.append(cardText);
    contentWrapper.append(textDiv);

    const buttonDiv = document.createElement('div');
    const exploreButton = document.createElement('button');
    exploreButton.classList.add('featurecards-bolte-sitare-card-button', 'text-white', 'boing--text__body-4', 'd-inline-block');
    exploreButton.textContent = 'Explore'; // Hardcoded text
    buttonDiv.append(exploreButton);
    contentWrapper.append(buttonDiv);

    bolteSitareCardWrapper.append(contentWrapper);
    bolteSitareCardLink.append(bolteSitareCardWrapper);
    featureCardsContainer.append(bolteSitareCardLink);
  });

  const curveContainer = document.createElement('div');
  curveContainer.classList.add('featurecards-curve-container', 'd-none');
  featureCardsContainer.append(curveContainer);

  block.textContent = '';
  block.append(featureCardsContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
