import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsWrapper = document.createElement('div');
  featureCardsWrapper.classList.add('featurecards-wrapper');
  moveInstrumentation(block, featureCardsWrapper);

  const titleContainer = block.querySelector('div[data-aue-prop="title"]');
  if (titleContainer) {
    const textDiv = document.createElement('div');
    textDiv.id = 'text-68763da680'; // Hardcoded ID from example, consider dynamic if needed
    textDiv.classList.add('featurecards-text');

    const h1 = document.createElement('h1');
    h1.classList.add('featurecards-title');

    const titleText = document.createElement('span');
    titleText.classList.add('featurecards-title-partial');
    titleText.append(...titleContainer.childNodes);
    moveInstrumentation(titleContainer, titleText);

    h1.append('Welcome to ', titleText);
    textDiv.append(h1);
    featureCardsWrapper.append(textDiv);
  }

  const cards = block.querySelectorAll('[data-aue-model="card"]');
  cards.forEach((card) => {
    const section = document.createElement('section');
    section.classList.add('featurecards-section', 'featurecards-card', 'featurecards-mx-auto');
    moveInstrumentation(card, section);

    const linkEl = card.querySelector('[data-aue-prop="link"]');
    const linkHref = linkEl ? linkEl.href : '#';
    const linkTitle = linkEl ? linkEl.title : '';

    const anchor = document.createElement('a');
    anchor.classList.add('featurecards-link', 'featurecards-d-flex', 'featurecards-flex-column', 'featurecards-text-decoration-none');
    anchor.href = linkHref;
    anchor.title = linkTitle;
    anchor.setAttribute('data-cta-label', linkTitle);
    if (linkEl) moveInstrumentation(linkEl, anchor);

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('featurecards-image', 'featurecards-w-100', 'featurecards-pb-4');

    const imageEl = card.querySelector('[data-aue-prop="image"]');
    const altEl = card.querySelector('[data-aue-prop="alt"]');
    const altText = altEl ? altEl.textContent : '';

    if (imageEl) {
      const picture = createOptimizedPicture(imageEl.src, altText);
      picture.querySelector('img').classList.add('featurecards-w-100', 'featurecards-h-100');
      imageContainer.append(picture);
      moveInstrumentation(imageEl, picture.querySelector('img'));
      if (altEl) moveInstrumentation(altEl, picture.querySelector('img'));
    }
    anchor.append(imageContainer);

    const textCenterDiv = document.createElement('div');
    textCenterDiv.classList.add('featurecards-text-center');

    const titleH2 = document.createElement('h2');
    titleH2.classList.add('featurecards-title-h2', 'featurecards-boing-text__heading-1');
    const cardTitleEl = card.querySelector('[data-aue-prop="title"]');
    if (cardTitleEl) {
      titleH2.append(...cardTitleEl.childNodes);
      moveInstrumentation(cardTitleEl, titleH2);
    }
    textCenterDiv.append(titleH2);

    const pb5Div = document.createElement('div');
    pb5Div.classList.add('featurecards-pb-5');

    const descP = document.createElement('p');
    descP.classList.add('featurecards-desc', 'featurecards-boing-text__body-2', 'featurecards-text-boing-dark');
    const descriptionEl = card.querySelector('[data-aue-prop="description"]');
    if (descriptionEl) {
      descP.append(...descriptionEl.childNodes);
      moveInstrumentation(descriptionEl, descP);
    }
    pb5Div.append(descP);
    textCenterDiv.append(pb5Div);

    // The redirected-btn is not explicitly in the JSON model, but present in the HTML
    // We'll create it as a placeholder if needed, or omit if it's purely presentation.
    // For now, let's include it as a static element based on the example HTML.
    const redirectedBtnDiv = document.createElement('div');
    redirectedBtnDiv.classList.add('featurecards-redirected-btn', 'featurecards-d-none');
    const button = document.createElement('button');
    button.type = 'button';
    button.role = 'button';
    button.classList.add('featurecards-arrow-icon-btn');
    button.textContent = '/content/dam/aemigrate/uploaded-folder/image/1761293302381.svg+xml'; // Static content for now
    redirectedBtnDiv.append(button);
    textCenterDiv.append(redirectedBtnDiv);

    anchor.append(textCenterDiv);
    section.append(anchor);
    featureCardsWrapper.append(section);
  });

  // Handle the 'bolte-sitare-card-section' which appears to be a different layout for the same card data
  // and is marked as 'd-none'. We will reconstruct it based on the existing card data if it were to be visible.
  // For now, we will create them but keep them hidden as per the example HTML.
  cards.forEach((card) => {
    const linkEl = card.querySelector('[data-aue-prop="link"]');
    const linkHref = linkEl ? linkEl.href : '#';
    const linkTitle = linkEl ? linkEl.title : '';

    const bolteSitareAnchor = document.createElement('a');
    bolteSitareAnchor.classList.add('featurecards-bolte-sitare-card-section', 'featurecards-d-none', 'featurecards-analytics_cta_click', 'featurecards-text-decoration-none');
    bolteSitareAnchor.href = linkHref;
    bolteSitareAnchor.title = linkTitle;
    bolteSitareAnchor.setAttribute('data-title', linkTitle);
    if (linkEl) moveInstrumentation(linkEl, bolteSitareAnchor); // Re-use instrumentation for the link

    const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('featurecards-bolte-sitare-card-section--wrapper', 'featurecards-d-flex');

    const imgDiv = document.createElement('div');
    imgDiv.classList.add('featurecards-bolte-sitare-card-section--img');

    const imageEl = card.querySelector('[data-aue-prop="image"]');
    const altEl = card.querySelector('[data-aue-prop="alt"]');
    const altText = altEl ? altEl.textContent : '';

    if (imageEl) {
      const picture = createOptimizedPicture(imageEl.src, altText);
      picture.querySelector('img').classList.add('featurecards-h-100', 'featurecards-w-100', 'featurecards-card-img');
      imgDiv.append(picture);
      moveInstrumentation(imageEl, picture.querySelector('img'));
      if (altEl) moveInstrumentation(altEl, picture.querySelector('img'));
    }
    wrapperDiv.append(imgDiv);

    const contentWrapperDiv = document.createElement('div');
    contentWrapperDiv.classList.add('featurecards-content-wrapper', 'featurecards-d-flex', 'featurecards-flex-column', 'featurecards-justify-content-between');

    const topContentDiv = document.createElement('div');
    const titleH2 = document.createElement('h2');
    titleH2.classList.add('featurecards-bolte-sitare-card-section--title', 'featurecards-boing-text__heading-3', 'featurecards-text-boing-dark');
    const cardTitleEl = card.querySelector('[data-aue-prop="title"]');
    if (cardTitleEl) {
      titleH2.append(...cardTitleEl.childNodes);
      moveInstrumentation(cardTitleEl, titleH2);
    }
    topContentDiv.append(titleH2);

    const descP = document.createElement('p');
    descP.classList.add('featurecards-bolte-sitare-card-section--text', 'featurecards-boing-text__body-3', 'featurecards-text-boing-dark');
    const descriptionEl = card.querySelector('[data-aue-prop="description"]');
    if (descriptionEl) {
      descP.append(...descriptionEl.childNodes);
      moveInstrumentation(descriptionEl, descP);
    }
    topContentDiv.append(descP);
    contentWrapperDiv.append(topContentDiv);

    const bottomContentDiv = document.createElement('div');
    const exploreButton = document.createElement('button');
    exploreButton.classList.add('featurecards-bolte-sitare-card-section--btn', 'featurecards-text-white', 'featurecards-boing-text__body-4', 'featurecards-d-inline-block');
    exploreButton.textContent = 'Explore';
    bottomContentDiv.append(exploreButton);
    contentWrapperDiv.append(bottomContentDiv);

    wrapperDiv.append(contentWrapperDiv);
    bolteSitareAnchor.append(wrapperDiv);
    featureCardsWrapper.append(bolteSitareAnchor);
  });

  // Static curve container
  const curveContainer = document.createElement('div');
  curveContainer.classList.add('featurecards-curve-container', 'featurecards-d-none');
  featureCardsWrapper.append(curveContainer);

  block.replaceChildren(featureCardsWrapper);
}
