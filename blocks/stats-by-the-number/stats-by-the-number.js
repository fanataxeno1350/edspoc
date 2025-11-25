import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'stats-by-the-number-wrapper animate-ready animate-in';
  wrapper.setAttribute('role', 'region');
  wrapper.setAttribute('aria-label', 'Statistics by the numbers');
  moveInstrumentation(block, wrapper);

  const container = document.createElement('div');
  container.className = 'stats-by-the-number-container';

  const titleDiv = block.querySelector(':scope > div:first-child');
  if (titleDiv) {
    const titleContent = titleDiv.querySelector('h1, h2, h3, h4, h5, h6');
    if (titleContent) {
      const statsTitleDiv = document.createElement('div');
      statsTitleDiv.className = 'stats-by-the-number-title';
      statsTitleDiv.append(titleContent);
      moveInstrumentation(titleDiv, statsTitleDiv);
      container.append(statsTitleDiv);
    }
  }

  const mainContentDiv = document.createElement('div');
  mainContentDiv.className = 'stats-by-the-number-main-content';

  const imageSection = document.createElement('div');
  imageSection.className = 'stats-by-the-number-image-section';
  const imageContainer = document.createElement('div');
  imageContainer.className = 'stats-by-the-number-image-container stats-by-the-number-image-container--active';
  imageContainer.setAttribute('data-tab-content', '0');

  const mainImageDiv = block.querySelector(':scope > div:nth-child(2)');
  if (mainImageDiv) {
    const img = mainImageDiv.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt);
      pic.querySelector('img').className = 'stats-by-the-number-main-image';
      pic.querySelector('img').setAttribute('data-tab-image', '0');
      pic.querySelector('img').style.opacity = '1';
      imageContainer.setAttribute('data-image-path', img.src);
      imageContainer.append(pic);
      moveInstrumentation(img, pic.querySelector('img'));
    }
    imageSection.append(imageContainer);
    moveInstrumentation(mainImageDiv, imageSection);
  }
  mainContentDiv.append(imageSection);

  const contentSection = document.createElement('div');
  contentSection.className = 'stats-by-the-number-content-section';
  const tabContent = document.createElement('div');
  tabContent.className = 'stats-by-the-number-tab-content stats-by-the-number-tab-content--active';
  tabContent.setAttribute('data-tab-content', '0');

  const descriptionDiv = block.querySelector(':scope > div:nth-child(3)');
  if (descriptionDiv) {
    const p = descriptionDiv.querySelector('p');
    if (p) {
      const statsDescription = document.createElement('div');
      statsDescription.className = 'stats-by-the-number-description';
      statsDescription.append(p);
      moveInstrumentation(descriptionDiv, statsDescription);
      tabContent.append(statsDescription);
    }
  }

  const cardsDiv = block.querySelector(':scope > div:nth-child(4)');
  if (cardsDiv) {
    const statsCards = document.createElement('div');
    statsCards.className = 'stats-by-the-number-cards';
    statsCards.setAttribute('role', 'list');

    Array.from(cardsDiv.children).forEach((cardDiv) => {
      const statsCard = document.createElement('div');
      statsCard.className = 'stats-by-the-number-card';
      statsCard.setAttribute('role', 'img');
      statsCard.setAttribute('tabindex', '0');

      const hoverImage = cardDiv.querySelector('a');
      if (hoverImage) {
        statsCard.setAttribute('data-hover-image', hoverImage.href);
      }

      const hoverDetails = cardDiv.querySelector('div:nth-child(2)');
      if (hoverDetails) {
        statsCard.setAttribute('data-hover-details', hoverDetails.innerHTML);
      }

      const numberElement = cardDiv.querySelector('div:nth-child(3)');
      if (numberElement) {
        const readOnlyAuthorSpan = document.createElement('span');
        readOnlyAuthorSpan.className = 'readOnlyAuthor';
        readOnlyAuthorSpan.style.display = 'none';
        readOnlyAuthorSpan.innerHTML = numberElement.innerHTML;
        statsCard.append(readOnlyAuthorSpan);

        const numberDiv = document.createElement('div');
        numberDiv.className = 'stats-by-the-number-card__number';
        numberDiv.setAttribute('data-count', numberElement.innerHTML);
        numberDiv.innerHTML = numberElement.innerHTML;
        statsCard.append(numberDiv);
      }

      const descriptionElement = cardDiv.querySelector('div:nth-child(4)');
      if (descriptionElement) {
        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'stats-by-the-number-card__description';
        descriptionDiv.innerHTML = descriptionElement.innerHTML;
        statsCard.append(descriptionDiv);
      }

      const ariaLabelContent = cardDiv.querySelector('div:nth-child(3)')?.textContent || '';
      const ariaLabelDesc = cardDiv.querySelector('div:nth-child(4)')?.textContent || '';
      statsCard.setAttribute('aria-label', `${ariaLabelContent}: ${ariaLabelDesc}`);

      moveInstrumentation(cardDiv, statsCard);
      statsCards.append(statsCard);
    });
    tabContent.append(statsCards);
    moveInstrumentation(cardsDiv, statsCards);
  }

  const ctaDiv = block.querySelector(':scope > div:nth-child(5)');
  if (ctaDiv) {
    const ctaLink = ctaDiv.querySelector('a');
    if (ctaLink) {
      const statsCta = document.createElement('div');
      statsCta.className = 'stats-by-the-number-cta';
      ctaLink.className = 'cta cta__primary';
      ctaLink.setAttribute('target', '_self');
      ctaLink.setAttribute('aria-label', ctaLink.textContent.trim());
      ctaLink.setAttribute('data-palette', 'palette-1');

      const iconSpan = document.createElement('span');
      iconSpan.className = 'cta__icon qd-icon qd-icon--cheveron-right';
      iconSpan.setAttribute('aria-hidden', 'true');

      const labelSpan = document.createElement('span');
      labelSpan.className = 'cta__label';
      labelSpan.textContent = ctaLink.textContent.trim();

      ctaLink.textContent = '';
      ctaLink.append(iconSpan, labelSpan);

      statsCta.append(ctaLink);
      moveInstrumentation(ctaDiv, statsCta);
      tabContent.append(statsCta);
    }
  }

  contentSection.append(tabContent);
  mainContentDiv.append(contentSection);
  container.append(mainContentDiv);
  wrapper.append(container);

  block.textContent = '';
  block.append(wrapper);
}
