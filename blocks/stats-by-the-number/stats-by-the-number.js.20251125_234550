import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const blockName = block.dataset.blockName;

  const statsByTheNumberWrapper = document.createElement('div');
  statsByTheNumberWrapper.className = 'stats-by-the-number-wrapper animate-ready animate-in';
  statsByTheNumberWrapper.setAttribute('role', 'region');
  statsByTheNumberWrapper.setAttribute('aria-label', 'Statistics by the numbers');

  const statsByTheNumberContainer = document.createElement('div');
  statsByTheNumberContainer.className = 'stats-by-the-number-container';
  statsByTheNumberWrapper.append(statsByTheNumberContainer);

  // Title
  const titleDiv = block.querySelector('[data-aue-prop="title"]');
  if (titleDiv) {
    const statsByTheNumberTitle = document.createElement('div');
    statsByTheNumberTitle.className = 'stats-by-the-number-title';
    const h2 = document.createElement('h2');
    moveInstrumentation(titleDiv, h2);
    h2.innerHTML = titleDiv.innerHTML;
    statsByTheNumberTitle.append(h2);
    statsByTheNumberContainer.append(statsByTheNumberTitle);
  }

  const statsByTheNumberMainContent = document.createElement('div');
  statsByTheNumberMainContent.className = 'stats-by-the-number-main-content';
  statsByTheNumberContainer.append(statsByTheNumberMainContent);

  // Image Section
  const statsByTheNumberImageSection = document.createElement('div');
  statsByTheNumberImageSection.className = 'stats-by-the-number-image-section';
  statsByTheNumberMainContent.append(statsByTheNumberImageSection);

  const mainImageDiv = block.querySelector('[data-aue-prop="mainImage"]');
  if (mainImageDiv) {
    const statsByTheNumberImageContainer = document.createElement('div');
    statsByTheNumberImageContainer.className = 'stats-by-the-number-image-container stats-by-the-number-image-container--active';
    statsByTheNumberImageContainer.setAttribute('data-tab-content', '0');
    statsByTheNumberImageContainer.setAttribute('data-image-path', mainImageDiv.textContent.trim());

    const img = mainImageDiv.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt);
      pic.querySelector('img').className = 'stats-by-the-number-main-image';
      pic.querySelector('img').setAttribute('data-tab-image', '0');
      pic.querySelector('img').style.opacity = '1';
      moveInstrumentation(img, pic.querySelector('img'));
      statsByTheNumberImageContainer.append(pic);
    }
    statsByTheNumberImageSection.append(statsByTheNumberImageContainer);
  }

  // Content Section
  const statsByTheNumberContentSection = document.createElement('div');
  statsByTheNumberContentSection.className = 'stats-by-the-number-content-section';
  statsByTheNumberMainContent.append(statsByTheNumberContentSection);

  const statsByTheNumberTabContent = document.createElement('div');
  statsByTheNumberTabContent.className = 'stats-by-the-number-tab-content stats-by-the-number-tab-content--active';
  statsByTheNumberTabContent.setAttribute('data-tab-content', '0');
  statsByTheNumberContentSection.append(statsByTheNumberTabContent);

  // Description
  const descriptionDiv = block.querySelector('[data-aue-prop="description"]');
  if (descriptionDiv) {
    const statsByTheNumberDescription = document.createElement('div');
    statsByTheNumberDescription.className = 'stats-by-the-number-description';
    moveInstrumentation(descriptionDiv, statsByTheNumberDescription);
    statsByTheNumberDescription.innerHTML = descriptionDiv.innerHTML;
    statsByTheNumberTabContent.append(statsByTheNumberDescription);
  }

  // Cards
  const statsByTheNumberCards = document.createElement('div');
  statsByTheNumberCards.className = 'stats-by-the-number-cards';
  statsByTheNumberCards.setAttribute('role', 'list');
  statsByTheNumberTabContent.append(statsByTheNumberCards);

  const cardItems = block.querySelectorAll('[data-aue-model="statsCard"]');
  cardItems.forEach((cardItem) => {
    const statsByTheNumberCard = document.createElement('div');
    statsByTheNumberCard.className = 'stats-by-the-number-card';
    statsByTheNumberCard.setAttribute('role', 'img');
    statsByTheNumberCard.setAttribute('tabindex', '0');
    moveInstrumentation(cardItem, statsByTheNumberCard);

    const numberDiv = cardItem.querySelector('[data-aue-prop="number"]');
    const descriptionDiv = cardItem.querySelector('[data-aue-prop="description"]');
    const hoverImageDiv = cardItem.querySelector('[data-aue-prop="hoverImage"]');
    const hoverDetailsDiv = cardItem.querySelector('[data-aue-prop="hoverDetails"]');

    if (hoverImageDiv) {
      statsByTheNumberCard.setAttribute('data-hover-image', hoverImageDiv.textContent.trim());
    }
    if (hoverDetailsDiv) {
      statsByByTheNumberCard.setAttribute('data-hover-details', hoverDetailsDiv.innerHTML.trim());
    }
    if (numberDiv && descriptionDiv) {
      const ariaLabel = `${numberDiv.textContent.trim()}: ${descriptionDiv.textContent.trim()}`;
      statsByTheNumberCard.setAttribute('aria-label', ariaLabel);
    }

    // Hidden readOnlyAuthor span for AEM
    if (numberDiv) {
      const readOnlyAuthorSpan = document.createElement('span');
      readOnlyAuthorSpan.className = 'readOnlyAuthor';
      readOnlyAuthorSpan.style.display = 'none';
      readOnlyAuthorSpan.innerHTML = numberDiv.innerHTML.trim();
      statsByTheNumberCard.append(readOnlyAuthorSpan);
    }

    const statsByTheNumberCardNumber = document.createElement('div');
    statsByTheNumberCardNumber.className = 'stats-by-the-number-card__number';
    if (numberDiv) {
      statsByTheNumberCardNumber.setAttribute('data-count', numberDiv.innerHTML.trim());
      statsByTheNumberCardNumber.innerHTML = numberDiv.innerHTML;
      moveInstrumentation(numberDiv, statsByTheNumberCardNumber);
    }
    statsByTheNumberCard.append(statsByTheNumberCardNumber);

    const statsByTheNumberCardDescription = document.createElement('div');
    statsByTheNumberCardDescription.className = 'stats-by-the-number-card__description';
    if (descriptionDiv) {
      statsByTheNumberCardDescription.innerHTML = descriptionDiv.innerHTML;
      moveInstrumentation(descriptionDiv, statsByTheNumberCardDescription);
    }
    statsByTheNumberCard.append(statsByTheNumberCardDescription);

    statsByTheNumberCards.append(statsByTheNumberCard);
  });

  // CTA
  const ctaUrlDiv = block.querySelector('[data-aue-prop="ctaUrl"]');
  const ctaLabelDiv = block.querySelector('[data-aue-prop="ctaLabel"]');

  if (ctaUrlDiv && ctaLabelDiv) {
    const statsByTheNumberCta = document.createElement('div');
    statsByTheNumberCta.className = 'stats-by-the-number-cta';

    const a = document.createElement('a');
    a.className = 'cta cta__primary';
    a.setAttribute('target', '_self');
    a.setAttribute('data-palette', 'palette-1');
    a.href = ctaUrlDiv.textContent.trim();
    a.setAttribute('aria-label', ctaLabelDiv.textContent.trim());
    moveInstrumentation(ctaUrlDiv, a);
    moveInstrumentation(ctaLabelDiv, a);

    const iconSpan = document.createElement('span');
    iconSpan.className = 'cta__icon qd-icon qd-icon--cheveron-right';
    iconSpan.setAttribute('aria-hidden', 'true');
    a.append(iconSpan);

    const labelSpan = document.createElement('span');
    labelSpan.className = 'cta__label';
    labelSpan.textContent = ctaLabelDiv.textContent.trim();
    a.append(labelSpan);

    statsByTheNumberCta.append(a);
    statsByTheNumberTabContent.append(statsByTheNumberCta);
  }

  // Clear the original block content and append the new structure
  block.textContent = '';
  block.append(statsByTheNumberWrapper);

  // Restore block identity
  block.className = `${blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
