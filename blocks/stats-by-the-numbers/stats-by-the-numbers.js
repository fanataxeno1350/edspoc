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

  const statsByTheNumberTitle = document.createElement('div');
  statsByTheNumberTitle.className = 'stats-by-the-number-title';
  const title = block.querySelector('[data-aue-prop="title"]');
  if (title) {
    const h2 = document.createElement('h2');
    moveInstrumentation(title, h2);
    h2.innerHTML = title.innerHTML;
    statsByTheNumberTitle.append(h2);
  }
  statsByTheNumberContainer.append(statsByTheNumberTitle);

  const statsByTheNumberMainContent = document.createElement('div');
  statsByTheNumberMainContent.className = 'stats-by-the-number-main-content';
  statsByTheNumberContainer.append(statsByTheNumberMainContent);

  const statsByTheNumberImageSection = document.createElement('div');
  statsByTheNumberImageSection.className = 'stats-by-the-number-image-section';
  statsByTheNumberMainContent.append(statsByTheNumberImageSection);

  const statsByTheNumberImageContainer = document.createElement('div');
  statsByTheNumberImageContainer.className = 'stats-by-the-number-image-container stats-by-the-number-image-container--active';
  statsByTheNumberImageContainer.setAttribute('data-tab-content', '0');
  statsByTheNumberImageSection.append(statsByTheNumberImageContainer);

  const mainImage = block.querySelector('[data-aue-prop="mainImage"]');
  if (mainImage && mainImage.querySelector('img')) {
    const img = mainImage.querySelector('img');
    const pic = createOptimizedPicture(img.src, img.alt);
    const mainImgElement = pic.querySelector('img');
    mainImgElement.className = 'stats-by-the-number-main-image';
    mainImgElement.setAttribute('data-tab-image', '0');
    mainImgElement.style.opacity = '1';
    moveInstrumentation(img, mainImgElement);
    statsByTheNumberImageContainer.append(pic);
    statsByTheNumberImageContainer.setAttribute('data-image-path', img.src);
  }

  const statsByTheNumberContentSection = document.createElement('div');
  statsByTheNumberContentSection.className = 'stats-by-the-number-content-section';
  statsByTheNumberMainContent.append(statsByTheNumberContentSection);

  const statsByTheNumberTabContent = document.createElement('div');
  statsByTheNumberTabContent.className = 'stats-by-the-number-tab-content stats-by-the-number-tab-content--active';
  statsByTheNumberTabContent.setAttribute('data-tab-content', '0');
  statsByTheNumberContentSection.append(statsByTheNumberTabContent);

  const statsByTheNumberDescription = document.createElement('div');
  statsByTheNumberDescription.className = 'stats-by-the-number-description';
  const mainDescription = block.querySelector('[data-aue-prop="mainDescription"]');
  if (mainDescription) {
    moveInstrumentation(mainDescription, statsByTheNumberDescription);
    statsByTheNumberDescription.innerHTML = mainDescription.innerHTML;
  }
  statsByTheNumberTabContent.append(statsByTheNumberDescription);

  const statsByTheNumberCards = document.createElement('div');
  statsByTheNumberCards.className = 'stats-by-the-number-cards';
  statsByTheNumberCards.setAttribute('role', 'list');
  statsByTheNumberTabContent.append(statsByTheNumberCards);

  const cards = block.querySelectorAll('[data-aue-model="statsCard"]');
  cards.forEach((card, index) => {
    const statsByTheNumberCard = document.createElement('div');
    statsByTheNumberCard.className = 'stats-by-the-number-card';
    statsByTheNumberCard.setAttribute('role', 'img');
    statsByTheNumberCard.setAttribute('tabindex', '0');
    moveInstrumentation(card, statsByTheNumberCard);

    const numberElement = card.querySelector('[data-aue-prop="number"]');
    const descriptionElement = card.querySelector('[data-aue-prop="description"]');
    const hoverImageElement = card.querySelector('[data-aue-prop="hoverImage"]');
    const hoverDetailsElement = card.querySelector('[data-aue-prop="hoverDetails"]');

    if (hoverImageElement) {
      statsByTheNumberCard.setAttribute('data-hover-image', hoverImageElement.textContent.trim());
    }
    if (hoverDetailsElement) {
      statsByTheNumberCard.setAttribute('data-hover-details', hoverDetailsElement.innerHTML.trim());
    }
    if (numberElement && descriptionElement) {
      statsByTheNumberCard.setAttribute('aria-label', `${numberElement.textContent.trim()}: ${descriptionElement.textContent.trim()}`);
    }

    const readOnlyAuthorSpan = document.createElement('span');
    readOnlyAuthorSpan.className = 'readOnlyAuthor';
    readOnlyAuthorSpan.style.display = 'none';
    if (numberElement) {
      readOnlyAuthorSpan.innerHTML = numberElement.innerHTML;
    }
    statsByTheNumberCard.append(readOnlyAuthorSpan);

    const cardNumber = document.createElement('div');
    cardNumber.className = 'stats-by-the-number-card__number';
    if (numberElement) {
      cardNumber.setAttribute('data-count', numberElement.innerHTML.trim());
      moveInstrumentation(numberElement, cardNumber);
      cardNumber.innerHTML = numberElement.innerHTML;
    }
    statsByTheNumberCard.append(cardNumber);

    const cardDescription = document.createElement('div');
    cardDescription.className = 'stats-by-the-number-card__description';
    if (descriptionElement) {
      moveInstrumentation(descriptionElement, cardDescription);
      cardDescription.innerHTML = descriptionElement.innerHTML;
    }
    statsByTheNumberCard.append(cardDescription);

    statsByTheNumberCards.append(statsByTheNumberCard);
  });

  const statsByTheNumberCta = document.createElement('div');
  statsByTheNumberCta.className = 'stats-by-the-number-cta';
  const ctaLink = block.querySelector('[data-aue-prop="ctaLink"]');
  const ctaLabel = block.querySelector('[data-aue-prop="ctaLabel"]');

  if (ctaLink && ctaLabel) {
    const a = document.createElement('a');
    a.className = 'cta cta__primary';
    a.setAttribute('target', '_self');
    a.setAttribute('data-palette', 'palette-1');
    a.setAttribute('href', ctaLink.textContent.trim());
    a.setAttribute('aria-label', ctaLabel.textContent.trim());
    moveInstrumentation(ctaLink, a);
    moveInstrumentation(ctaLabel, a);

    const iconSpan = document.createElement('span');
    iconSpan.className = 'cta__icon qd-icon qd-icon--cheveron-right';
    iconSpan.setAttribute('aria-hidden', 'true');
    a.append(iconSpan);

    const labelSpan = document.createElement('span');
    labelSpan.className = 'cta__label';
    labelSpan.textContent = ctaLabel.textContent.trim();
    a.append(labelSpan);

    statsByTheNumberCta.append(a);
  }
  statsByTheNumberTabContent.append(statsByTheNumberCta);

  block.textContent = '';
  block.append(statsByTheNumberWrapper);

  const blockName = block.dataset.blockName;
  block.className = `${blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
