import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featurecardsContainer = document.createElement('div');
  featurecardsContainer.classList.add('featurecards-container');

  const titleWrapper = block.querySelector('[data-aue-prop="title"]');
  if (titleWrapper) {
    const featurecardsTextWrapper = document.createElement('div');
    featurecardsTextWrapper.id = 'text-68763da680'; // Hardcoded ID from example
    featurecardsTextWrapper.classList.add('featurecards-text-wrapper');

    const titleElement = document.createElement('h1');
    titleElement.classList.add('featurecards-title');

    const titleText = titleWrapper.textContent.trim();
    const highlightIndex = titleText.indexOf('LetsBoing!');

    if (highlightIndex !== -1) {
      const beforeHighlight = titleText.substring(0, highlightIndex);
      const highlightText = titleText.substring(highlightIndex, highlightIndex + 'LetsBoing!'.length);
      const afterHighlight = titleText.substring(highlightIndex + 'LetsBoing!'.length);

      titleElement.append(beforeHighlight);
      const highlightSpan = document.createElement('span');
      highlightSpan.classList.add('featurecards-title-highlight');
      highlightSpan.textContent = highlightText;
      titleElement.append(highlightSpan);
      titleElement.append(afterHighlight);
    } else {
      titleElement.textContent = titleText;
    }

    moveInstrumentation(titleWrapper, titleElement);
    featurecardsTextWrapper.append(titleElement);
    featurecardsContainer.append(featurecardsTextWrapper);
  }

  const featureCardItems = block.querySelectorAll('[data-aue-model="featurecard"]');
  featureCardItems.forEach((item) => {
    const section = document.createElement('section');
    section.classList.add('featurecards-section');

    const linkElement = item.querySelector('[data-aue-prop="link"]');
    const linkHref = linkElement ? linkElement.href : '#';
    const linkTitle = linkElement ? linkElement.title || linkElement.textContent : '';

    const anchor = document.createElement('a');
    anchor.classList.add('featurecards-card-link', 'analytics_cta_click');
    anchor.href = linkHref;
    anchor.title = linkTitle;
    anchor.dataset.ctaLabel = linkTitle || 'Explore';
    moveInstrumentation(linkElement, anchor);

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('featurecards-card-image-wrapper');

    let img = item.querySelector('[data-aue-prop="image"] img');
    if (!img) {
      const anchorFallback = item.querySelector('[data-aue-prop="image"] a[href]');
      if (anchorFallback) {
        img = document.createElement('img');
        img.src = anchorFallback.href;
        img.alt = item.querySelector('[data-aue-prop="alt"]')?.textContent || '';
        moveInstrumentation(anchorFallback, img);
      }
    }

    if (img) {
      const altText = item.querySelector('[data-aue-prop="alt"]')?.textContent || img.alt || '';
      const picture = createOptimizedPicture(img.src, altText);
      picture.querySelector('img').classList.add('featurecards-card-image');
      moveInstrumentation(img, picture.querySelector('img'));
      imageWrapper.append(picture);
    }
    anchor.append(imageWrapper);

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('featurecards-card-content');

    const cardTitleElement = item.querySelector('[data-aue-prop="title"]');
    if (cardTitleElement) {
      const h2 = document.createElement('h2');
      h2.classList.add('featurecards-card-title', 'boing--text__heading-1');
      h2.textContent = cardTitleElement.textContent;
      moveInstrumentation(cardTitleElement, h2);
      contentDiv.append(h2);
    }

    const descriptionWrapper = document.createElement('div');
    descriptionWrapper.classList.add('featurecards-card-description-wrapper');

    const descriptionElement = item.querySelector('[data-aue-prop="description"]');
    if (descriptionElement) {
      const p = document.createElement('p');
      p.classList.add('featurecards-card-description', 'boing--text__body-2', 'text-boing-dark');
      p.innerHTML = descriptionElement.innerHTML;
      moveInstrumentation(descriptionElement, p);
      descriptionWrapper.append(p);
    }
    contentDiv.append(descriptionWrapper);

    const redirectButtonWrapper = document.createElement('div');
    redirectButtonWrapper.classList.add('featurecards-redirect-button-wrapper', 'd-none');
    const button = document.createElement('button');
    button.type = 'button';
    button.role = 'button';
    button.classList.add('featurecards-arrow-icon-button');
    button.textContent = '/content/dam/aemigrate/uploaded-folder/image/1765368595856.svg+xml'; // Hardcoded
    redirectButtonWrapper.append(button);
    contentDiv.append(redirectButtonWrapper);

    anchor.append(contentDiv);
    section.append(anchor);
    featurecardsContainer.append(section);
  });

  // Bolte Sitare Card Sections (d-none in sample HTML)
  featureCardItems.forEach((item) => {
    const linkElement = item.querySelector('[data-aue-prop="link"]');
    const linkHref = linkElement ? linkElement.href : '#';
    const linkTitle = linkElement ? item.querySelector('[data-aue-prop="title"]')?.textContent || linkElement.title || linkElement.textContent : '';

    const bolteSitareAnchor = document.createElement('a');
    bolteSitareAnchor.classList.add('featurecards-bolte-sitare-card-section', 'd-none', 'analytics_cta_click', 'text-decoration-none');
    bolteSitareAnchor.href = linkHref;
    bolteSitareAnchor.title = linkTitle;
    bolteSitareAnchor.dataset.title = linkTitle;
    moveInstrumentation(linkElement, bolteSitareAnchor);

    const bolteSitareWrapper = document.createElement('div');
    bolteSitareWrapper.classList.add('featurecards-bolte-sitare-card-wrapper', 'd-flex');

    const bolteSitareImageDiv = document.createElement('div');
    bolteSitareImageDiv.classList.add('featurecards-bolte-sitare-card-image');

    let img = item.querySelector('[data-aue-prop="image"] img');
    if (!img) {
      const anchorFallback = item.querySelector('[data-aue-prop="image"] a[href]');
      if (anchorFallback) {
        img = document.createElement('img');
        img.src = anchorFallback.href;
        img.alt = item.querySelector('[data-aue-prop="alt"]')?.textContent || '';
        moveInstrumentation(anchorFallback, img);
      }
    }

    if (img) {
      const altText = item.querySelector('[data-aue-prop="alt"]')?.textContent || img.alt || '';
      const picture = createOptimizedPicture(img.src, altText);
      picture.querySelector('img').classList.add('featurecards-card-image-item');
      moveInstrumentation(img, picture.querySelector('img'));
      bolteSitareImageDiv.append(picture);
    }
    bolteSitareWrapper.append(bolteSitareImageDiv);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('featurecards-content-wrapper', 'd-flex', 'flex-column', 'justify-content-between');

    const textDiv = document.createElement('div');

    const cardTitleElement = item.querySelector('[data-aue-prop="title"]');
    if (cardTitleElement) {
      const h2 = document.createElement('h2');
      h2.classList.add('featurecards-bolte-sitare-card-title', 'boing--text__heading-3', 'text-boing-dark');
      h2.textContent = cardTitleElement.textContent;
      moveInstrumentation(cardTitleElement, h2);
      textDiv.append(h2);
    }

    const descriptionElement = item.querySelector('[data-aue-prop="description"]');
    if (descriptionElement) {
      const p = document.createElement('p');
      p.classList.add('featurecards-bolte-sitare-card-text', 'boing--text__body-3', 'text-boing-dark');
      p.innerHTML = descriptionElement.innerHTML;
      moveInstrumentation(descriptionElement, p);
      textDiv.append(p);
    }
    contentWrapper.append(textDiv);

    const buttonDiv = document.createElement('div');
    const button = document.createElement('button');
    button.classList.add('featurecards-bolte-sitare-card-button', 'text-white', 'boing--text__body-4', 'd-inline-block');
    button.textContent = 'Explore';
    buttonDiv.append(button);
    contentWrapper.append(buttonDiv);

    bolteSitareWrapper.append(contentWrapper);
    bolteSitareAnchor.append(bolteSitareWrapper);
    featurecardsContainer.append(bolteSitareAnchor);
  });

  const curveContainer = document.createElement('div');
  curveContainer.classList.add('featurecards-curve-container', 'd-none');
  featurecardsContainer.append(curveContainer);

  block.textContent = '';
  block.append(featurecardsContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
