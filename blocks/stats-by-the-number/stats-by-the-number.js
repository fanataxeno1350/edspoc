import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const statsByTheNumberWrapper = document.createElement('div');
  statsByTheNumberWrapper.className = 'stats-by-the-number-wrapper animate-ready animate-in';
  statsByTheNumberWrapper.setAttribute('role', 'region');
  statsByTheNumberWrapper.setAttribute('aria-label', 'Statistics by the numbers');
  moveInstrumentation(block, statsByTheNumberWrapper);

  const statsByTheNumberContainer = document.createElement('div');
  statsByTheNumberContainer.className = 'stats-by-the-number-container';

  const titleDiv = block.querySelector(':scope > div:first-child');
  const titleH2 = titleDiv ? titleDiv.querySelector('h1, h2, h3, h4, h5, h6') : null;
  if (titleH2) {
    const statsByTheNumberTitle = document.createElement('div');
    statsByTheNumberTitle.className = 'stats-by-the-number-title';
    statsByTheNumberTitle.append(titleH2);
    statsByTheNumberContainer.append(statsByTheNumberTitle);
    moveInstrumentation(titleDiv, statsByTheNumberTitle);
  }

  const statsByTheNumberMainContent = document.createElement('div');
  statsByTheNumberMainContent.className = 'stats-by-the-number-main-content';

  const statsByTheNumberImageSection = document.createElement('div');
  statsByTheNumberImageSection.className = 'stats-by-the-number-image-section';

  const mainImageDiv = block.querySelector(':scope > div:nth-child(2)');
  const mainImage = mainImageDiv ? mainImageDiv.querySelector('img') : null;
  if (mainImage) {
    const statsByTheNumberImageContainer = document.createElement('div');
    statsByTheNumberImageContainer.className = 'stats-by-the-number-image-container stats-by-the-number-image-container--active';
    statsByTheNumberImageContainer.setAttribute('data-tab-content', '0');
    statsByTheNumberImageContainer.setAttribute('data-image-path', mainImage.src);

    const pic = createOptimizedPicture(mainImage.src, mainImage.alt);
    const optimizedImg = pic.querySelector('img');
    optimizedImg.className = 'stats-by-the-number-main-image';
    optimizedImg.setAttribute('data-tab-image', '0');
    optimizedImg.style.opacity = '1';
    moveInstrumentation(mainImage, optimizedImg);

    statsByTheNumberImageContainer.append(pic);
    statsByTheNumberImageSection.append(statsByTheNumberImageContainer);
    moveInstrumentation(mainImageDiv, statsByTheNumberImageContainer);
  }
  statsByTheNumberMainContent.append(statsByTheNumberImageSection);

  const statsByTheNumberContentSection = document.createElement('div');
  statsByTheNumberContentSection.className = 'stats-by-the-number-content-section';

  const statsByTheNumberTabContent = document.createElement('div');
  statsByTheNumberTabContent.className = 'stats-by-the-number-tab-content stats-by-the-number-tab-content--active';
  statsByTheNumberTabContent.setAttribute('data-tab-content', '0');

  const descriptionDiv = block.querySelector(':scope > div:nth-child(3)');
  if (descriptionDiv) {
    const statsByTheNumberDescription = document.createElement('div');
    statsByTheNumberDescription.className = 'stats-by-the-number-description';
    statsByTheNumberDescription.innerHTML = descriptionDiv.innerHTML;
    statsByTheNumberTabContent.append(statsByTheNumberDescription);
    moveInstrumentation(descriptionDiv, statsByTheNumberDescription);
  }

  const statsByTheNumberCards = document.createElement('div');
  statsByTheNumberCards.className = 'stats-by-the-number-cards';
  statsByTheNumberCards.setAttribute('role', 'list');

  const statsCards = block.querySelectorAll(':scope > div:nth-child(6) > div');
  statsCards.forEach((cardDiv, index) => {
    const hoverImage = cardDiv.querySelector('img');
    const hoverDetails = cardDiv.querySelector('div:nth-child(2)');
    const number = cardDiv.querySelector('div:nth-child(3)');
    const cardDescription = cardDiv.querySelector('div:nth-child(4)');

    const statsByTheNumberCard = document.createElement('div');
    statsByTheNumberCard.className = 'stats-by-the-number-card';
    statsByTheNumberCard.setAttribute('role', 'img');
    statsByTheNumberCard.setAttribute('tabindex', '0');
    statsByTheNumberCard.setAttribute('data-hover-image', hoverImage ? hoverImage.src : '');
    statsByTheNumberCard.setAttribute('data-hover-details', hoverDetails ? hoverDetails.innerHTML : '');

    const cardAriaLabel = `${number ? number.textContent.trim() : ''}: ${cardDescription ? cardDescription.textContent.trim() : ''}`;
    statsByTheNumberCard.setAttribute('aria-label', cardAriaLabel);
    moveInstrumentation(cardDiv, statsByTheNumberCard);

    const readOnlyAuthorSpan = document.createElement('span');
    readOnlyAuthorSpan.className = 'readOnlyAuthor';
    readOnlyAuthorSpan.style.display = 'none';
    readOnlyAuthorSpan.innerHTML = number ? number.innerHTML : '';
    statsByTheNumberCard.append(readOnlyAuthorSpan);

    const statsByTheNumberCardNumber = document.createElement('div');
    statsByTheNumberCardNumber.className = 'stats-by-the-number-card__number';
    statsByTheNumberCardNumber.setAttribute('data-count', number ? number.innerHTML : '');
    statsByTheNumberCardNumber.innerHTML = number ? number.innerHTML : '';
    statsByTheNumberCard.append(statsByTheNumberCardNumber);

    const statsByTheNumberCardDescription = document.createElement('div');
    statsByTheNumberCardDescription.className = 'stats-by-the-number-card__description';
    statsByTheNumberCardDescription.innerHTML = cardDescription ? cardDescription.innerHTML : '';
    statsByTheNumberCard.append(statsByTheNumberCardDescription);

    statsByTheNumberCards.append(statsByTheNumberCard);
  });
  statsByTheNumberTabContent.append(statsByTheNumberCards);

  const ctaLinkDiv = block.querySelector(':scope > div:nth-child(4)');
  const ctaLabelDiv = block.querySelector(':scope > div:nth-child(5)');
  const ctaLink = ctaLinkDiv ? ctaLinkDiv.querySelector('a') : null;
  const ctaLabel = ctaLabelDiv ? ctaLabelDiv.textContent.trim() : '';

  if (ctaLink) {
    const statsByTheNumberCta = document.createElement('div');
    statsByTheNumberCta.className = 'stats-by-the-number-cta';

    const ctaAnchor = document.createElement('a');
    ctaAnchor.href = ctaLink.href;
    ctaAnchor.className = 'cta cta__primary';
    ctaAnchor.target = '_self';
    ctaAnchor.setAttribute('aria-label', ctaLabel);
    ctaAnchor.setAttribute('data-palette', 'palette-1');
    moveInstrumentation(ctaLink, ctaAnchor);

    const ctaIcon = document.createElement('span');
    ctaIcon.className = 'cta__icon qd-icon qd-icon--cheveron-right';
    ctaIcon.setAttribute('aria-hidden', 'true');
    ctaAnchor.append(ctaIcon);

    const ctaLabelSpan = document.createElement('span');
    ctaLabelSpan.className = 'cta__label';
    ctaLabelSpan.textContent = ctaLabel;
    ctaAnchor.append(ctaLabelSpan);

    statsByTheNumberCta.append(ctaAnchor);
    statsByTheNumberTabContent.append(statsByTheNumberCta);
    moveInstrumentation(ctaLinkDiv, statsByTheNumberCta);
  }

  statsByTheNumberContentSection.append(statsByTheNumberTabContent);
  statsByTheNumberMainContent.append(statsByTheNumberContentSection);
  statsByTheNumberContainer.append(statsByTheNumberMainContent);
  statsByTheNumberWrapper.append(statsByTheNumberContainer);

  block.textContent = '';
  block.append(statsByTheNumberWrapper);
}
