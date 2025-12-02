import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsWrapper = document.createElement('div');
  featureCardsWrapper.classList.add('featurecards-wrapper');
  moveInstrumentation(block, featureCardsWrapper);

  const titleContainer = document.createElement('div');
  titleContainer.id = 'text-68763da680'; // Assuming this ID is static or needs to be preserved
  titleContainer.classList.add('featurecards-text');
  featureCardsWrapper.append(titleContainer);

  const titleH1 = document.createElement('h1');
  titleH1.classList.add('featurecards-title');
  titleContainer.append(titleH1);

  // Extracting title from the first row of the block
  const authoredTitle = block.querySelector('div:first-child > div:first-child');
  if (authoredTitle) {
    titleH1.append(...authoredTitle.childNodes);
    moveInstrumentation(authoredTitle, titleH1);
  }

  const cardContainer = document.createElement('div');
  cardContainer.classList.add('featurecards-card-container');
  featureCardsWrapper.append(cardContainer);

  // Iterate over each featurecard item
  const featureCardItems = block.querySelectorAll('[data-aue-model="featurecard"]');
  featureCardItems.forEach((item) => {
    const section = document.createElement('section');
    section.classList.add('featurecards-section', 'featurecards-card', 'featurecards-mx-auto');
    moveInstrumentation(item, section);

    const link = document.createElement('a');
    link.classList.add('featurecards-link', 'featurecards-d-flex', 'featurecards-flex-column', 'featurecards-text-decoration-none');
    section.append(link);

    const authoredLink = item.querySelector('[data-aue-prop="link"]');
    if (authoredLink) {
      link.href = authoredLink.href;
      link.title = authoredLink.title || '';
      link.setAttribute('data-cta-label', authoredLink.title || '');
      moveInstrumentation(authoredLink, link);
    }

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('featurecards-image', 'featurecards-w-100', 'featurecards-pb-4');
    link.append(imageDiv);

    let authoredImage = item.querySelector('[data-aue-prop="image"] img');
    if (!authoredImage) {
      const anchor = item.querySelector('[data-aue-prop="image"] a');
      if (anchor) {
        authoredImage = document.createElement('img');
        authoredImage.src = anchor.href;
        authoredImage.alt = anchor.title || '';
        moveInstrumentation(anchor, authoredImage);
      }
    }

    if (authoredImage) {
      const pic = createOptimizedPicture(authoredImage.src, authoredImage.alt);
      imageDiv.append(pic);
      moveInstrumentation(authoredImage, pic.querySelector('img'));
    }

    const textCenterDiv = document.createElement('div');
    textCenterDiv.classList.add('featurecards-text-center');
    link.append(textCenterDiv);

    const titleH2 = document.createElement('h2');
    titleH2.classList.add('featurecards-title-h2', 'featurecards-boing-text__heading-1');
    textCenterDiv.append(titleH2);

    const authoredTitle = item.querySelector('[data-aue-prop="title"]');
    if (authoredTitle) {
      titleH2.append(...authoredTitle.childNodes);
      moveInstrumentation(authoredTitle, titleH2);
    }

    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('featurecards-pb-5');
    textCenterDiv.append(descriptionDiv);

    const descriptionP = document.createElement('p');
    descriptionP.classList.add('featurecards-desc', 'featurecards-boing-text__body-2', 'featurecards-text-boing-dark');
    descriptionDiv.append(descriptionP);

    const authoredDescription = item.querySelector('[data-aue-prop="description"]');
    if (authoredDescription) {
      descriptionP.append(...authoredDescription.childNodes);
      moveInstrumentation(authoredDescription, descriptionP);
    }

    // The redirected button is present in the expected HTML but not in the block JSON.
    // We will create it but keep it hidden as per the expected HTML.
    const redirectedBtnDiv = document.createElement('div');
    redirectedBtnDiv.classList.add('featurecards-redirected-btn', 'featurecards-d-none');
    textCenterDiv.append(redirectedBtnDiv);

    const button = document.createElement('button');
    button.type = 'button';
    button.role = 'button';
    button.classList.add('featurecards-arrow-icon-btn');
    // The content of this button is hardcoded in the expected HTML, not from authored content.
    button.textContent = '/content/dam/aemigrate/uploaded-folder/image/1761293302381.svg+xml';
    redirectedBtnDiv.append(button);

    cardContainer.append(section);
  });

  // The bolte-sitare-card-section elements are not directly mapped in the block JSON
  // but are present in the expected HTML. They are also marked as d-none.
  // We will create them as per the expected HTML structure, but they will remain hidden.
  // Since they are not authored, we will hardcode their content based on the example.
  // If they were meant to be dynamic, they would need a model in the block JSON.
  const bolteSitareCardSections = block.querySelectorAll('a.featurecards-bolte-sitare-card-section');
  bolteSitareCardSections.forEach((authoredBolteSitareCard) => {
    const newBolteSitareCard = document.createElement('a');
    newBolteSitareCard.classList.add('featurecards-bolte-sitare-card-section', 'featurecards-d-none', 'featurecards-analytics_cta_click', 'featurecards-text-decoration-none');
    newBolteSitareCard.href = authoredBolteSitareCard.href;
    newBolteSitareCard.title = authoredBolteSitareCard.title;
    newBolteSitareCard.setAttribute('data-title', authoredBolteSitareCard.getAttribute('data-title'));
    moveInstrumentation(authoredBolteSitareCard, newBolteSitareCard);

    const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('featurecards-bolte-sitare-card-section--wrapper', 'featurecards-d-flex');
    newBolteSitareCard.append(wrapperDiv);

    const imgDiv = document.createElement('div');
    imgDiv.classList.add('featurecards-bolte-sitare-card-section--img');
    wrapperDiv.append(imgDiv);

    const img = authoredBolteSitareCard.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt);
      imgDiv.append(pic);
      moveInstrumentation(img, pic.querySelector('img'));
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('featurecards-content-wrapper', 'featurecards-d-flex', 'featurecards-flex-column', 'featurecards-justify-content-between');
    wrapperDiv.append(contentWrapper);

    const textDiv = document.createElement('div');
    contentWrapper.append(textDiv);

    const titleH2 = document.createElement('h2');
    titleH2.classList.add('featurecards-bolte-sitare-card-section--title', 'featurecards-boing-text__heading-3', 'featurecards-text-boing-dark');
    const authoredTitle = authoredBolteSitareCard.querySelector('.featurecards-bolte-sitare-card-section--title');
    if (authoredTitle) {
      titleH2.append(...authoredTitle.childNodes);
      moveInstrumentation(authoredTitle, titleH2);
    }
    textDiv.append(titleH2);

    const p = document.createElement('p');
    p.classList.add('featurecards-bolte-sitare-card-section--text', 'featurecards-boing-text__body-3', 'featurecards-text-boing-dark');
    const authoredP = authoredBolteSitareCard.querySelector('.featurecards-bolte-sitare-card-section--text');
    if (authoredP) {
      p.append(...authoredP.childNodes);
      moveInstrumentation(authoredP, p);
    }
    textDiv.append(p);

    const btnDiv = document.createElement('div');
    contentWrapper.append(btnDiv);

    const button = document.createElement('button');
    button.classList.add('featurecards-bolte-sitare-card-section--btn', 'featurecards-text-white', 'featurecards-boing-text__body-4', 'featurecards-d-inline-block');
    const authoredButton = authoredBolteSitareCard.querySelector('.featurecards-bolte-sitare-card-section--btn');
    if (authoredButton) {
      button.append(...authoredButton.childNodes);
      moveInstrumentation(authoredButton, button);
    }
    btnDiv.append(button);

    featureCardsWrapper.append(newBolteSitareCard);
  });

  const curveContainer = document.createElement('div');
  curveContainer.classList.add('featurecards-curve-container', 'featurecards-d-none');
  featureCardsWrapper.append(curveContainer);

  block.innerHTML = '';
  block.append(featureCardsWrapper);
}
