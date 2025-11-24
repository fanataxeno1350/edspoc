import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function createStatsCard(cardData, originalCardElement) {
  const card = document.createElement('div');
  card.className = 'stats-by-the-number-card';
  card.setAttribute('role', 'img');
  card.setAttribute('tabindex', '0');
  if (cardData.hoverImage) {
    card.setAttribute('data-hover-image', cardData.hoverImage);
  }
  if (cardData.hoverDetails) {
    card.setAttribute('data-hover-details', cardData.hoverDetails);
  }
  if (cardData.ariaLabel) {
    card.setAttribute('aria-label', cardData.ariaLabel);
  }

  const numberDiv = document.createElement('div');
  numberDiv.className = 'stats-by-the-number-card__number';
  if (cardData.number) {
    numberDiv.setAttribute('data-count', cardData.number);
    numberDiv.innerHTML = cardData.number;
  }
  card.append(numberDiv);

  const descriptionDiv = document.createElement('div');
  descriptionDiv.className = 'stats-by-the-number-card__description';
  if (cardData.description) {
    descriptionDiv.innerHTML = cardData.description;
  }
  card.append(descriptionDiv);

  moveInstrumentation(originalCardElement, card);
  return card;
}

export default async function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'stats-by-the-number-wrapper animate-ready animate-in';
  wrapper.setAttribute('role', 'region');
  wrapper.setAttribute('aria-label', 'Statistics by the numbers');

  const container = document.createElement('div');
  container.className = 'stats-by-the-number-container';

  const mainContent = document.createElement('div');
  mainContent.className = 'stats-by-the-number-main-content';

  // Extracting data from block structure
  const rows = [...block.children];

  const titleRow = rows[0];
  const titleText = titleRow.querySelector('div')?.innerHTML || '';

  const mainImageRow = rows[1];
  const mainImageSrc = mainImageRow.querySelector('picture img')?.src || '';
  const mainImageAlt = mainImageRow.querySelector('picture img')?.alt || '';

  const descriptionRow = rows[2];
  const descriptionText = descriptionRow.querySelector('div')?.innerHTML || '';

  const cardsRow = rows[3];
  const cardElements = [...cardsRow.querySelectorAll('div.stats-by-the-number-card')];
  const cardsData = cardElements.map((cardEl) => ({
    hoverImage: cardEl.dataset.hoverImage || '',
    hoverDetails: cardEl.dataset.hoverDetails || '',
    number: cardEl.querySelector('.stats-by-the-number-card__number')?.innerHTML || '',
    description: cardEl.querySelector('.stats-by-the-number-card__description')?.innerHTML || '',
    ariaLabel: cardEl.getAttribute('aria-label') || '',
  }));

  const ctaRow = rows[4];
  const ctaLink = ctaRow.querySelector('a');
  const ctaLabel = ctaLink?.textContent?.trim() || '';
  const ctaHref = ctaLink?.href || '';

  // Title Section
  const titleDiv = document.createElement('div');
  titleDiv.className = 'stats-by-the-number-title';
  const h2 = document.createElement('h2');
  h2.innerHTML = titleText;
  titleDiv.append(h2);
  container.append(titleDiv);
  moveInstrumentation(titleRow, titleDiv);

  // Image Section
  const imageSection = document.createElement('div');
  imageSection.className = 'stats-by-the-number-image-section';
  const imageContainer = document.createElement('div');
  imageContainer.className = 'stats-by-the-number-image-container stats-by-the-number-image-container--active';
  imageContainer.setAttribute('data-tab-content', '0');
  imageContainer.setAttribute('data-image-path', mainImageSrc);

  if (mainImageSrc) {
    const pic = createOptimizedPicture(mainImageSrc, mainImageAlt);
    const img = pic.querySelector('img');
    img.className = 'stats-by-the-number-main-image';
    img.setAttribute('data-tab-image', '0');
    img.style.opacity = '1';
    imageContainer.append(pic);
    moveInstrumentation(mainImageRow.querySelector('picture img'), img);
  }
  imageSection.append(imageContainer);
  mainContent.append(imageSection);

  // Content Section
  const contentSection = document.createElement('div');
  contentSection.className = 'stats-by-the-number-content-section';

  const tabContent = document.createElement('div');
  tabContent.className = 'stats-by-the-number-tab-content stats-by-the-number-tab-content--active';
  tabContent.setAttribute('data-tab-content', '0');

  // Description
  const descriptionDiv = document.createElement('div');
  descriptionDiv.className = 'stats-by-the-number-description';
  descriptionDiv.innerHTML = descriptionText;
  tabContent.append(descriptionDiv);
  moveInstrumentation(descriptionRow, descriptionDiv);

  // Cards
  const cardsDiv = document.createElement('div');
  cardsDiv.className = 'stats-by-the-number-cards';
  cardsDiv.setAttribute('role', 'list');
  cardsData.forEach((cardData, index) => {
    const originalCardElement = cardElements[index];
    cardsDiv.append(createStatsCard(cardData, originalCardElement));
  });
  tabContent.append(cardsDiv);
  moveInstrumentation(cardsRow, cardsDiv);

  // CTA
  if (ctaLink) {
    const ctaDiv = document.createElement('div');
    ctaDiv.className = 'stats-by-the-number-cta';

    const newCtaLink = document.createElement('a');
    newCtaLink.href = ctaHref;
    newCtaLink.className = 'cta cta__primary';
    newCtaLink.target = '_self';
    newCtaLink.setAttribute('aria-label', ctaLink.getAttribute('aria-label') || ctaLabel);
    newCtaLink.setAttribute('data-palette', ctaLink.getAttribute('data-palette') || 'palette-1');

    const iconSpan = document.createElement('span');
    iconSpan.className = 'cta__icon qd-icon qd-icon--cheveron-right';
    iconSpan.setAttribute('aria-hidden', 'true');
    newCtaLink.append(iconSpan);

    const labelSpan = document.createElement('span');
    labelSpan.className = 'cta__label';
    labelSpan.textContent = ctaLabel;
    newCtaLink.append(labelSpan);

    ctaDiv.append(newCtaLink);
    tabContent.append(ctaDiv);
    moveInstrumentation(ctaRow, ctaDiv);
  }

  contentSection.append(tabContent);
  mainContent.append(contentSection);
  container.append(mainContent);
  wrapper.append(container);

  block.textContent = '';
  block.append(wrapper);
  moveInstrumentation(block, wrapper);
}
