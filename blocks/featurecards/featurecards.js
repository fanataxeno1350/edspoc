import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('featurecards-main-container');

  const titleWrapper = block.querySelector('[data-aue-prop="title"]');
  if (titleWrapper) {
    const featurecardsTextContainer = document.createElement('div');
    featurecardsTextContainer.classList.add('featurecards-text-container');
    const h1 = document.createElement('h1');
    h1.classList.add('featurecards-title');
    h1.append(...titleWrapper.childNodes);
    moveInstrumentation(titleWrapper, h1);
    featurecardsTextContainer.append(h1);
    mainDiv.append(featurecardsTextContainer);
  }

  const featureCardsContainer = document.createElement('div');
  featureCardsContainer.classList.add('featurecards-cards-container');

  const featureCardItems = block.querySelectorAll('[data-aue-model="featurecard"]');
  featureCardItems.forEach((row) => {
    const linkEl = row.querySelector('[data-aue-prop="link"]');
    const imageEl = row.querySelector('[data-aue-prop="image"]');
    const headingEl = row.querySelector('[data-aue-prop="heading"]');
    const descriptionEl = row.querySelector('[data-aue-prop="description"]');
    const iconEl = row.querySelector('[data-aue-prop="icon"]');

    const section = document.createElement('section');
    section.classList.add('featurecards-section', 'featurecards-card-item');
    moveInstrumentation(row, section);

    const link = document.createElement('a');
    link.classList.add('featurecards-link', 'analytics_cta_click');
    if (linkEl) {
      link.href = linkEl.href;
      link.title = linkEl.title || '';
      link.dataset.ctaLabel = linkEl.dataset.ctaLabel || '';
      moveInstrumentation(linkEl, link);
    }

    if (imageEl) {
      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('featurecards-image-wrapper');
      const img = imageEl.querySelector('img');
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt);
        pic.classList.add('featurecards-image');
        imageWrapper.append(pic);
        moveInstrumentation(img, pic.querySelector('img'));
      } else {
        const anchor = imageEl.querySelector('a[href]');
        if (anchor) {
          const imgFromAnchor = document.createElement('img');
          imgFromAnchor.src = anchor.href;
          imgFromAnchor.alt = anchor.title || '';
          imgFromAnchor.classList.add('featurecards-image');
          imageWrapper.append(imgFromAnchor);
          moveInstrumentation(anchor, imgFromAnchor);
        }
      }
      link.append(imageWrapper);
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('featurecards-content-wrapper');

    if (headingEl) {
      const h2 = document.createElement('h2');
      h2.classList.add('featurecards-card-title', 'boing--text__heading-1');
      h2.append(...headingEl.childNodes);
      moveInstrumentation(headingEl, h2);
      contentWrapper.append(h2);
    }

    if (descriptionEl) {
      const descriptionWrapper = document.createElement('div');
      descriptionWrapper.classList.add('featurecards-description-wrapper');
      const p = document.createElement('p');
      p.classList.add('featurecards-card-description', 'boing--text__body-2', 'text-boing-dark');
      p.append(...descriptionEl.childNodes);
      moveInstrumentation(descriptionEl, p);
      descriptionWrapper.append(p);
      contentWrapper.append(descriptionWrapper);
    }

    if (iconEl) {
      const redirectButtonWrapper = document.createElement('div');
      redirectButtonWrapper.classList.add('featurecards-redirect-button-wrapper');
      const button = document.createElement('button');
      button.type = 'button';
      button.role = 'button';
      button.classList.add('featurecards-arrow-icon-button');
      const iconImg = iconEl.querySelector('img');
      if (iconImg) {
        button.append(iconImg);
        moveInstrumentation(iconEl, button);
      } else {
        const anchor = iconEl.querySelector('a[href]');
        if (anchor) {
          const svg = document.createElement('img');
          svg.src = anchor.href;
          svg.alt = anchor.title || '';
          button.append(svg);
          moveInstrumentation(anchor, svg);
        }
      }
      redirectButtonWrapper.append(button);
      contentWrapper.append(redirectButtonWrapper);
    }

    link.append(contentWrapper);
    section.append(link);
    featureCardsContainer.append(section);
  });

  const featureCardSimpleItems = block.querySelectorAll('[data-aue-model="featurecardSimple"]');
  featureCardSimpleItems.forEach((row) => {
    const linkEl = row.querySelector('[data-aue-prop="link"]');
    const imageEl = row.querySelector('[data-aue-prop="image"]');
    const headingEl = row.querySelector('[data-aue-prop="heading"]');
    const descriptionEl = row.querySelector('[data-aue-prop="description"]');

    const link = document.createElement('a');
    link.classList.add('featurecards-bolte-sitare-card-section', 'analytics_cta_click');
    if (linkEl) {
      link.href = linkEl.href;
      link.title = linkEl.title || '';
      link.dataset.title = linkEl.dataset.title || '';
      moveInstrumentation(linkEl, link);
    }

    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('featurecards-bolte-sitare-card-wrapper');
    moveInstrumentation(row, cardWrapper);

    if (imageEl) {
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('featurecards-bolte-sitare-card-image');
      const img = imageEl.querySelector('img');
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt);
        pic.classList.add('featurecards-card-image-img');
        imageContainer.append(pic);
        moveInstrumentation(img, pic.querySelector('img'));
      } else {
        const anchor = imageEl.querySelector('a[href]');
        if (anchor) {
          const imgFromAnchor = document.createElement('img');
          imgFromAnchor.src = anchor.href;
          imgFromAnchor.alt = anchor.title || '';
          imgFromAnchor.classList.add('featurecards-card-image-img');
          imageContainer.append(imgFromAnchor);
          moveInstrumentation(anchor, imgFromAnchor);
        }
      }
      cardWrapper.append(imageContainer);
    }

    const contentArea = document.createElement('div');
    contentArea.classList.add('featurecards-content-area');

    const textContentDiv = document.createElement('div');
    if (headingEl) {
      const h2 = document.createElement('h2');
      h2.classList.add('featurecards-bolte-sitare-card-title', 'boing--text__heading-3', 'text-boing-dark');
      h2.append(...headingEl.childNodes);
      moveInstrumentation(headingEl, h2);
      textContentDiv.append(h2);
    }

    if (descriptionEl) {
      const p = document.createElement('p');
      p.classList.add('featurecards-bolte-sitare-card-text', 'boing--text__body-3', 'text-boing-dark');
      p.append(...descriptionEl.childNodes);
      moveInstrumentation(descriptionEl, p);
      textContentDiv.append(p);
    }
    contentArea.append(textContentDiv);

    const buttonDiv = document.createElement('div');
    const button = document.createElement('button');
    button.classList.add('featurecards-bolte-sitare-card-button', 'text-white', 'boing--text__body-4');
    button.textContent = 'Explore'; // Assuming 'Explore' is static for simple cards
    buttonDiv.append(button);
    contentArea.append(buttonDiv);

    cardWrapper.append(contentArea);
    link.append(cardWrapper);
    featureCardsContainer.append(link);
  });

  mainDiv.append(featureCardsContainer);

  const curveContainer = document.createElement('div');
  curveContainer.classList.add('featurecards-curve-container');
  mainDiv.append(curveContainer);

  block.textContent = '';
  block.append(mainDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
