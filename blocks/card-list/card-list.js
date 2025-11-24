import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const cardListModel = {};
  const cardModels = [];

  // Extract cardList model fields
  const headingElement = block.querySelector('.card-list-cmp-card-list__content__heading__title');
  if (headingElement) {
    cardListModel.heading = headingElement.innerHTML;
    moveInstrumentation(headingElement, block);
  }

  const ctaLinkElement = block.querySelector('.card-list-cmp-card-list__content__cta-wrapper .card-list-cta');
  if (ctaLinkElement) {
    cardListModel.ctaLink = ctaLinkElement.href;
    moveInstrumentation(ctaLinkElement, block);
  }

  const ctaLabelElement = block.querySelector('.card-list-cmp-card-list__content__cta-wrapper .card-list-cta__label');
  if (ctaLabelElement) {
    cardListModel.ctaLabel = ctaLabelElement.textContent;
    moveInstrumentation(ctaLabelElement, block);
  }

  // Extract card models (multifield)
  const cardElements = block.querySelectorAll('.card-list-cmp-card-list__content__card-item');
  cardElements.forEach((cardEl) => {
    const cardModel = {};

    const imageEl = cardEl.querySelector('img');
    if (imageEl) {
      cardModel.image = createOptimizedPicture(imageEl.src, imageEl.alt);
      moveInstrumentation(imageEl, cardModel.image.querySelector('img'));
    }

    const titleEl = cardEl.querySelector('.card-list-cmp-card-list__content__card-item-content__title');
    if (titleEl) {
      cardModel.title = titleEl.textContent.trim();
      moveInstrumentation(titleEl, cardEl);
    }

    const descriptionEl = cardEl.querySelector('.card-list-cmp-card-list__content__card-item-content__description');
    if (descriptionEl) {
      cardModel.description = descriptionEl.innerHTML.trim();
      moveInstrumentation(descriptionEl, cardEl);
    }
    cardModels.push(cardModel);
  });

  // Reconstruct the block HTML based on the extracted models
  const newBlockContent = document.createElement('div');
  newBlockContent.className = 'card-list-cmp-card-list__content';

  const topContent = document.createElement('div');
  topContent.className = 'card-list-cmp-card-list__content__top';

  if (cardListModel.heading) {
    const headingWrapper = document.createElement('div');
    headingWrapper.className = 'card-list-cmp-card-list__content__heading';
    const headingTitle = document.createElement('div');
    headingTitle.className = 'card-list-cmp-card-list__content__heading__title';
    headingTitle.innerHTML = cardListModel.heading;
    headingWrapper.append(headingTitle);
    topContent.append(headingWrapper);
  }

  if (cardListModel.ctaLink && cardListModel.ctaLabel) {
    const ctaWrapper = document.createElement('div');
    ctaWrapper.className = 'card-list-cmp-card-list__content__cta-wrapper';
    const ctaLink = document.createElement('a');
    ctaLink.href = cardListModel.ctaLink;
    ctaLink.className = 'card-list-cta card-list-cta__primary';
    ctaLink.target = '_self';
    ctaLink.setAttribute('aria-label', cardListModel.ctaLabel);
    ctaLink.setAttribute('data-palette', 'palette-1');
    ctaLink.innerHTML = `<span class="card-list-cta__icon qd-icon qd-icon--cheveron-right" aria-hidden="true"></span><span class="card-list-cta__label">${cardListModel.ctaLabel}</span>`;
    ctaWrapper.append(ctaLink);
    topContent.append(ctaWrapper);
  }

  newBlockContent.append(topContent);

  if (cardModels.length > 0) {
    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'card-list-cmp-card-list__content__items';

    cardModels.forEach((card) => {
      const cardItem = document.createElement('div');
      cardItem.className = 'card-list-cmp-card-list__content__card-item';

      if (card.image) {
        cardItem.append(card.image);
      }

      const cardContent = document.createElement('div');
      cardContent.className = 'card-list-cmp-card-list__content__card-item-content';

      if (card.title) {
        const headingWrapper = document.createElement('div');
        headingWrapper.className = 'card-list-cmp-card-list__content__card-item-content__heading-wrapper';
        const titleDiv = document.createElement('div');
        titleDiv.className = 'card-list-cmp-card-list__content__card-item-content__title';
        titleDiv.textContent = card.title;
        headingWrapper.append(titleDiv);
        cardContent.append(headingWrapper);
      }

      if (card.description) {
        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'card-list-cmp-card-list__content__card-item-content__description';
        descriptionDiv.innerHTML = card.description;
        cardContent.append(descriptionDiv);
      }
      cardItem.append(cardContent);
      itemsContainer.append(cardItem);
    });
    newBlockContent.append(itemsContainer);
  }

  block.textContent = '';
  block.append(newBlockContent);
}