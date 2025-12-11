import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsContainer = document.createElement('div');
  featureCardsContainer.classList.add('featurecards-container');

  const titleWrapper = block.querySelector('div[data-aue-prop="title"]');
  if (titleWrapper) {
    const featureCardsTextWrapper = document.createElement('div');
    featureCardsTextWrapper.classList.add('featurecards-text-wrapper');
    const h1 = document.createElement('h1');
    h1.classList.add('featurecards-title');

    const titleText = titleWrapper.querySelector('h1, h2, h3, h4, h5, h6');
    if (titleText) {
      h1.innerHTML = titleText.innerHTML;
      moveInstrumentation(titleText, h1);
    }

    featureCardsTextWrapper.append(h1);
    featureCardsContainer.append(featureCardsTextWrapper);
  }

  const cards = block.querySelectorAll('div[data-aue-model="card"]');
  cards.forEach((card) => {
    const section = document.createElement('section');
    section.classList.add('featurecards-section');

    const linkWrapper = card.querySelector('div[data-aue-prop="link"]');
    let linkElement = linkWrapper ? linkWrapper.querySelector('a') : null;

    if (!linkElement) {
      // Fallback for aem-content field that might not wrap in a div
      linkElement = card.querySelector('a');
    }

    const featureCardLink = document.createElement('a');
    featureCardLink.classList.add('featurecards-card-link', 'analytics_cta_click');
    if (linkElement) {
      featureCardLink.href = linkElement.href;
      featureCardLink.title = linkElement.title || '';
      featureCardLink.dataset.ctaLabel = linkElement.dataset.ctaLabel || '';
      moveInstrumentation(linkElement, featureCardLink);
    }

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('featurecards-card-image-wrapper');
    const imgElement = card.querySelector('div[data-aue-prop="image"] img');
    if (imgElement) {
      const picture = createOptimizedPicture(imgElement.src, imgElement.alt || '');
      picture.querySelector('img').classList.add('featurecards-card-image');
      imageWrapper.append(picture);
      moveInstrumentation(imgElement, picture.querySelector('img'));
    } else {
      // Fallback if image is just an <a> tag from aem-content
      const imgAnchor = card.querySelector('div[data-aue-prop="image"] a[href]');
      if (imgAnchor) {
        const picture = createOptimizedPicture(imgAnchor.href, imgAnchor.title || '');
        picture.querySelector('img').classList.add('featurecards-card-image');
        imageWrapper.append(picture);
        moveInstrumentation(imgAnchor, picture.querySelector('img'));
      }
    }
    featureCardLink.append(imageWrapper);

    const cardContent = document.createElement('div');
    cardContent.classList.add('featurecards-card-content');

    const titleElement = card.querySelector('div[data-aue-prop="title"]');
    if (titleElement) {
      const h2 = document.createElement('h2');
      h2.classList.add('featurecards-card-title', 'boing--text__heading-1');
      const titleText = titleElement.querySelector('h1, h2, h3, h4, h5, h6, p');
      if (titleText) {
        h2.textContent = titleText.textContent;
        moveInstrumentation(titleText, h2);
      }
      cardContent.append(h2);
    }

    const descriptionWrapper = document.createElement('div');
    descriptionWrapper.classList.add('featurecards-card-description-wrapper');
    const descriptionElement = card.querySelector('div[data-aue-prop="description"]');
    if (descriptionElement) {
      const p = document.createElement('p');
      p.classList.add('featurecards-card-description', 'boing--text__body-2', 'text-boing-dark');
      const descText = descriptionElement.querySelector('p');
      if (descText) {
        p.innerHTML = descText.innerHTML;
        moveInstrumentation(descText, p);
      }
      descriptionWrapper.append(p);
    }
    cardContent.append(descriptionWrapper);

    const redirectButtonWrapper = document.createElement('div');
    redirectButtonWrapper.classList.add('featurecards-redirect-button-wrapper', 'd-none');
    const button = document.createElement('button');
    button.type = 'button';
    button.role = 'button';
    button.classList.add('featurecards-arrow-icon-button');
    const buttonLabelElement = card.querySelector('div[data-aue-prop="buttonLabel"]');
    if (buttonLabelElement) {
      button.textContent = buttonLabelElement.textContent.trim();
      moveInstrumentation(buttonLabelElement, button);
    }
    redirectButtonWrapper.append(button);
    cardContent.append(redirectButtonWrapper);

    featureCardLink.append(cardContent);
    section.append(featureCardLink);
    featureCardsContainer.append(section);
  });

  // Handle the 'bolte-sitare-card-section' items
  cards.forEach((card) => {
    const linkWrapper = card.querySelector('div[data-aue-prop="link"]');
    let linkElement = linkWrapper ? linkWrapper.querySelector('a') : null;
    if (!linkElement) {
      linkElement = card.querySelector('a');
    }

    const bolteSitareCardSection = document.createElement('a');
    bolteSitareCardSection.classList.add('featurecards-bolte-sitare-card-section', 'd-none', 'analytics_cta_click', 'text-decoration-none');
    if (linkElement) {
      bolteSitareCardSection.href = linkElement.href;
      bolteSitareCardSection.title = linkElement.title || '';
      bolteSitareCardSection.dataset.title = linkElement.dataset.title || linkElement.title || '';
      moveInstrumentation(linkElement, bolteSitareCardSection);
    }

    const bolteSitareCardWrapper = document.createElement('div');
    bolteSitareCardWrapper.classList.add('featurecards-bolte-sitare-card-wrapper', 'd-flex');

    const bolteSitareCardImage = document.createElement('div');
    bolteSitareCardImage.classList.add('featurecards-bolte-sitare-card-image');
    const imgElement = card.querySelector('div[data-aue-prop="image"] img');
    if (imgElement) {
      const picture = createOptimizedPicture(imgElement.src, imgElement.alt || '');
      picture.querySelector('img').classList.add('featurecards-card-image-item');
      bolteSitareCardImage.append(picture);
      moveInstrumentation(imgElement, picture.querySelector('img'));
    } else {
      const imgAnchor = card.querySelector('div[data-aue-prop="image"] a[href]');
      if (imgAnchor) {
        const picture = createOptimizedPicture(imgAnchor.href, imgAnchor.title || '');
        picture.querySelector('img').classList.add('featurecards-card-image-item');
        bolteSitareCardImage.append(picture);
        moveInstrumentation(imgAnchor, picture.querySelector('img'));
      }
    }
    bolteSitareCardWrapper.append(bolteSitareCardImage);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('featurecards-content-wrapper', 'd-flex', 'flex-column', 'justify-content-between');

    const textContentDiv = document.createElement('div');
    const titleElement = card.querySelector('div[data-aue-prop="title"]');
    if (titleElement) {
      const h2 = document.createElement('h2');
      h2.classList.add('featurecards-bolte-sitare-card-title', 'boing--text__heading-3', 'text-boing-dark');
      const titleText = titleElement.querySelector('h1, h2, h3, h4, h5, h6, p');
      if (titleText) {
        h2.textContent = titleText.textContent;
        moveInstrumentation(titleText, h2);
      }
      textContentDiv.append(h2);
    }

    const descriptionElement = card.querySelector('div[data-aue-prop="description"]');
    if (descriptionElement) {
      const p = document.createElement('p');
      p.classList.add('featurecards-bolte-sitare-card-text', 'boing--text__body-3', 'text-boing-dark');
      const descText = descriptionElement.querySelector('p');
      if (descText) {
        p.innerHTML = descText.innerHTML;
        moveInstrumentation(descText, p);
      }
      textContentDiv.append(p);
    }
    contentWrapper.append(textContentDiv);

    const buttonDiv = document.createElement('div');
    const button = document.createElement('button');
    button.classList.add('featurecards-bolte-sitare-card-button', 'text-white', 'boing--text__body-4', 'd-inline-block');
    const buttonLabelElement = card.querySelector('div[data-aue-prop="buttonLabel"]');
    if (buttonLabelElement) {
      button.textContent = buttonLabelElement.textContent.trim();
      moveInstrumentation(buttonLabelElement, button);
    }
    buttonDiv.append(button);
    contentWrapper.append(buttonDiv);

    bolteSitareCardWrapper.append(contentWrapper);
    bolteSitareCardSection.append(bolteSitareCardWrapper);
    featureCardsContainer.append(bolteSitareCardSection);
  });

  const curveContainer = document.createElement('div');
  curveContainer.classList.add('featurecards-curve-container', 'd-none');
  featureCardsContainer.append(curveContainer);

  block.textContent = '';
  block.append(featureCardsContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
