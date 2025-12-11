import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featurecardsContainer = document.createElement('div');
  featurecardsContainer.classList.add('featurecards-container');

  const titleWrapper = document.createElement('div');
  titleWrapper.classList.add('featurecards-text-wrapper');
  const titleElement = document.createElement('h1');
  titleElement.classList.add('featurecards-title');
  const titleText = block.querySelector('h1');
  if (titleText) {
    titleElement.innerHTML = titleText.innerHTML;
    moveInstrumentation(titleText, titleElement);
  }
  titleWrapper.append(titleElement);
  featurecardsContainer.append(titleWrapper);

  const featureCards = block.querySelectorAll('[data-aue-model="featurecard"]');
  featureCards.forEach((card) => {
    const section = document.createElement('section');
    section.classList.add('featurecards-section');

    const link = document.createElement('a');
    link.classList.add('featurecards-card-link', 'analytics_cta_click');

    const linkElement = card.querySelector('[data-aue-prop="link"]');
    if (linkElement) {
      link.href = linkElement.href;
      link.title = linkElement.title || linkElement.textContent;
      link.setAttribute('data-cta-label', linkElement.title || linkElement.textContent);
      moveInstrumentation(linkElement, link);
    }

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('featurecards-card-image-wrapper');
    const img = card.querySelector('[data-aue-prop="image"] img');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt);
      picture.querySelector('img').classList.add('featurecards-card-image');
      imageWrapper.append(picture);
      moveInstrumentation(img, picture.querySelector('img'));
    }
    link.append(imageWrapper);

    const content = document.createElement('div');
    content.classList.add('featurecards-card-content');

    const cardTitle = document.createElement('h2');
    cardTitle.classList.add('featurecards-card-title', 'boing--text__heading-1');
    const authoredTitle = card.querySelector('[data-aue-prop="title"]');
    if (authoredTitle) {
      cardTitle.innerHTML = authoredTitle.innerHTML;
      moveInstrumentation(authoredTitle, cardTitle);
    }
    content.append(cardTitle);

    const descriptionWrapper = document.createElement('div');
    descriptionWrapper.classList.add('featurecards-card-description-wrapper');
    const description = document.createElement('p');
    description.classList.add('featurecards-card-description', 'boing--text__body-2', 'text-boing-dark');
    const authoredDescription = card.querySelector('[data-aue-prop="description"]');
    if (authoredDescription) {
      description.innerHTML = authoredDescription.innerHTML;
      moveInstrumentation(authoredDescription, description);
    }
    descriptionWrapper.append(description);
    content.append(descriptionWrapper);

    const redirectButtonWrapper = document.createElement('div');
    redirectButtonWrapper.classList.add('featurecards-redirect-button-wrapper', 'd-none');
    const button = document.createElement('button');
    button.type = 'button';
    button.role = 'button';
    button.classList.add('featurecards-arrow-icon-button');
    redirectButtonWrapper.append(button);
    content.append(redirectButtonWrapper);

    link.append(content);
    section.append(link);
    featurecardsContainer.append(section);

    // Bolte Sitare Card Section (d-none by default in sample HTML)
    const bolteSitareCardSection = document.createElement('a');
    bolteSitareCardSection.classList.add('featurecards-bolte-sitare-card-section', 'd-none', 'analytics_cta_click', 'text-decoration-none');
    if (linkElement) {
      bolteSitareCardSection.href = linkElement.href;
      bolteSitareCardSection.title = linkElement.title || linkElement.textContent;
      bolteSitareCardSection.setAttribute('data-title', linkElement.title || linkElement.textContent);
    }

    const bolteSitareCardWrapper = document.createElement('div');
    bolteSitareCardWrapper.classList.add('featurecards-bolte-sitare-card-wrapper', 'd-flex');

    const bolteSitareCardImage = document.createElement('div');
    bolteSitareCardImage.classList.add('featurecards-bolte-sitare-card-image');
    if (img) {
      const bolteSitarePicture = createOptimizedPicture(img.src, img.alt);
      bolteSitarePicture.querySelector('img').classList.add('featurecards-card-image-item');
      bolteSitareCardImage.append(bolteSitarePicture);
    }
    bolteSitareCardWrapper.append(bolteSitareCardImage);

    const bolteSitareContentWrapper = document.createElement('div');
    bolteSitareContentWrapper.classList.add('featurecards-content-wrapper', 'd-flex', 'flex-column', 'justify-content-between');

    const bolteSitareTextDiv = document.createElement('div');
    const bolteSitareTitle = document.createElement('h2');
    bolteSitareTitle.classList.add('featurecards-bolte-sitare-card-title', 'boing--text__heading-3', 'text-boing-dark');
    if (authoredTitle) {
      bolteSitareTitle.innerHTML = authoredTitle.innerHTML;
    }
    bolteSitareTextDiv.append(bolteSitareTitle);

    const bolteSitareDescription = document.createElement('p');
    bolteSitareDescription.classList.add('featurecards-bolte-sitare-card-text', 'boing--text__body-3', 'text-boing-dark');
    if (authoredDescription) {
      bolteSitareDescription.innerHTML = authoredDescription.innerHTML;
    }
    bolteSitareTextDiv.append(bolteSitareDescription);
    bolteSitareContentWrapper.append(bolteSitareTextDiv);

    const bolteSitareButtonDiv = document.createElement('div');
    const bolteSitareButton = document.createElement('button');
    bolteSitareButton.classList.add('featurecards-bolte-sitare-card-button', 'text-white', 'boing--text__body-4', 'd-inline-block');
    bolteSitareButton.textContent = 'Explore';
    bolteSitareButtonDiv.append(bolteSitareButton);
    bolteSitareContentWrapper.append(bolteSitareButtonDiv);

    bolteSitareCardWrapper.append(bolteSitareContentWrapper);
    bolteSitareCardSection.append(bolteSitareCardWrapper);
    featurecardsContainer.append(bolteSitareCardSection);
  });

  const curveContainer = document.createElement('div');
  curveContainer.classList.add('featurecards-curve-container', 'd-none');
  featurecardsContainer.append(curveContainer);

  block.textContent = '';
  block.append(featurecardsContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}