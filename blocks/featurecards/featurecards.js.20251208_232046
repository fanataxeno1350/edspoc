import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('featurecards-main-wrapper');

  const titleWrapper = document.createElement('div');
  titleWrapper.classList.add('featurecards-title-wrapper');
  const h1 = document.createElement('h1');
  h1.classList.add('featurecards-title');
  const titleContent = block.querySelector('div:first-child h1');
  if (titleContent) {
    h1.append(...titleContent.childNodes);
    moveInstrumentation(titleContent, h1);
  }
  titleWrapper.append(h1);
  mainDiv.append(titleWrapper);

  const cardsWrapper = document.createElement('div');
  cardsWrapper.classList.add('featurecards-cards-wrapper');

  const featureCards = block.querySelectorAll('[data-aue-model="featurecard"]');

  featureCards.forEach((card) => {
    const section = document.createElement('section');
    section.classList.add('featurecards-section', 'featurecards-card', 'featurecards-mx-auto');
    moveInstrumentation(card, section);

    const link = document.createElement('a');
    link.classList.add('featurecards-link', 'featurecards-d-flex', 'featurecards-flex-column', 'featurecards-text-decoration-none');

    const linkElement = card.querySelector('[data-aue-prop="link"]');
    if (linkElement) {
      link.href = linkElement.href;
      link.title = linkElement.title;
      link.setAttribute('data-cta-label', linkElement.getAttribute('data-cta-label'));
      moveInstrumentation(linkElement, link);
    } else {
      // Fallback if data-aue-prop is on a child, e.g., a <a> tag directly
      const fallbackLink = card.querySelector('a');
      if (fallbackLink) {
        link.href = fallbackLink.href;
        link.title = fallbackLink.title;
        link.setAttribute('data-cta-label', fallbackLink.getAttribute('data-cta-label'));
        moveInstrumentation(fallbackLink, link);
      }
    }

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('featurecards-image', 'featurecards-w-100', 'featurecards-pb-4');

    let img = card.querySelector('[data-aue-prop="image"]');
    if (!img) {
      // Look for <img> inside <a> if data-aue-prop is not directly on img
      const anchor = card.querySelector('a');
      if (anchor) {
        img = anchor.querySelector('img');
      }
    }

    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt);
      imageDiv.append(picture);
      moveInstrumentation(img, picture.querySelector('img'));
    }
    link.append(imageDiv);

    const textCenterDiv = document.createElement('div');
    textCenterDiv.classList.add('featurecards-text-center');

    const h2 = document.createElement('h2');
    h2.classList.add('featurecards-title-h2', 'featurecards-boing-text__heading-1');
    const title = card.querySelector('[data-aue-prop="title"]');
    if (title) {
      h2.append(...title.childNodes);
      moveInstrumentation(title, h2);
    }
    textCenterDiv.append(h2);

    const descDiv = document.createElement('div');
    descDiv.classList.add('featurecards-pb-5');
    const p = document.createElement('p');
    p.classList.add('featurecards-desc', 'featurecards-boing-text__body-2', 'featurecards-text-boing-dark');
    const description = card.querySelector('[data-aue-prop="description"]');
    if (description) {
      p.append(...description.childNodes);
      moveInstrumentation(description, p);
    }
    descDiv.append(p);
    textCenterDiv.append(descDiv);

    // The redirected button seems to be static or derived, not directly authored via data-aue-prop
    // Based on the HTML, it's a hidden element and might not need dynamic content extraction.
    // If it were dynamic, we'd need a data-aue-prop for its content/SVG path.
    const redirectedBtnDiv = document.createElement('div');
    redirectedBtnDiv.classList.add('featurecards-redirected-btn', 'featurecards-d-none');
    const button = document.createElement('button');
    button.type = 'button';
    button.role = 'button';
    button.classList.add('featurecards-arrow-icon-btn');
    // Assuming the content is static or not directly authored for the button text
    // If it was dynamic, we'd need a data-aue-prop for it.
    // For now, we'll try to extract from the existing HTML if available, otherwise leave empty or static.
    const existingButtonContent = card.querySelector('.featurecards-arrow-icon-btn');
    if (existingButtonContent) {
      button.append(...existingButtonContent.childNodes);
      moveInstrumentation(existingButtonContent, button);
    }
    redirectedBtnDiv.append(button);
    textCenterDiv.append(redirectedBtnDiv);

    link.append(textCenterDiv);
    section.append(link);
    cardsWrapper.append(section);
  });

  mainDiv.append(cardsWrapper);

  // Handle the 'bolte-sitare-card-section' which seems to be an alternative display or mobile specific
  // It's marked as 'd-none' in the provided HTML, suggesting it's conditionally displayed.
  // We'll extract its content if it exists, but maintain its 'd-none' class as per the HTML.
  const bolteSitareCards = block.querySelectorAll('.featurecards-bolte-sitare-card-section');
  bolteSitareCards.forEach((bolteCard) => {
    const newBolteCardLink = document.createElement('a');
    newBolteCardLink.classList.add('featurecards-bolte-sitare-card-section', 'featurecards-d-none', 'featurecards-analytics_cta_click', 'featurecards-text-decoration-none');
    newBolteCardLink.href = bolteCard.href;
    newBolteCardLink.title = bolteCard.title;
    newBolteCardLink.setAttribute('data-title', bolteCard.getAttribute('data-title'));
    moveInstrumentation(bolteCard, newBolteCardLink);

    const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('featurecards-bolte-sitare-card-section--wrapper', 'featurecards-d-flex');
    moveInstrumentation(bolteCard.querySelector('.featurecards-bolte-sitare-card-section--wrapper'), wrapperDiv);

    const imgDiv = document.createElement('div');
    imgDiv.classList.add('featurecards-bolte-sitare-card-section--img');
    const imgElement = bolteCard.querySelector('.featurecards-bolte-sitare-card-section--img img');
    if (imgElement) {
      const picture = createOptimizedPicture(imgElement.src, imgElement.alt);
      imgDiv.append(picture);
      moveInstrumentation(imgElement, picture.querySelector('img'));
    }
    wrapperDiv.append(imgDiv);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('featurecards-content-wrapper', 'featurecards-d-flex', 'featurecards-flex-column', 'featurecards-justify-content-between');
    moveInstrumentation(bolteCard.querySelector('.featurecards-content-wrapper'), contentWrapper);

    const textDiv = document.createElement('div');
    const h2Bolte = document.createElement('h2');
    h2Bolte.classList.add('featurecards-bolte-sitare-card-section--title', 'featurecards-boing-text__heading-3', 'featurecards-text-boing-dark');
    const bolteTitle = bolteCard.querySelector('.featurecards-bolte-sitare-card-section--title');
    if (bolteTitle) {
      h2Bolte.append(...bolteTitle.childNodes);
      moveInstrumentation(bolteTitle, h2Bolte);
    }
    textDiv.append(h2Bolte);

    const pBolte = document.createElement('p');
    pBolte.classList.add('featurecards-bolte-sitare-card-section--text', 'featurecards-boing-text__body-3', 'featurecards-text-boing-dark');
    const bolteText = bolteCard.querySelector('.featurecards-bolte-sitare-card-section--text');
    if (bolteText) {
      pBolte.append(...bolteText.childNodes);
      moveInstrumentation(bolteText, pBolte);
    }
    textDiv.append(pBolte);
    contentWrapper.append(textDiv);

    const buttonDiv = document.createElement('div');
    const bolteButton = document.createElement('button');
    bolteButton.classList.add('featurecards-bolte-sitare-card-section--btn', 'featurecards-text-white', 'featurecards-boing-text__body-4', 'featurecards-d-inline-block');
    const existingBolteButton = bolteCard.querySelector('.featurecards-bolte-sitare-card-section--btn');
    if (existingBolteButton) {
      bolteButton.append(...existingBolteButton.childNodes);
      moveInstrumentation(existingBolteButton, bolteButton);
    }
    buttonDiv.append(bolteButton);
    contentWrapper.append(buttonDiv);

    wrapperDiv.append(contentWrapper);
    newBolteCardLink.append(wrapperDiv);
    mainDiv.append(newBolteCardLink);
  });

  // Add the curve container if it exists and is marked as d-none
  const curveContainer = block.querySelector('.featurecards-curve-container.featurecards-d-none');
  if (curveContainer) {
    const newCurveContainer = document.createElement('div');
    newCurveContainer.classList.add('featurecards-curve-container', 'featurecards-d-none');
    moveInstrumentation(curveContainer, newCurveContainer);
    mainDiv.append(newCurveContainer);
  }

  block.textContent = '';
  block.append(mainDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
