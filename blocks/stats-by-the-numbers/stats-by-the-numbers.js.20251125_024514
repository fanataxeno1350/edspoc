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

  const titleDiv = block.querySelector(':scope > div:first-child > div');
  if (titleDiv) {
    const titleWrapper = document.createElement('div');
    titleWrapper.className = 'stats-by-the-number-title';
    const h2 = document.createElement('h2');
    h2.innerHTML = titleDiv.innerHTML;
    moveInstrumentation(titleDiv, h2);
    titleWrapper.append(h2);
    container.append(titleWrapper);
  }

  const mainContent = document.createElement('div');
  mainContent.className = 'stats-by-the-number-main-content';

  const imageSection = document.createElement('div');
  imageSection.className = 'stats-by-the-number-image-section';

  const mainImageCell = block.querySelector(':scope > div:nth-child(2) > div:first-child');
  if (mainImageCell) {
    const imageContainer = document.createElement('div');
    imageContainer.className = 'stats-by-the-number-image-container stats-by-the-number-image-container--active';
    imageContainer.setAttribute('data-tab-content', '0');

    const img = mainImageCell.querySelector('img');
    if (img) {
      imageContainer.setAttribute('data-image-path', img.src);
      const pic = createOptimizedPicture(img.src, img.alt);
      const optimizedImg = pic.querySelector('img');
      optimizedImg.className = 'stats-by-the-number-main-image';
      optimizedImg.setAttribute('data-tab-image', '0');
      optimizedImg.style.opacity = '1';
      moveInstrumentation(img, optimizedImg);
      imageContainer.append(pic);
    }
    imageSection.append(imageContainer);
  }
  mainContent.append(imageSection);

  const contentSection = document.createElement('div');
  contentSection.className = 'stats-by-the-number-content-section';

  const tabContent = document.createElement('div');
  tabContent.className = 'stats-by-the-number-tab-content stats-by-the-number-tab-content--active';
  tabContent.setAttribute('data-tab-content', '0');

  const descriptionCell = block.querySelector(':scope > div:nth-child(3) > div:first-child');
  if (descriptionCell) {
    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'stats-by-the-number-description';
    const p = descriptionCell.querySelector('p');
    if (p) {
      descriptionDiv.append(p);
      moveInstrumentation(descriptionCell, descriptionDiv);
    }
    tabContent.append(descriptionDiv);
  }

  const cardsWrapper = document.createElement('div');
  cardsWrapper.className = 'stats-by-the-number-cards';
  cardsWrapper.setAttribute('role', 'list');

  const statCardsContainer = block.querySelector(':scope > div:nth-child(4)');
  if (statCardsContainer) {
    Array.from(statCardsContainer.children).forEach((cardCell, index) => {
      const card = document.createElement('div');
      card.className = 'stats-by-the-number-card';
      card.setAttribute('role', 'img');
      card.setAttribute('tabindex', '0');

      const numberElement = cardCell.querySelector('div:first-child');
      const descriptionElement = cardCell.querySelector('div:nth-child(2)');
      const hoverImageElement = cardCell.querySelector('div:nth-child(3)');
      const hoverDetailsElement = cardCell.querySelector('div:nth-child(4)');

      if (hoverImageElement) {
        card.setAttribute('data-hover-image', hoverImageElement.textContent.trim());
      }
      if (hoverDetailsElement) {
        card.setAttribute('data-hover-details', hoverDetailsElement.innerHTML.trim());
      }

      let ariaLabelText = '';
      if (numberElement) {
        ariaLabelText += numberElement.textContent.trim();
      }
      if (descriptionElement) {
        ariaLabelText += `: ${descriptionElement.textContent.trim()}`;
      }
      card.setAttribute('aria-label', ariaLabelText);

      const readOnlyAuthor = document.createElement('span');
      readOnlyAuthor.className = 'readOnlyAuthor';
      readOnlyAuthor.style.display = 'none';
      if (numberElement) {
        readOnlyAuthor.innerHTML = numberElement.innerHTML;
      }
      card.append(readOnlyAuthor);

      const numberDiv = document.createElement('div');
      numberDiv.className = 'stats-by-the-number-card__number';
      if (numberElement) {
        numberDiv.setAttribute('data-count', numberElement.innerHTML.trim());
        numberDiv.innerHTML = numberElement.innerHTML;
      }
      card.append(numberDiv);

      const descriptionDiv = document.createElement('div');
      descriptionDiv.className = 'stats-by-the-number-card__description';
      if (descriptionElement) {
        descriptionDiv.innerHTML = descriptionElement.innerHTML;
      }
      card.append(descriptionDiv);

      moveInstrumentation(cardCell, card);
      cardsWrapper.append(card);
    });
  }
  tabContent.append(cardsWrapper);

  const ctaCell = block.querySelector(':scope > div:nth-child(5)');
  if (ctaCell) {
    const ctaDiv = document.createElement('div');
    ctaDiv.className = 'stats-by-the-number-cta';

    const ctaLabel = ctaCell.querySelector('div:first-child');
    const ctaUrl = ctaCell.querySelector('div:nth-child(2)');

    if (ctaLabel && ctaUrl) {
      const a = document.createElement('a');
      a.href = ctaUrl.textContent.trim();
      a.className = 'cta cta__primary';
      a.target = '_self';
      a.setAttribute('aria-label', ctaLabel.textContent.trim());
      a.setAttribute('data-palette', 'palette-1');

      const icon = document.createElement('span');
      icon.className = 'cta__icon qd-icon qd-icon--cheveron-right';
      icon.setAttribute('aria-hidden', 'true');
      a.append(icon);

      const labelSpan = document.createElement('span');
      labelSpan.className = 'cta__label';
      labelSpan.textContent = ctaLabel.textContent.trim();
      a.append(labelSpan);

      ctaDiv.append(a);
      moveInstrumentation(ctaCell, ctaDiv);
    }
    tabContent.append(ctaDiv);
  }

  contentSection.append(tabContent);
  mainContent.append(contentSection);
  container.append(mainContent);
  wrapper.append(container);

  block.textContent = '';
  block.append(wrapper);
}
