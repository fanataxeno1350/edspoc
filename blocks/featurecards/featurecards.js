import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsContainer = document.createElement('div');
  featureCardsContainer.className = 'featurecards-container';

  const textWrapper = block.querySelector('[data-aue-prop="title"]')?.closest('div');
  if (textWrapper) {
    const h1 = textWrapper.querySelector('h1');
    const span = h1?.querySelector('span');
    if (h1 && span) {
      h1.className = 'featurecards-title';
      span.className = 'featurecards-title-highlight';
    }
    textWrapper.className = 'featurecards-text-wrapper';
    featureCardsContainer.append(textWrapper);
    moveInstrumentation(block.querySelector('[data-aue-prop="title"]'), h1);
  }

  const sections = block.querySelectorAll('[data-aue-model="featurecardItem"]');
  sections.forEach((section) => {
    const featurecardsSection = document.createElement('section');
    featurecardsSection.className = 'featurecards-section';

    const linkEl = section.querySelector('a[data-aue-prop="link"]');
    const linkHref = linkEl?.getAttribute('href') || '#';
    const linkTitle = linkEl?.getAttribute('title') || '';
    const linkCtaLabel = linkEl?.dataset.ctaLabel || '';

    const cardLink = document.createElement('a');
    cardLink.className = 'featurecards-card-link analytics_cta_click';
    cardLink.href = linkHref;
    cardLink.title = linkTitle;
    cardLink.dataset.ctaLabel = linkCtaLabel;
    moveInstrumentation(linkEl, cardLink);

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'featurecards-card-image-wrapper';

    const imgEl = section.querySelector('img[data-aue-prop="image"]');
    if (imgEl) {
      const picture = createOptimizedPicture(imgEl.src, imgEl.alt);
      const newImg = picture.querySelector('img');
      newImg.className = 'featurecards-card-image';
      imageWrapper.append(picture);
      moveInstrumentation(imgEl, newImg);
    }
    cardLink.append(imageWrapper);

    const cardContent = document.createElement('div');
    cardContent.className = 'featurecards-card-content';

    const titleEl = section.querySelector('h2[data-aue-prop="title"]');
    if (titleEl) {
      titleEl.className = 'featurecards-card-title boing--text__heading-1';
      cardContent.append(titleEl);
    }

    const descriptionWrapper = document.createElement('div');
    descriptionWrapper.className = 'featurecards-card-description-wrapper';
    const descriptionEl = section.querySelector('p[data-aue-prop="description"]');
    if (descriptionEl) {
      descriptionEl.className = 'featurecards-card-description boing--text__body-2 text-boing-dark';
      descriptionWrapper.append(descriptionEl);
      cardContent.append(descriptionWrapper);
    }

    const redirectButtonWrapper = document.createElement('div');
    redirectButtonWrapper.className = 'featurecards-redirect-button-wrapper d-none';
    const button = document.createElement('button');
    button.type = 'button';
    button.role = 'button';
    button.className = 'featurecards-arrow-icon-button';
    // Assuming the button content is static or not directly authored via AUE
    // If it needs to be dynamic, additional AUE prop would be needed.
    // For now, it's an empty button as per the provided HTML.
    redirectButtonWrapper.append(button);
    cardContent.append(redirectButtonWrapper);

    cardLink.append(cardContent);
    featurecardsSection.append(cardLink);
    featureCardsContainer.append(featurecardsSection);
  });

  // Handle the 'bolte sitare' card sections which are initially hidden
  const bolteSitareSections = block.querySelectorAll('a.featurecards-bolte-sitare-card-section');
  bolteSitareSections.forEach((bolteSitareSection) => {
    const newBolteSitareSection = document.createElement('a');
    newBolteSitareSection.className = 'featurecards-bolte-sitare-card-section d-none analytics_cta_click text-decoration-none';
    newBolteSitareSection.href = bolteSitareSection.href;
    newBolteSitareSection.title = bolteSitareSection.title;
    newBolteSitareSection.dataset.title = bolteSitareSection.dataset.title;

    const cardWrapper = document.createElement('div');
    cardWrapper.className = 'featurecards-bolte-sitare-card-wrapper d-flex';

    const cardImageDiv = document.createElement('div');
    cardImageDiv.className = 'featurecards-bolte-sitare-card-image';
    const imgEl = bolteSitareSection.querySelector('img');
    if (imgEl) {
      const picture = createOptimizedPicture(imgEl.src, imgEl.alt);
      const newImg = picture.querySelector('img');
      newImg.className = 'featurecards-card-image-item';
      cardImageDiv.append(picture);
      moveInstrumentation(imgEl, newImg);
    }
    cardWrapper.append(cardImageDiv);

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'featurecards-content-wrapper d-flex flex-column justify-content-between';

    const textContentDiv = document.createElement('div');
    const h2 = bolteSitareSection.querySelector('h2');
    if (h2) {
      h2.className = 'featurecards-bolte-sitare-card-title boing--text__heading-3 text-boing-dark';
      textContentDiv.append(h2);
    }
    const p = bolteSitareSection.querySelector('p');
    if (p) {
      p.className = 'featurecards-bolte-sitare-card-text boing--text__body-3 text-boing-dark';
      textContentDiv.append(p);
    }
    contentWrapper.append(textContentDiv);

    const buttonDiv = document.createElement('div');
    const button = bolteSitareSection.querySelector('button');
    if (button) {
      button.className = 'featurecards-bolte-sitare-card-button text-white boing--text__body-4 d-inline-block';
      buttonDiv.append(button);
    }
    contentWrapper.append(buttonDiv);

    cardWrapper.append(contentWrapper);
    newBolteSitareSection.append(cardWrapper);
    featureCardsContainer.append(newBolteSitareSection);
    moveInstrumentation(bolteSitareSection, newBolteSitareSection);
  });

  const curveContainer = block.querySelector('.featurecards-curve-container');
  if (curveContainer) {
    featureCardsContainer.append(curveContainer);
  }

  block.textContent = '';
  block.append(featureCardsContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
