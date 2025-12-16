import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featurecardsContainer = document.createElement('div');
  featurecardsContainer.classList.add('featurecards-container');

  const titleWrapper = block.querySelector('div:first-child');
  if (titleWrapper) {
    const h1 = titleWrapper.querySelector('h1');
    if (h1) {
      const featurecardsTextWrapper = document.createElement('div');
      featurecardsTextWrapper.classList.add('featurecards-text-wrapper');

      const featurecardsTitle = document.createElement('h1');
      featurecardsTitle.classList.add('featurecards-title');
      featurecardsTitle.innerHTML = h1.innerHTML;

      featurecardsTextWrapper.append(featurecardsTitle);
      featurecardsContainer.append(featurecardsTextWrapper);
      moveInstrumentation(titleWrapper, featurecardsTextWrapper);
    }
  }

  const cardModels = block.querySelectorAll('[data-aue-model="card"]');
  cardModels.forEach((cardModel) => {
    const section = document.createElement('section');
    section.classList.add('featurecards-section');

    const linkElement = cardModel.querySelector('a[data-aue-prop="link"]');
    const cardLink = document.createElement('a');
    cardLink.classList.add('featurecards-card-link', 'analytics_cta_click');
    if (linkElement) {
      cardLink.href = linkElement.href;
      cardLink.title = linkElement.textContent.trim() || 'Explore';
      cardLink.dataset.ctaLabel = linkElement.textContent.trim() || 'Explore';
    }

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('featurecards-card-image-wrapper');
    const imgElement = cardModel.querySelector('img[data-aue-prop="image"]');
    if (imgElement) {
      const picture = createOptimizedPicture(imgElement.src, imgElement.alt || '', false, [{ width: '750' }]);
      picture.querySelector('img').classList.add('featurecards-card-image');
      imageWrapper.append(picture);
    }

    const cardContent = document.createElement('div');
    cardContent.classList.add('featurecards-card-content');

    const titleElement = cardModel.querySelector('[data-aue-prop="title"]');
    if (titleElement) {
      const cardTitle = document.createElement('h2');
      cardTitle.classList.add('featurecards-card-title', 'boing--text__heading-1');
      cardTitle.textContent = titleElement.textContent.trim();
      cardContent.append(cardTitle);
    }

    const descriptionElement = cardModel.querySelector('[data-aue-prop="description"]');
    if (descriptionElement) {
      const descriptionWrapper = document.createElement('div');
      descriptionWrapper.classList.add('featurecards-card-description-wrapper');
      const cardDescription = document.createElement('p');
      cardDescription.classList.add('featurecards-card-description', 'boing--text__body-2', 'text-boing-dark');
      cardDescription.innerHTML = descriptionElement.innerHTML;
      descriptionWrapper.append(cardDescription);
      cardContent.append(descriptionWrapper);
    }

    const redirectButtonWrapper = document.createElement('div');
    redirectButtonWrapper.classList.add('featurecards-redirect-button-wrapper', 'd-none');
    const arrowButton = document.createElement('button');
    arrowButton.type = 'button';
    arrowButton.role = 'button';
    arrowButton.classList.add('featurecards-arrow-icon-button');
    // Assuming the button content is an SVG path or URL, which is not directly authorable via AUE prop.
    // For now, it's left empty or you can add a default SVG if needed.
    redirectButtonWrapper.append(arrowButton);
    cardContent.append(redirectButtonWrapper);

    cardLink.append(imageWrapper, cardContent);
    section.append(cardLink);
    featurecardsContainer.append(section);
    moveInstrumentation(cardModel, section);
  });

  // Handle the 'bolte-sitare' card sections (currently d-none in HTML)
  // These are not directly mapped to AUE models in the provided JSON, but exist in the sample HTML.
  // If these are meant to be authored, they would need their own AUE model.
  // For now, we will create them as static elements based on the sample HTML structure if they exist in the block's children.
  const bolteSitareCards = block.querySelectorAll('div > a.featurecards-bolte-sitare-card-section');
  bolteSitareCards.forEach((bolteSitareCard) => {
    const newBolteSitareCard = document.createElement('a');
    newBolteSitareCard.classList.add('featurecards-bolte-sitare-card-section', 'd-none', 'analytics_cta_click', 'text-decoration-none');
    newBolteSitareCard.href = bolteSitareCard.href;
    newBolteSitareCard.title = bolteSitareCard.title;
    newBolteSitareCard.dataset.title = bolteSitareCard.dataset.title;

    const bolteSitareCardWrapper = document.createElement('div');
    bolteSitareCardWrapper.classList.add('featurecards-bolte-sitare-card-wrapper', 'd-flex');

    const bolteSitareCardImage = document.createElement('div');
    bolteSitareCardImage.classList.add('featurecards-bolte-sitare-card-image');
    const img = bolteSitareCard.querySelector('img');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt || '', false, [{ width: '750' }]);
      picture.querySelector('img').classList.add('featurecards-card-image-item');
      bolteSitareCardImage.append(picture);
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('featurecards-content-wrapper', 'd-flex', 'flex-column', 'justify-content-between');

    const textDiv = document.createElement('div');
    const h2 = bolteSitareCard.querySelector('h2');
    if (h2) {
      const bolteSitareCardTitle = document.createElement('h2');
      bolteSitareCardTitle.classList.add('featurecards-bolte-sitare-card-title', 'boing--text__heading-3', 'text-boing-dark');
      bolteSitareCardTitle.textContent = h2.textContent;
      textDiv.append(bolteSitareCardTitle);
    }
    const p = bolteSitareCard.querySelector('p');
    if (p) {
      const bolteSitareCardText = document.createElement('p');
      bolteSitareCardText.classList.add('featurecards-bolte-sitare-card-text', 'boing--text__body-3', 'text-boing-dark');
      bolteSitareCardText.textContent = p.textContent;
      textDiv.append(bolteSitareCardText);
    }
    contentWrapper.append(textDiv);

    const buttonDiv = document.createElement('div');
    const button = bolteSitareCard.querySelector('button');
    if (button) {
      const bolteSitareCardButton = document.createElement('button');
      bolteSitareCardButton.classList.add('featurecards-bolte-sitare-card-button', 'text-white', 'boing--text__body-4', 'd-inline-block');
      bolteSitareCardButton.textContent = button.textContent;
      buttonDiv.append(bolteSitareCardButton);
    }
    contentWrapper.append(buttonDiv);

    bolteSitareCardWrapper.append(bolteSitareCardImage, contentWrapper);
    newBolteSitareCard.append(bolteSitareCardWrapper);
    featurecardsContainer.append(newBolteSitareCard);
    moveInstrumentation(bolteSitareCard, newBolteSitareCard);
  });

  const curveContainer = document.createElement('div');
  curveContainer.classList.add('featurecards-curve-container', 'd-none');
  featurecardsContainer.append(curveContainer);

  block.textContent = '';
  block.append(featurecardsContainer);
  block.classList.add('featurecards');
  block.dataset.blockStatus = 'loaded';
}
