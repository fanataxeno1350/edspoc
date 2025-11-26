import { createOptimizedPicture } from '../../scripts/aem.js';

export default async function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'stats-by-the-number-wrapper animate-ready animate-in';
  wrapper.setAttribute('role', 'region');
  wrapper.setAttribute('aria-label', 'Statistics by the numbers');

  const container = document.createElement('div');
  container.className = 'stats-by-the-number-container';
  wrapper.append(container);

  // Title
  const titleDiv = document.createElement('div');
  titleDiv.className = 'stats-by-the-number-title';
  const titleElement = block.querySelector('[data-aue-prop="title"]');
  if (titleElement) {
    const h2 = document.createElement('h2');
    h2.append(...titleElement.childNodes);
    moveInstrumentation(titleElement, h2);
    titleDiv.append(h2);
  }
  container.append(titleDiv);

  const mainContent = document.createElement('div');
  mainContent.className = 'stats-by-the-number-main-content';
  container.append(mainContent);

  // Image Section
  const imageSection = document.createElement('div');
  imageSection.className = 'stats-by-the-number-image-section';
  mainContent.append(imageSection);

  const imageContainer = document.createElement('div');
  imageContainer.className = 'stats-by-the-number-image-container stats-by-the-number-image-container--active';
  imageContainer.setAttribute('data-tab-content', '0');
  imageSection.append(imageContainer);

  const mainImageElement = block.querySelector('[data-aue-prop="mainImage"]');
  if (mainImageElement) {
    const imgSrc = mainImageElement.textContent.trim();
    imageContainer.setAttribute('data-image-path', imgSrc);
    const pic = createOptimizedPicture(imgSrc, '', false, [{ width: '750' }]);
    const img = pic.querySelector('img');
    img.className = 'stats-by-the-number-main-image';
    img.setAttribute('data-tab-image', '0');
    img.style.opacity = '1';
    moveInstrumentation(mainImageElement, img);
    imageContainer.append(pic);
  }

  // Content Section
  const contentSection = document.createElement('div');
  contentSection.className = 'stats-by-the-number-content-section';
  mainContent.append(contentSection);

  const tabContent = document.createElement('div');
  tabContent.className = 'stats-by-the-number-tab-content stats-by-the-number-tab-content--active';
  tabContent.setAttribute('data-tab-content', '0');
  contentSection.append(tabContent);

  // Description
  const descriptionDiv = document.createElement('div');
  descriptionDiv.className = 'stats-by-the-number-description';
  const descriptionElement = block.querySelector('[data-aue-prop="description"]');
  if (descriptionElement) {
    const p = document.createElement('p');
    p.append(...descriptionElement.childNodes);
    moveInstrumentation(descriptionElement, p);
    descriptionDiv.append(p);
  }
  tabContent.append(descriptionDiv);

  // Stat Cards
  const cardsDiv = document.createElement('div');
  cardsDiv.className = 'stats-by-the-number-cards';
  cardsDiv.setAttribute('role', 'list');
  tabContent.append(cardsDiv);

  const statCards = block.querySelectorAll('[data-aue-model="statCard"]');
  statCards.forEach((cardElement) => {
    const card = document.createElement('div');
    card.className = 'stats-by-the-number-card';
    card.setAttribute('role', 'img');
    card.setAttribute('tabindex', '0');

    const hoverImage = cardElement.querySelector('[data-aue-prop="hoverImage"]');
    if (hoverImage) {
      card.setAttribute('data-hover-image', hoverImage.textContent.trim());
    }

    const hoverDetails = cardElement.querySelector('[data-aue-prop="hoverDetails"]');
    if (hoverDetails) {
      card.setAttribute('data-hover-details', hoverDetails.innerHTML.trim());
    }

    const numberElement = cardElement.querySelector('[data-aue-prop="number"]');
    const descriptionElement = cardElement.querySelector('[data-aue-prop="description"]');

    let ariaLabelText = '';
    if (numberElement) {
      ariaLabelText += numberElement.textContent.trim();
    }
    if (descriptionElement) {
      ariaLabelText += `: ${descriptionElement.textContent.trim()}`;
    }
    card.setAttribute('aria-label', ariaLabelText);

    // ReadOnlyAuthor span (if present in authored content)
    const readOnlyAuthorSpan = cardElement.querySelector('span.readOnlyAuthor');
    if (readOnlyAuthorSpan) {
      const newSpan = document.createElement('span');
      newSpan.className = 'readOnlyAuthor';
      newSpan.style.display = 'none';
      newSpan.append(...readOnlyAuthorSpan.childNodes);
      moveInstrumentation(readOnlyAuthorSpan, newSpan);
      card.append(newSpan);
    }

    const numberDiv = document.createElement('div');
    numberDiv.className = 'stats-by-the-number-card__number';
    if (numberElement) {
      numberDiv.setAttribute('data-count', numberElement.innerHTML.trim());
      const p = document.createElement('p');
      p.append(...numberElement.childNodes);
      moveInstrumentation(numberElement, p);
      numberDiv.append(p);
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

  // CTA
  const ctaDiv = document.createElement('div');
  ctaDiv.className = 'stats-by-the-number-cta';
  tabContent.append(ctaDiv);

  const ctaLinkElement = block.querySelector('[data-aue-prop="ctaLink"]');
  const ctaLabelElement = block.querySelector('[data-aue-prop="ctaLabel"]');

  if (ctaLinkElement && ctaLabelElement) {
    const a = document.createElement('a');
    a.className = 'cta cta__primary';
    a.target = '_self';
    a.setAttribute('data-palette', 'palette-1');
    a.href = ctaLinkElement.textContent.trim();
    a.setAttribute('aria-label', ctaLabelElement.textContent.trim());
    moveInstrumentation(ctaLinkElement, a);

    const iconSpan = document.createElement('span');
    iconSpan.className = 'cta__icon qd-icon qd-icon--cheveron-right';
    iconSpan.setAttribute('aria-hidden', 'true');
    a.append(iconSpan);

    const labelSpan = document.createElement('span');
    labelSpan.className = 'cta__label';
    labelSpan.append(...ctaLabelElement.childNodes);
    moveInstrumentation(ctaLabelElement, labelSpan);
    a.append(labelSpan);

    ctaDiv.append(a);
  }

  block.textContent = '';
  block.append(wrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
