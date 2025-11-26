import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'stats-by-the-number-wrapper animate-ready animate-in';
  wrapper.setAttribute('role', 'region');
  wrapper.setAttribute('aria-label', 'Statistics by the numbers');

  const container = document.createElement('div');
  container.className = 'stats-by-the-number-container';

  // Title Section
  const titleDiv = document.createElement('div');
  titleDiv.className = 'stats-by-the-number-title';
  const authoredTitle = block.querySelector('[data-aue-prop="title"]');
  if (authoredTitle) {
    const h2 = document.createElement('h2');
    h2.append(...authoredTitle.childNodes);
    moveInstrumentation(authoredTitle, h2);
    titleDiv.append(h2);
  }
  container.append(titleDiv);

  // Main Content Section
  const mainContent = document.createElement('div');
  mainContent.className = 'stats-by-the-number-main-content';

  // Image Section
  const imageSection = document.createElement('div');
  imageSection.className = 'stats-by-the-number-image-section';
  const imageContainer = document.createElement('div');
  imageContainer.className = 'stats-by-the-number-image-container stats-by-the-number-image-container--active';
  imageContainer.setAttribute('data-tab-content', '0');

  const authoredMainImage = block.querySelector('[data-aue-prop="mainImage"] img');
  if (authoredMainImage) {
    const pic = createOptimizedPicture(authoredMainImage.src, authoredMainImage.alt);
    const img = pic.querySelector('img');
    img.className = 'stats-by-the-number-main-image';
    img.setAttribute('data-tab-image', '0');
    img.style.opacity = '1';
    imageContainer.append(pic);
    moveInstrumentation(authoredMainImage, img);
    imageContainer.setAttribute('data-image-path', authoredMainImage.src);
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
  const authoredDescription = block.querySelector('[data-aue-prop="description"]');
  if (authoredDescription) {
    const p = document.createElement('p');
    p.append(...authoredDescription.childNodes);
    moveInstrumentation(authoredDescription, p);
    descriptionDiv.append(p);
  }
  tabContent.append(descriptionDiv);

  // Stat Cards
  const cardsDiv = document.createElement('div');
  cardsDiv.className = 'stats-by-the-number-cards';
  cardsDiv.setAttribute('role', 'list');

  const statCardsContainer = block.querySelector('[data-aue-prop="statCards"]');
  if (statCardsContainer) {
    const statCardItems = statCardsContainer.querySelectorAll('[data-aue-model="statCard"]');
    statCardItems.forEach((cardItem, index) => {
      const card = document.createElement('div');
      card.className = 'stats-by-the-number-card';
      card.setAttribute('role', 'img');
      card.setAttribute('tabindex', '0');

      const numberElement = cardItem.querySelector('[data-aue-prop="number"]');
      const descriptionElement = cardItem.querySelector('[data-aue-prop="description"]');
      const hoverImageElement = cardItem.querySelector('[data-aue-prop="hoverImage"]');
      const hoverDetailsElement = cardItem.querySelector('[data-aue-prop="hoverDetails"]');

      if (hoverImageElement?.textContent) {
        card.setAttribute('data-hover-image', hoverImageElement.textContent);
      }
      if (hoverDetailsElement?.innerHTML) {
        card.setAttribute('data-hover-details', hoverDetailsElement.innerHTML);
      }

      let ariaLabel = '';
      if (numberElement?.textContent) {
        ariaLabel += numberElement.textContent.replace(/<[^>]*>?/gm, '') + ': ';
      }
      if (descriptionElement?.textContent) {
        ariaLabel += descriptionElement.textContent.replace(/<[^>]*>?/gm, '');
      }
      card.setAttribute('aria-label', ariaLabel);

      // Hidden span for readOnlyAuthor
      const readOnlyAuthorSpan = document.createElement('span');
      readOnlyAuthorSpan.className = 'readOnlyAuthor';
      readOnlyAuthorSpan.style.display = 'none';
      if (numberElement?.innerHTML) {
        readOnlyAuthorSpan.innerHTML = numberElement.innerHTML;
      }
      card.append(readOnlyAuthorSpan);
      moveInstrumentation(numberElement, readOnlyAuthorSpan);

      const numberDiv = document.createElement('div');
      numberDiv.className = 'stats-by-the-number-card__number';
      if (numberElement?.innerHTML) {
        numberDiv.setAttribute('data-count', numberElement.innerHTML);
        numberDiv.innerHTML = numberElement.innerHTML;
      }
      card.append(numberDiv);

      const descriptionDivCard = document.createElement('div');
      descriptionDivCard.className = 'stats-by-the-number-card__description';
      if (descriptionElement) {
        const p = document.createElement('p');
        p.append(...descriptionElement.childNodes);
        moveInstrumentation(descriptionElement, p);
        descriptionDivCard.append(p);
      }
      card.append(descriptionDivCard);

      cardsDiv.append(card);
    });
  }
  tabContent.append(cardsDiv);

  // CTA
  const ctaDiv = document.createElement('div');
  ctaDiv.className = 'stats-by-the-number-cta';

  const ctaLabel = block.querySelector('[data-aue-prop="ctaLabel"]');
  const ctaUrl = block.querySelector('[data-aue-prop="ctaUrl"]');

  if (ctaLabel && ctaUrl?.textContent) {
    const anchor = document.createElement('a');
    anchor.href = ctaUrl.textContent;
    anchor.className = 'cta cta__primary';
    anchor.target = '_self';
    anchor.setAttribute('aria-label', ctaLabel.textContent);
    anchor.setAttribute('data-palette', 'palette-1');

    const iconSpan = document.createElement('span');
    iconSpan.className = 'cta__icon qd-icon qd-icon--cheveron-right';
    iconSpan.setAttribute('aria-hidden', 'true');
    anchor.append(iconSpan);

    const labelSpan = document.createElement('span');
    labelSpan.className = 'cta__label';
    labelSpan.append(...ctaLabel.childNodes);
    moveInstrumentation(ctaLabel, labelSpan);
    anchor.append(labelSpan);

    ctaDiv.append(anchor);
  }
  tabContent.append(ctaDiv);

  contentSection.append(tabContent);
  mainContent.append(contentSection);
  container.append(mainContent);
  wrapper.append(container);

  block.textContent = '';
  block.append(wrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
