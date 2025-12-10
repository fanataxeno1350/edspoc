import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainContainer = document.createElement('div');
  mainContainer.className = 'featurecards-container';

  const titleWrapper = block.querySelector('[data-aue-prop="title"]');
  if (titleWrapper) {
    const textWrapper = document.createElement('div');
    textWrapper.id = `text-${Math.random().toString(36).substring(2, 11)}`; // Generate a unique ID
    textWrapper.className = 'featurecards-text-wrapper';
    const h1 = document.createElement('h1');
    h1.className = 'featurecards-title';

    const highlightSpan = titleWrapper.querySelector('.featurecards-title-highlight');
    if (highlightSpan) {
      h1.append(titleWrapper.firstChild.cloneNode(true)); // Text before span
      h1.append(highlightSpan.cloneNode(true));
      h1.append(titleWrapper.lastChild.cloneNode(true)); // Text after span
    } else {
      h1.innerHTML = titleWrapper.innerHTML;
    }
    textWrapper.append(h1);
    moveInstrumentation(titleWrapper, textWrapper);
    mainContainer.append(textWrapper);
  }

  const featureCards = block.querySelectorAll('[data-aue-model="featurecard"]');
  featureCards.forEach((card) => {
    const section = document.createElement('section');
    section.className = 'featurecards-section';

    const linkEl = card.querySelector('a[data-aue-prop="link"]');
    const href = linkEl ? linkEl.href : '#';
    const title = linkEl ? linkEl.title : '';
    const ctaLabel = linkEl ? linkEl.dataset.ctaLabel : '';

    const cardLink = document.createElement('a');
    cardLink.className = 'featurecards-card-link analytics_cta_click';
    cardLink.href = href;
    cardLink.title = title;
    if (ctaLabel) {
      cardLink.dataset.ctaLabel = ctaLabel;
    }

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'featurecards-card-image-wrapper';
    const imgEl = card.querySelector('img[data-aue-prop="image"]');
    if (imgEl) {
      const picture = createOptimizedPicture(imgEl.src, imgEl.alt, false, [{ width: '750' }]);
      const newImg = picture.querySelector('img');
      newImg.className = 'featurecards-card-image';
      moveInstrumentation(imgEl, newImg);
      imageWrapper.append(picture);
    } else {
      // Fallback for missing image, try to find an <img> within the card
      const fallbackImg = card.querySelector('img');
      if (fallbackImg) {
        const picture = createOptimizedPicture(fallbackImg.src, fallbackImg.alt, false, [{ width: '750' }]);
        const newImg = picture.querySelector('img');
        newImg.className = 'featurecards-card-image';
        moveInstrumentation(fallbackImg, newImg);
        imageWrapper.append(picture);
      }
    }
    cardLink.append(imageWrapper);

    const cardContent = document.createElement('div');
    cardContent.className = 'featurecards-card-content';

    const cardTitleEl = card.querySelector('[data-aue-prop="title"]');
    if (cardTitleEl) {
      const h2 = document.createElement('h2');
      h2.className = 'featurecards-card-title boing--text__heading-1';
      h2.innerHTML = cardTitleEl.innerHTML;
      moveInstrumentation(cardTitleEl, h2);
      cardContent.append(h2);
    }

    const descriptionWrapper = document.createElement('div');
    descriptionWrapper.className = 'featurecards-card-description-wrapper';
    const cardDescriptionEl = card.querySelector('[data-aue-prop="description"]');
    if (cardDescriptionEl) {
      const p = document.createElement('p');
      p.className = 'featurecards-card-description boing--text__body-2 text-boing-dark';
      p.innerHTML = cardDescriptionEl.innerHTML;
      moveInstrumentation(cardDescriptionEl, p);
      descriptionWrapper.append(p);
    }
    cardContent.append(descriptionWrapper);

    const redirectButtonWrapper = document.createElement('div');
    redirectButtonWrapper.className = 'featurecards-redirect-button-wrapper d-none';
    const button = document.createElement('button');
    button.type = 'button';
    button.role = 'button';
    button.className = 'featurecards-arrow-icon-button';
    // The button content seems to be an SVG path, which is not directly authored as a field.
    // We'll mimic the static HTML here. In a real scenario, this might be an icon field.
    const existingButton = card.querySelector('.featurecards-arrow-icon-button');
    if (existingButton) {
      button.innerHTML = existingButton.innerHTML;
    } else {
      button.textContent = '/content/dam/aemigrate/uploaded-folder/image/1765368595856.svg+xml';
    }
    redirectButtonWrapper.append(button);
    cardContent.append(redirectButtonWrapper);

    cardLink.append(cardContent);
    moveInstrumentation(card, cardLink);
    section.append(cardLink);
    mainContainer.append(section);
  });

  // Bolte Sitare Card Section (d-none, but still needs to be built if present in authored HTML)
  const bolteSitareCards = block.querySelectorAll('a.featurecards-bolte-sitare-card-section.d-none');
  bolteSitareCards.forEach((card) => {
    const newCardLink = document.createElement('a');
    newCardLink.className = 'featurecards-bolte-sitare-card-section d-none analytics_cta_click text-decoration-none';
    newCardLink.href = card.href;
    newCardLink.title = card.title;
    if (card.dataset.title) {
      newCardLink.dataset.title = card.dataset.title;
    }

    const cardWrapper = document.createElement('div');
    cardWrapper.className = 'featurecards-bolte-sitare-card-wrapper d-flex';

    const imageDiv = document.createElement('div');
    imageDiv.className = 'featurecards-bolte-sitare-card-image';
    const imgEl = card.querySelector('img.featurecards-card-image-item');
    if (imgEl) {
      const picture = createOptimizedPicture(imgEl.src, imgEl.alt, false, [{ width: '750' }]);
      const newImg = picture.querySelector('img');
      newImg.className = 'featurecards-card-image-item';
      moveInstrumentation(imgEl, newImg);
      imageDiv.append(picture);
    }
    cardWrapper.append(imageDiv);

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'featurecards-content-wrapper d-flex flex-column justify-content-between';

    const textDiv = document.createElement('div');
    const h2 = document.createElement('h2');
    h2.className = 'featurecards-bolte-sitare-card-title boing--text__heading-3 text-boing-dark';
    const authoredH2 = card.querySelector('.featurecards-bolte-sitare-card-title');
    if (authoredH2) {
      h2.innerHTML = authoredH2.innerHTML;
      moveInstrumentation(authoredH2, h2);
    }
    textDiv.append(h2);

    const p = document.createElement('p');
    p.className = 'featurecards-bolte-sitare-card-text boing--text__body-3 text-boing-dark';
    const authoredP = card.querySelector('.featurecards-bolte-sitare-card-text');
    if (authoredP) {
      p.innerHTML = authoredP.innerHTML;
      moveInstrumentation(authoredP, p);
    }
    textDiv.append(p);
    contentWrapper.append(textDiv);

    const buttonDiv = document.createElement('div');
    const button = document.createElement('button');
    button.className = 'featurecards-bolte-sitare-card-button text-white boing--text__body-4 d-inline-block';
    const authoredButton = card.querySelector('.featurecards-bolte-sitare-card-button');
    if (authoredButton) {
      button.innerHTML = authoredButton.innerHTML;
      moveInstrumentation(authoredButton, button);
    } else {
      button.textContent = 'Explore';
    }
    buttonDiv.append(button);
    contentWrapper.append(buttonDiv);

    cardWrapper.append(contentWrapper);
    newCardLink.append(cardWrapper);
    moveInstrumentation(card, newCardLink);
    mainContainer.append(newCardLink);
  });

  // Curve container (if present in authored HTML)
  const curveContainer = block.querySelector('.featurecards-curve-container.d-none');
  if (curveContainer) {
    const newCurveContainer = document.createElement('div');
    newCurveContainer.className = 'featurecards-curve-container d-none';
    moveInstrumentation(curveContainer, newCurveContainer);
    mainContainer.append(newCurveContainer);
  }

  block.textContent = '';
  block.append(mainContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
