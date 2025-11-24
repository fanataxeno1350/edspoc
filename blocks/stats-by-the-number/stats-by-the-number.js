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

  const titleDiv = block.querySelector('div:nth-child(1)');
  if (titleDiv) {
    const statsByTheNumberTitle = document.createElement('div');
    statsByTheNumberTitle.className = 'stats-by-the-number-title';
    const h2 = document.createElement('h2');
    h2.innerHTML = titleDiv.innerHTML;
    statsByTheNumberTitle.append(h2);
    statsByTheNumberContainer.append(statsByTheNumberTitle);
    moveInstrumentation(titleDiv, statsByTheNumberTitle);
  }

  const statsByTheNumberMainContent = document.createElement('div');
  statsByTheNumberMainContent.className = 'stats-by-the-number-main-content';
  statsByTheNumberContainer.append(statsByTheNumberMainContent);

  const statsByTheNumberImageSection = document.createElement('div');
  statsByTheNumberImageSection.className = 'stats-by-the-number-image-section';
  statsByTheNumberMainContent.append(statsByTheNumberImageSection);

  const imageDiv = block.querySelector('div:nth-child(2)');
  if (imageDiv) {
    const statsByTheNumberImageContainer = document.createElement('div');
    statsByTheNumberImageContainer.className = 'stats-by-the-number-image-container stats-by-the-number-image-container--active';
    statsByTheNumberImageContainer.setAttribute('data-tab-content', '0');

    const img = imageDiv.querySelector('img');
    if (img) {
      statsByTheNumberImageContainer.setAttribute('data-image-path', img.src);
      const optimizedPicture = createOptimizedPicture(img.src, img.alt);
      const optimizedImg = optimizedPicture.querySelector('img');
      if (optimizedImg) {
        optimizedImg.className = 'stats-by-the-number-main-image';
        optimizedImg.setAttribute('data-tab-image', '0');
        optimizedImg.style.opacity = '1';
      }
      statsByTheNumberImageContainer.append(optimizedPicture);
    }
    statsByTheNumberImageSection.append(statsByTheNumberImageContainer);
    moveInstrumentation(imageDiv, statsByTheNumberImageContainer);
  }

  const statsByTheNumberContentSection = document.createElement('div');
  statsByTheNumberContentSection.className = 'stats-by-the-number-content-section';
  statsByTheNumberMainContent.append(statsByTheNumberContentSection);

  const descriptionDiv = block.querySelector('div:nth-child(3)');
  const ctaDiv = block.querySelector('div:nth-child(4)');
  const statCards = Array.from(block.children).slice(5);

  const statsByTheNumberTabContent = document.createElement('div');
  statsByTheNumberTabContent.className = 'stats-by-the-number-tab-content stats-by-the-number-tab-content--active';
  statsByTheNumberTabContent.setAttribute('data-tab-content', '0');
  statsByTheNumberContentSection.append(statsByTheNumberTabContent);

  if (descriptionDiv) {
    const statsByTheNumberDescription = document.createElement('div');
    statsByTheNumberDescription.className = 'stats-by-the-number-description';
    statsByTheNumberDescription.innerHTML = descriptionDiv.innerHTML;
    statsByTheNumberTabContent.append(statsByTheNumberDescription);
    moveInstrumentation(descriptionDiv, statsByTheNumberDescription);
  }

  if (statCards.length > 0) {
    const statsByTheNumberCards = document.createElement('div');
    statsByTheNumberCards.className = 'stats-by-the-number-cards';
    statsByTheNumberCards.setAttribute('role', 'list');
    statsByTheNumberTabContent.append(statsByTheNumberCards);

    statCards.forEach((cardDiv, index) => {
      const statsByTheNumberCard = document.createElement('div');
      statsByTheNumberCard.className = 'stats-by-the-number-card';
      statsByTheNumberCard.setAttribute('role', 'img');
      statsByTheNumberCard.setAttribute('tabindex', '0');

      const numberElement = cardDiv.querySelector('div:nth-child(1)');
      const descriptionElement = cardDiv.querySelector('div:nth-child(2)');
      const hoverImageElement = cardDiv.querySelector('div:nth-child(3)');
      const hoverDetailsElement = cardDiv.querySelector('div:nth-child(4)');

      if (hoverImageElement) {
        const img = hoverImageElement.querySelector('img');
        if (img) {
          statsByTheNumberCard.setAttribute('data-hover-image', img.src);
        }
      }
      if (hoverDetailsElement) {
        statsByTheNumberCard.setAttribute('data-hover-details', hoverDetailsElement.innerHTML);
      }
      if (numberElement && descriptionElement) {
        const ariaLabel = `${numberElement.textContent.trim()}: ${descriptionElement.textContent.trim()}`;
        statsByTheNumberCard.setAttribute('aria-label', ariaLabel);
      }

      if (numberElement) {
        const readOnlyAuthorSpan = document.createElement('span');
        readOnlyAuthorSpan.className = 'readOnlyAuthor';
        readOnlyAuthorSpan.style.display = 'none';
        readOnlyAuthorSpan.innerHTML = numberElement.innerHTML;
        statsByTheNumberCard.append(readOnlyAuthorSpan);

        const statsByTheNumberCardNumber = document.createElement('div');
        statsByTheNumberCardNumber.className = 'stats-by-the-number-card__number';
        statsByTheNumberCardNumber.setAttribute('data-count', numberElement.innerHTML);
        statsByTheNumberCardNumber.innerHTML = numberElement.innerHTML;
        statsByTheNumberCard.append(statsByTheNumberCardNumber);
      }

      if (descriptionElement) {
        const statsByTheNumberCardDescription = document.createElement('div');
        statsByTheNumberCardDescription.className = 'stats-by-the-number-card__description';
        statsByTheNumberCardDescription.innerHTML = descriptionElement.innerHTML;
        statsByTheNumberCard.append(statsByTheNumberCardDescription);
      }

      statsByTheNumberCards.append(statsByTheNumberCard);
      moveInstrumentation(cardDiv, statsByTheNumberCard);
    });
  }

  if (ctaDiv) {
    const statsByTheNumberCta = document.createElement('div');
    statsByTheNumberCta.className = 'stats-by-the-number-cta';

    const ctaLink = ctaDiv.querySelector('a');
    if (ctaLink) {
      const newCtaLink = document.createElement('a');
      newCtaLink.href = ctaLink.href;
      newCtaLink.className = 'cta cta__primary';
      if (ctaLink.target) {
        newCtaLink.target = ctaLink.target;
      }
      if (ctaLink.getAttribute('aria-label')) {
        newCtaLink.setAttribute('aria-label', ctaLink.getAttribute('aria-label'));
      }
      newCtaLink.setAttribute('data-palette', 'palette-1');

      const ctaIcon = document.createElement('span');
      ctaIcon.className = 'cta__icon qd-icon qd-icon--cheveron-right';
      ctaIcon.setAttribute('aria-hidden', 'true');
      newCtaLink.append(ctaIcon);

      const ctaLabel = document.createElement('span');
      ctaLabel.className = 'cta__label';
      ctaLabel.textContent = ctaLink.textContent.trim();
      newCtaLink.append(ctaLabel);

      statsByTheNumberCta.append(newCtaLink);
    }
    statsByTheNumberTabContent.append(statsByTheNumberCta);
    moveInstrumentation(ctaDiv, statsByTheNumberCta);
  }

  block.textContent = '';
  block.append(statsByTheNumberWrapper);
}
