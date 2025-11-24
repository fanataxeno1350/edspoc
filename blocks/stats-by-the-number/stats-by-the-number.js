import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const statsByTheNumberWrapper = document.createElement('div');
  statsByTheNumberWrapper.className = 'stats-by-the-number-wrapper animate-ready animate-in';
  statsByTheNumberWrapper.setAttribute('role', 'region');
  statsByTheNumberWrapper.setAttribute('aria-label', 'Statistics by the numbers');

  const statsByTheNumberContainer = document.createElement('div');
  statsByTheNumberContainer.className = 'stats-by-the-number-container';

  // Model: statsByTheNumber
  // Field: title
  const titleElement = block.querySelector('.stats-by-the-number-title h2');
  if (titleElement) {
    const titleDiv = document.createElement('div');
    titleDiv.className = 'stats-by-the-number-title';
    titleDiv.appendChild(titleElement.cloneNode(true));
    statsByTheNumberContainer.appendChild(titleDiv);
  }

  const statsByTheNumberMainContent = document.createElement('div');
  statsByTheNumberMainContent.className = 'stats-by-the-number-main-content';

  const statsByTheNumberImageSection = document.createElement('div');
  statsByTheNumberImageSection.className = 'stats-by-the-number-image-section';

  // Model: statsByTheNumber
  // Field: image
  const imageContainer = block.querySelector('.stats-by-the-number-image-container');
  if (imageContainer) {
    const originalImg = imageContainer.querySelector('img');
    if (originalImg) {
      const optimizedPic = createOptimizedPicture(originalImg.src, originalImg.alt);
      const optimizedImg = optimizedPic.querySelector('img');
      optimizedImg.className = 'stats-by-the-number-main-image';
      moveInstrumentation(originalImg, optimizedImg);
      
      const newImageContainer = document.createElement('div');
      newImageContainer.className = imageContainer.className;
      newImageContainer.setAttribute('data-tab-content', imageContainer.getAttribute('data-tab-content'));
      newImageContainer.setAttribute('data-image-path', imageContainer.getAttribute('data-image-path'));
      newImageContainer.appendChild(optimizedPic);
      statsByTheNumberImageSection.appendChild(newImageContainer);
    }
  }
  statsByTheNumberMainContent.appendChild(statsByTheNumberImageSection);

  const statsByTheNumberContentSection = document.createElement('div');
  statsByTheNumberContentSection.className = 'stats-by-the-number-content-section';

  const statsByTheNumberTabContent = document.createElement('div');
  statsByTheNumberTabContent.className = 'stats-by-the-number-tab-content stats-by-the-number-tab-content--active';
  statsByTheNumberTabContent.setAttribute('data-tab-content', '0');

  // Model: statsByTheNumber
  // Field: description
  const descriptionElement = block.querySelector('.stats-by-the-number-description p');
  if (descriptionElement) {
    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'stats-by-the-number-description';
    descriptionDiv.appendChild(descriptionElement.cloneNode(true));
    statsByTheNumberTabContent.appendChild(descriptionDiv);
  }

  const statsByTheNumberCards = document.createElement('div');
  statsByTheNumberCards.className = 'stats-by-the-number-cards';
  statsByTheNumberCards.setAttribute('role', 'list');

  // Model: statsCard (multifield)
  const authoredCards = block.querySelectorAll('.stats-by-the-number-card');
  authoredCards.forEach((authoredCard) => {
    const newCard = document.createElement('div');
    newCard.className = 'stats-by-the-number-card';
    newCard.setAttribute('role', 'img');
    newCard.setAttribute('tabindex', '0');
    moveInstrumentation(authoredCard, newCard);

    // Field: hoverImage
    const hoverImage = authoredCard.getAttribute('data-hover-image');
    if (hoverImage) {
      newCard.setAttribute('data-hover-image', hoverImage);
    }

    // Field: hoverDetails
    const hoverDetails = authoredCard.getAttribute('data-hover-details');
    if (hoverDetails) {
      newCard.setAttribute('data-hover-details', hoverDetails);
    }

    // Field: number
    const numberDiv = authoredCard.querySelector('.stats-by-the-number-card__number');
    if (numberDiv) {
      const newNumberDiv = document.createElement('div');
      newNumberDiv.className = 'stats-by-the-number-card__number';
      newNumberDiv.innerHTML = numberDiv.innerHTML;
      const dataCount = numberDiv.getAttribute('data-count');
      if (dataCount) {
        newNumberDiv.setAttribute('data-count', dataCount);
      }
      newCard.appendChild(newNumberDiv);
    }

    // Field: description
    const cardDescriptionDiv = authoredCard.querySelector('.stats-by-the-number-card__description');
    if (cardDescriptionDiv) {
      const newCardDescriptionDiv = document.createElement('div');
      newCardDescriptionDiv.className = 'stats-by-the-number-card__description';
      newCardDescriptionDiv.innerHTML = cardDescriptionDiv.innerHTML;
      newCard.appendChild(newCardDescriptionDiv);
    }

    // Preserve aria-label if present
    const ariaLabel = authoredCard.getAttribute('aria-label');
    if (ariaLabel) {
      newCard.setAttribute('aria-label', ariaLabel);
    }

    statsByTheNumberCards.appendChild(newCard);
  });
  statsByTheNumberTabContent.appendChild(statsByTheNumberCards);

  // Model: statsByTheNumber
  // Field: ctaLink and ctaLabel
  const ctaElement = block.querySelector('.stats-by-the-number-cta a.cta');
  if (ctaElement) {
    const ctaDiv = document.createElement('div');
    ctaDiv.className = 'stats-by-the-number-cta';
    ctaDiv.appendChild(ctaElement.cloneNode(true));
    statsByTheNumberTabContent.appendChild(ctaDiv);
  }

  statsByTheNumberContentSection.appendChild(statsByTheNumberTabContent);
  statsByTheNumberMainContent.appendChild(statsByTheNumberContentSection);
  statsByTheNumberContainer.appendChild(statsByTheNumberMainContent);
  statsByTheNumberWrapper.appendChild(statsByTheNumberContainer);

  block.textContent = '';
  block.append(statsByTheNumberWrapper);
}
