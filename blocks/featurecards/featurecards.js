import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featurecardsContainer = document.createElement('div');
  featurecardsContainer.classList.add('featurecards-container');

  const titleWrapper = document.createElement('div');
  titleWrapper.classList.add('featurecards-text');
  const titleElement = block.querySelector('[data-aue-prop="title"]');
  if (titleElement) {
    titleWrapper.append(titleElement);
    moveInstrumentation(titleElement, titleWrapper);
  }
  featurecardsContainer.append(titleWrapper);

  const cardItems = block.querySelectorAll('[data-aue-model="card"]');
  cardItems.forEach((cardItem) => {
    const section = document.createElement('section');
    section.classList.add('featurecards-section', 'featurecards-card-item');

    const link = cardItem.querySelector('[data-aue-prop="link"]');
    const cardLink = document.createElement('a');
    cardLink.classList.add('featurecards-link', 'analytics_cta_click');
    if (link) {
      cardLink.href = link.href || '#';
      cardLink.title = link.title || '';
      cardLink.dataset.ctaLabel = link.dataset.ctaLabel || '';
      moveInstrumentation(link, cardLink);
    }

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('featurecards-image-wrapper');
    const image = cardItem.querySelector('[data-aue-prop="image"]');
    if (image) {
      const img = image.querySelector('img');
      if (img) {
        imageWrapper.append(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));
        imageWrapper.querySelector('img').classList.add('featurecards-image');
      }
      moveInstrumentation(image, imageWrapper);
    }
    cardLink.append(imageWrapper);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('featurecards-content-wrapper');

    const cardTitle = cardItem.querySelector('[data-aue-prop="cardTitle"]');
    if (cardTitle) {
      const h2 = document.createElement('h2');
      h2.classList.add('featurecards-card-title', 'boing--text__heading-1');
      h2.innerHTML = cardTitle.innerHTML;
      contentWrapper.append(h2);
      moveInstrumentation(cardTitle, h2);
    }

    const descriptionWrapper = document.createElement('div');
    descriptionWrapper.classList.add('featurecards-description-wrapper');
    const description = cardItem.querySelector('[data-aue-prop="description"]');
    if (description) {
      const p = document.createElement('p');
      p.classList.add('featurecards-card-description', 'boing--text__body-2', 'text-boing-dark');
      p.innerHTML = description.innerHTML;
      descriptionWrapper.append(p);
      moveInstrumentation(description, p);
    }
    contentWrapper.append(descriptionWrapper);

    const redirectButtonWrapper = document.createElement('div');
    redirectButtonWrapper.classList.add('featurecards-redirect-button-wrapper');
    const icon = cardItem.querySelector('[data-aue-prop="icon"]');
    if (icon) {
      const button = document.createElement('button');
      button.type = 'button';
      button.role = 'button';
      button.classList.add('featurecards-arrow-icon-btn');
      const svg = icon.querySelector('img');
      if (svg) {
        button.innerHTML = svg.outerHTML;
      } else {
        button.textContent = icon.textContent.trim();
      }
      redirectButtonWrapper.append(button);
      moveInstrumentation(icon, button);
    }
    contentWrapper.append(redirectButtonWrapper);

    cardLink.append(contentWrapper);
    section.append(cardLink);
    moveInstrumentation(cardItem, section);
    featurecardsContainer.append(section);
  });

  const bolteSitareCards = block.querySelectorAll('[data-aue-model="boltesitarecard"]');
  bolteSitareCards.forEach((bolteSitareCard) => {
    const cardLink = document.createElement('a');
    cardLink.classList.add('featurecards-bolte-sitare-card-section', 'analytics_cta_click');

    const link = bolteSitareCard.querySelector('[data-aue-prop="link"]');
    if (link) {
      cardLink.href = link.href || '#';
      cardLink.title = link.title || '';
      cardLink.dataset.title = link.dataset.title || '';
      moveInstrumentation(link, cardLink);
    }

    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('featurecards-bolte-sitare-card-wrapper');

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('featurecards-bolte-sitare-card-image');
    const image = bolteSitareCard.querySelector('[data-aue-prop="image"]');
    if (image) {
      const img = image.querySelector('img');
      if (img) {
        imageDiv.append(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));
        imageDiv.querySelector('img').classList.add('featurecards-bolte-sitare-card-img');
      }
      moveInstrumentation(image, imageDiv);
    }
    cardWrapper.append(imageDiv);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('featurecards-bolte-sitare-content-wrapper');

    const textDiv = document.createElement('div');
    const cardTitle = bolteSitareCard.querySelector('[data-aue-prop="cardTitle"]');
    if (cardTitle) {
      const h2 = document.createElement('h2');
      h2.classList.add('featurecards-bolte-sitare-card-title', 'boing--text__heading-3', 'text-boing-dark');
      h2.innerHTML = cardTitle.innerHTML;
      textDiv.append(h2);
      moveInstrumentation(cardTitle, h2);
    }

    const description = bolteSitareCard.querySelector('[data-aue-prop="description"]');
    if (description) {
      const p = document.createElement('p');
      p.classList.add('featurecards-bolte-sitare-card-text', 'boing--text__body-3', 'text-boing-dark');
      p.innerHTML = description.innerHTML;
      textDiv.append(p);
      moveInstrumentation(description, p);
    }
    contentWrapper.append(textDiv);

    const buttonDiv = document.createElement('div');
    const buttonText = bolteSitareCard.querySelector('[data-aue-prop="buttonText"]');
    if (buttonText) {
      const button = document.createElement('button');
      button.classList.add('featurecards-bolte-sitare-card-btn', 'text-white', 'boing--text__body-4');
      button.textContent = buttonText.textContent.trim();
      buttonDiv.append(button);
      moveInstrumentation(buttonText, button);
    }
    contentWrapper.append(buttonDiv);

    cardWrapper.append(contentWrapper);
    cardLink.append(cardWrapper);
    moveInstrumentation(bolteSitareCard, cardLink);
    featurecardsContainer.append(cardLink);
  });

  const curveContainer = document.createElement('div');
  curveContainer.classList.add('featurecards-curve-container');
  featurecardsContainer.append(curveContainer);

  block.textContent = '';
  block.append(featurecardsContainer);
  block.className = `featurecards block`;
  block.dataset.blockStatus = 'loaded';
}
