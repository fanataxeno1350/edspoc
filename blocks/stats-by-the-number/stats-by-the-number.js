import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const statsByTheNumberContainer = document.createElement('div');
  statsByTheNumberContainer.classList.add('stats-by-the-number-container');
  moveInstrumentation(block, statsByTheNumberContainer);

  // Title
  const titleWrapper = block.querySelector('[data-aue-prop="title"]');
  if (titleWrapper) {
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('stats-by-the-number-title');
    titleDiv.append(...titleWrapper.childNodes);
    moveInstrumentation(titleWrapper, titleDiv);
    statsByTheNumberContainer.append(titleDiv);
  }

  const mainContent = document.createElement('div');
  mainContent.classList.add('stats-by-the-number-main-content');

  // Main Image Section
  const imageSection = document.createElement('div');
  imageSection.classList.add('stats-by-the-number-image-section');
  const imageContainer = document.createElement('div');
  imageContainer.classList.add('stats-by-the-number-image-container', 'stats-by-the-number-image-container--active');
  imageContainer.setAttribute('data-tab-content', '0');

  let mainImageElement = block.querySelector('[data-aue-prop="mainImage"]');
  if (mainImageElement) {
    const img = mainImageElement.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt);
      pic.classList.add('stats-by-the-number-main-image');
      pic.setAttribute('data-tab-image', '0');
      imageContainer.append(pic);
      moveInstrumentation(img, pic.querySelector('img'));
      moveInstrumentation(mainImageElement, imageContainer);
    } else {
      // Handle case where mainImage is an anchor or other element
      const anchor = mainImageElement.querySelector('a');
      if (anchor && (anchor.href.endsWith('.jpg') || anchor.href.endsWith('.jpeg') || anchor.href.endsWith('.png') || anchor.href.endsWith('.gif')) ) {
        const imgFromAnchor = document.createElement('img');
        imgFromAnchor.src = anchor.href;
        imgFromAnchor.alt = anchor.title || '';
        const pic = createOptimizedPicture(imgFromAnchor.src, imgFromAnchor.alt);
        pic.classList.add('stats-by-the-number-main-image');
        pic.setAttribute('data-tab-image', '0');
        imageContainer.append(pic);
        moveInstrumentation(anchor, pic.querySelector('img'));
        moveInstrumentation(mainImageElement, imageContainer);
      }
    }
  }
  imageSection.append(imageContainer);
  mainContent.append(imageSection);

  // Content Section
  const contentSection = document.createElement('div');
  contentSection.classList.add('stats-by-the-number-content-section');
  const tabContent = document.createElement('div');
  tabContent.classList.add('stats-by-the-number-tab-content', 'stats-by-the-number-tab-content--active');
  tabContent.setAttribute('data-tab-content', '0');

  // Description
  const descriptionWrapper = block.querySelector('[data-aue-prop="description"]');
  if (descriptionWrapper) {
    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('stats-by-the-number-description');
    descriptionDiv.append(...descriptionWrapper.childNodes);
    moveInstrumentation(descriptionWrapper, descriptionDiv);
    tabContent.append(descriptionDiv);
  }

  // Stats Cards
  const statsCardsWrapper = block.querySelector('[data-aue-prop="statsCards"]');
  if (statsCardsWrapper) {
    const statsCardsDiv = document.createElement('div');
    statsCardsDiv.classList.add('stats-by-the-number-cards');
    statsCardsDiv.setAttribute('role', 'list');

    const statCardItems = statsCardsWrapper.querySelectorAll('[data-aue-model="statsCard"]');
    statCardItems.forEach((cardItem) => {
      const cardDiv = document.createElement('div');
      cardDiv.classList.add('stats-by-the-number-card');
      cardDiv.setAttribute('role', 'img');
      cardDiv.setAttribute('tabindex', '0');
      moveInstrumentation(cardItem, cardDiv);

      const hoverImage = cardItem.querySelector('[data-aue-prop="hoverImage"]');
      if (hoverImage) {
        const img = hoverImage.querySelector('img');
        if (img) {
          cardDiv.setAttribute('data-hover-image', img.src);
          moveInstrumentation(img, cardDiv);
        } else {
          const anchor = hoverImage.querySelector('a');
          if (anchor && (anchor.href.endsWith('.jpg') || anchor.href.endsWith('.jpeg') || anchor.href.endsWith('.png') || anchor.href.endsWith('.gif')) ) {
            cardDiv.setAttribute('data-hover-image', anchor.href);
            moveInstrumentation(anchor, cardDiv);
          }
        }
      }

      const numberWrapper = cardItem.querySelector('[data-aue-prop="number"]');
      if (numberWrapper) {
        const numberDiv = document.createElement('div');
        numberDiv.classList.add('stats-by-the-number-card__number');
        numberDiv.setAttribute('data-count', numberWrapper.innerHTML.trim());
        numberDiv.append(...numberWrapper.childNodes);
        moveInstrumentation(numberWrapper, numberDiv);
        cardDiv.append(numberDiv);
      }

      const cardDescriptionWrapper = cardItem.querySelector('[data-aue-prop="cardDescription"]');
      if (cardDescriptionWrapper) {
        const descriptionDiv = document.createElement('div');
        descriptionDiv.classList.add('stats-by-the-number-card__description');
        descriptionDiv.append(...cardDescriptionWrapper.childNodes);
        moveInstrumentation(cardDescriptionWrapper, descriptionDiv);
        cardDiv.append(descriptionDiv);
      }
      statsCardsDiv.append(cardDiv);
    });
    tabContent.append(statsCardsDiv);
  }

  // CTA
  const ctaWrapper = block.querySelector('[data-aue-prop="cta"]');
  if (ctaWrapper) {
    const ctaDiv = document.createElement('div');
    ctaDiv.classList.add('stats-by-the-number-cta');
    const anchor = ctaWrapper.querySelector('a');
    if (anchor) {
      anchor.classList.add('cta', 'cta__primary');
      anchor.setAttribute('target', '_self');
      anchor.setAttribute('data-palette', 'palette-1');

      const iconSpan = document.createElement('span');
      iconSpan.classList.add('cta__icon', 'qd-icon', 'qd-icon--cheveron-right');
      iconSpan.setAttribute('aria-hidden', 'true');
      const labelSpan = document.createElement('span');
      labelSpan.classList.add('cta__label');
      labelSpan.textContent = anchor.textContent;

      anchor.innerHTML = ''; // Clear original content
      anchor.append(iconSpan, labelSpan);

      ctaDiv.append(anchor);
      moveInstrumentation(ctaWrapper, ctaDiv);
    }
    tabContent.append(ctaDiv);
  }

  contentSection.append(tabContent);
  mainContent.append(contentSection);
  statsByTheNumberContainer.append(mainContent);

  block.innerHTML = '';
  block.append(statsByTheNumberContainer);
}
