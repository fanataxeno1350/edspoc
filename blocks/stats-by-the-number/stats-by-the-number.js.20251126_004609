import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const statsByTheNumberWrapper = document.createElement('div');
  statsByTheNumberWrapper.className = 'stats-by-the-number-wrapper animate-ready animate-in';
  statsByTheNumberWrapper.setAttribute('role', 'region');
  statsByTheNumberWrapper.setAttribute('aria-label', 'Statistics by the numbers');

  const statsByTheNumberContainer = document.createElement('div');
  statsByTheNumberContainer.className = 'stats-by-the-number-container';
  statsByTheNumberWrapper.append(statsByTheNumberContainer);

  // Title
  const titleDiv = document.createElement('div');
  titleDiv.className = 'stats-by-the-number-title';
  const titleContent = block.querySelector('[data-aue-prop="title"]');
  if (titleContent) {
    const h2 = document.createElement('h2');
    h2.append(...titleContent.childNodes);
    moveInstrumentation(titleContent, h2);
    titleDiv.append(h2);
  }
  statsByTheNumberContainer.append(titleDiv);

  const mainContent = document.createElement('div');
  mainContent.className = 'stats-by-the-number-main-content';
  statsByTheNumberContainer.append(mainContent);

  // Image Section
  const imageSection = document.createElement('div');
  imageSection.className = 'stats-by-the-number-image-section';
  mainContent.append(imageSection);

  const imageContainer = document.createElement('div');
  imageContainer.className = 'stats-by-the-number-image-container stats-by-the-number-image-container--active';
  imageContainer.setAttribute('data-tab-content', '0');
  imageSection.append(imageContainer);

  const authoredImage = block.querySelector('[data-aue-prop="image"] img');
  if (authoredImage) {
    const pic = createOptimizedPicture(authoredImage.src, authoredImage.alt);
    const img = pic.querySelector('img');
    img.className = 'stats-by-the-number-main-image';
    img.setAttribute('data-tab-image', '0');
    img.style.opacity = '1';
    imageContainer.append(pic);
    moveInstrumentation(authoredImage, img);
    imageContainer.setAttribute('data-image-path', authoredImage.src);
  }

  // Content Section
  const contentSection = document.createElement('div');
  contentSection.className = 'stats-by-the-number-content-section';
  mainContent.append(contentSection);

  const tabContent = document.createElement('div');
  tabContent.className = 'stats-by-the-number-tab-content stats-by-the-number-tab-content--active';
  tabContent.setAttribute('data-tab-content', '0');
  contentSection.append(tabContent);

  // Description
  const descriptionDiv = document.createElement('div');
  descriptionDiv.className = 'stats-by-the-number-description';
  const descriptionContent = block.querySelector('[data-aue-prop="description"]');
  if (descriptionContent) {
    descriptionDiv.append(...descriptionContent.childNodes);
    moveInstrumentation(descriptionContent, descriptionDiv);
  }
  tabContent.append(descriptionDiv);

  // Cards
  const cardsDiv = document.createElement('div');
  cardsDiv.className = 'stats-by-the-number-cards';
  cardsDiv.setAttribute('role', 'list');
  tabContent.append(cardsDiv);

  const statCards = block.querySelectorAll('[data-aue-model="statCard"]');
  statCards.forEach((card) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'stats-by-the-number-card';
    cardDiv.setAttribute('role', 'img');
    cardDiv.setAttribute('tabindex', '0');

    const hoverImage = card.querySelector('[data-aue-prop="hoverImage"]');
    if (hoverImage) {
      cardDiv.setAttribute('data-hover-image', hoverImage.textContent.trim());
    }

    const hoverDetails = card.querySelector('[data-aue-prop="hoverDetails"]');
    if (hoverDetails) {
      cardDiv.setAttribute('data-hover-details', hoverDetails.innerHTML.trim());
    }

    const ariaLabel = card.querySelector('[data-aue-prop="ariaLabel"]');
    if (ariaLabel) {
      cardDiv.setAttribute('aria-label', ariaLabel.textContent.trim());
    }

    const numberContent = card.querySelector('[data-aue-prop="number"]');
    if (numberContent) {
      const readOnlyAuthorSpan = document.createElement('span');
      readOnlyAuthorSpan.className = 'readOnlyAuthor';
      readOnlyAuthorSpan.style.display = 'none';
      readOnlyAuthorSpan.innerHTML = numberContent.innerHTML;
      cardDiv.append(readOnlyAuthorSpan);

      const numberDiv = document.createElement('div');
      numberDiv.className = 'stats-by-the-number-card__number';
      numberDiv.setAttribute('data-count', numberContent.innerHTML.trim());
      numberDiv.append(...numberContent.childNodes);
      moveInstrumentation(numberContent, numberDiv);
      cardDiv.append(numberDiv);
    }

    const descriptionContent = card.querySelector('[data-aue-prop="description"]');
    if (descriptionContent) {
      const descriptionDiv = document.createElement('div');
      descriptionDiv.className = 'stats-by-the-number-card__description';
      descriptionDiv.append(...descriptionContent.childNodes);
      moveInstrumentation(descriptionContent, descriptionDiv);
      cardDiv.append(descriptionDiv);
    }

    cardsDiv.append(cardDiv);
  });

  // CTA
  const ctaDiv = document.createElement('div');
  ctaDiv.className = 'stats-by-the-number-cta';
  const ctaLink = block.querySelector('[data-aue-prop="ctaLink"]');
  const ctaLabel = block.querySelector('[data-aue-prop="ctaLabel"]');

  if (ctaLink && ctaLabel) {
    const anchor = document.createElement('a');
    anchor.href = ctaLink.textContent.trim();
    anchor.className = 'cta cta__primary';
    anchor.setAttribute('target', '_self');
    anchor.setAttribute('aria-label', ctaLabel.textContent.trim());
    anchor.setAttribute('data-palette', 'palette-1');

    const iconSpan = document.createElement('span');
    iconSpan.className = 'cta__icon qd-icon qd-icon--cheveron-right';
    iconSpan.setAttribute('aria-hidden', 'true');
    anchor.append(iconSpan);

    const labelSpan = document.createElement('span');
    labelSpan.className = 'cta__label';
    labelSpan.textContent = ctaLabel.textContent.trim();
    anchor.append(labelSpan);

    moveInstrumentation(ctaLink, anchor);
    moveInstrumentation(ctaLabel, labelSpan);

    ctaDiv.append(anchor);
  }
  tabContent.append(ctaDiv);

  block.textContent = '';
  block.append(statsByTheNumberWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
