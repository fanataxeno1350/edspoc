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
    const titleContent = titleDiv.querySelector('div');
    if (titleContent) {
      h2.innerHTML = titleContent.innerHTML;
      moveInstrumentation(titleContent, h2);
    }
    statsByTheNumberTitle.append(h2);
    statsByTheNumberContainer.append(statsByTheNumberTitle);
  }

  const mainContentDiv = document.createElement('div');
  mainContentDiv.className = 'stats-by-the-number-main-content';
  statsByTheNumberContainer.append(mainContentDiv);

  const imageSection = document.createElement('div');
  imageSection.className = 'stats-by-the-number-image-section';
  mainContentDiv.append(imageSection);

  const imageDiv = block.querySelector('div:nth-child(2) > div:nth-child(1)');
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
        moveInstrumentation(img, optimizedImg);
      }
      statsByTheNumberImageContainer.append(optimizedPicture);
    }
    imageSection.append(statsByTheNumberImageContainer);
  }

  const contentSection = document.createElement('div');
  contentSection.className = 'stats-by-the-number-content-section';
  mainContentDiv.append(contentSection);

  const contentDiv = block.querySelector('div:nth-child(2) > div:nth-child(2)');
  if (contentDiv) {
    const statsByTheNumberTabContent = document.createElement('div');
    statsByTheNumberTabContent.className = 'stats-by-the-number-tab-content stats-by-the-number-tab-content--active';
    statsByTheNumberTabContent.setAttribute('data-tab-content', '0');

    const descriptionDiv = contentDiv.querySelector('div:nth-child(1)');
    if (descriptionDiv) {
      const statsByTheNumberDescription = document.createElement('div');
      statsByTheNumberDescription.className = 'stats-by-the-number-description';
      statsByTheNumberDescription.innerHTML = descriptionDiv.innerHTML;
      moveInstrumentation(descriptionDiv, statsByTheNumberDescription);
      statsByTheNumberTabContent.append(statsByTheNumberDescription);
    }

    const cardsDiv = contentDiv.querySelector('div:nth-child(2)');
    if (cardsDiv) {
      const statsByTheNumberCards = document.createElement('div');
      statsByTheNumberCards.className = 'stats-by-the-number-cards';
      statsByTheNumberCards.setAttribute('role', 'list');

      Array.from(cardsDiv.children).forEach((cardDiv) => {
        const statsByTheNumberCard = document.createElement('div');
        statsByTheNumberCard.className = 'stats-by-the-number-card';
        statsByTheNumberCard.setAttribute('role', 'img');
        statsByTheNumberCard.setAttribute('tabindex', '0');

        const hoverImage = cardDiv.querySelector('div:nth-child(3)');
        if (hoverImage) {
            statsByTheNumberCard.setAttribute('data-hover-image', hoverImage.textContent.trim());
        }

        const hoverDetails = cardDiv.querySelector('div:nth-child(4)');
        if (hoverDetails) {
            statsByTheNumberCard.setAttribute('data-hover-details', hoverDetails.innerHTML.trim());
        }

        const ariaLabel = cardDiv.querySelector('div:nth-child(2)');
        if (ariaLabel) {
            statsByTheNumberCard.setAttribute('aria-label', ariaLabel.textContent.trim());
        }

        const readOnlyAuthorSpan = document.createElement('span');
        readOnlyAuthorSpan.className = 'readOnlyAuthor';
        readOnlyAuthorSpan.style.display = 'none';
        const numberContent = cardDiv.querySelector('div:nth-child(1)');
        if (numberContent) {
            readOnlyAuthorSpan.innerHTML = numberContent.innerHTML;
        }
        statsByTheNumberCard.append(readOnlyAuthorSpan);

        const statsByTheNumberCardNumber = document.createElement('div');
        statsByTheNumberCardNumber.className = 'stats-by-the-number-card__number';
        if (numberContent) {
            statsByTheNumberCardNumber.setAttribute('data-count', numberContent.innerHTML.trim());
            statsByTheNumberCardNumber.innerHTML = numberContent.innerHTML;
            moveInstrumentation(numberContent, statsByTheNumberCardNumber);
        }
        statsByTheNumberCard.append(statsByTheNumberCardNumber);

        const statsByTheNumberCardDescription = document.createElement('div');
        statsByTheNumberCardDescription.className = 'stats-by-the-number-card__description';
        if (ariaLabel) {
            statsByTheNumberCardDescription.innerHTML = `<p></p>${ariaLabel.innerHTML}<p></p>`;
            moveInstrumentation(ariaLabel, statsByTheNumberCardDescription);
        }
        statsByTheNumberCard.append(statsByTheNumberCardDescription);

        statsByTheNumberCards.append(statsByTheNumberCard);
      });
      statsByTheNumberTabContent.append(statsByTheNumberCards);
    }

    const ctaDiv = contentDiv.querySelector('div:nth-child(3)');
    if (ctaDiv) {
      const statsByTheNumberCta = document.createElement('div');
      statsByTheNumberCta.className = 'stats-by-the-number-cta';

      const ctaLabel = ctaDiv.querySelector('div:nth-child(1)');
      const ctaUrl = ctaDiv.querySelector('div:nth-child(2)');

      if (ctaLabel && ctaUrl) {
        const anchor = document.createElement('a');
        anchor.href = ctaUrl.textContent.trim();
        anchor.className = 'cta cta__primary';
        anchor.target = '_self';
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

        statsByTheNumberCta.append(anchor);
      }
      statsByTheNumberTabContent.append(statsByTheNumberCta);
    }
    contentSection.append(statsByTheNumberTabContent);
  }

  block.textContent = '';
  block.append(statsByTheNumberWrapper);
}