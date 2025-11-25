import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainContent = block.querySelector('.card-list-cmp-card-list__content');
  const topContent = mainContent.querySelector('.card-list-cmp-card-list__content__top');
  const headingWrapper = topContent.querySelector('.card-list-cmp-card-list__content__heading');
  const heading = headingWrapper.querySelector('.card-list-cmp-card-list__content__heading__title');
  const ctaWrapper = topContent.querySelector('.card-list-cmp-card-list__content__cta-wrapper');
  const cta = ctaWrapper.querySelector('.card-list-cta');

  const cardsContainer = mainContent.querySelector('.card-list-cmp-card-list__content__items');
  const authoredCards = Array.from(cardsContainer.children);

  // Clear the block to rebuild
  block.textContent = '';

  const cardListContent = document.createElement('div');
  cardListContent.className = 'card-list-cmp-card-list__content';

  const slideWrap = document.createElement('div');
  slideWrap.className = 'card-list-slide-wrap';

  const topSection = document.createElement('div');
  topSection.className = 'card-list-cmp-card-list__content__top card-list-slide-up';
  topSection.dataset.slideType = 'slide-up';

  const newHeadingWrapper = document.createElement('div');
  newHeadingWrapper.className = 'card-list-cmp-card-list__content__heading is-visible';

  const newHeading = document.createElement('div');
  newHeading.id = 'card-list-heading';
  newHeading.className = 'card-list-cmp-card-list__content__heading__title';
  newHeading.tabIndex = 0;
  newHeading.innerHTML = heading.innerHTML;
  moveInstrumentation(heading, newHeading);
  newHeadingWrapper.append(newHeading);
  topSection.append(newHeadingWrapper);

  const newCtaWrapper = document.createElement('div');
  newCtaWrapper.className = 'card-list-cmp-card-list__content__cta-wrapper is-visible';

  const newCta = document.createElement('a');
  newCta.href = cta.href;
  newCta.className = 'card-list-cta card-list-cta__primary';
  newCta.target = cta.target;
  newCta.setAttribute('aria-label', cta.getAttribute('aria-label'));
  newCta.dataset.palette = cta.dataset.palette;
  newCta.innerHTML = cta.innerHTML;
  moveInstrumentation(cta, newCta);
  newCtaWrapper.append(newCta);
  topSection.append(newCtaWrapper);

  slideWrap.append(topSection);
  cardListContent.append(slideWrap);

  const newCardsContainer = document.createElement('div');
  newCardsContainer.className = 'card-list-cmp-card-list__content__items';

  authoredCards.forEach((card, index) => {
    const imageElement = card.querySelector('img');
    const titleElement = card.querySelector('.card-list-cmp-card-list__content__card-item-content__title');
    const descriptionElement = card.querySelector('.card-list-cmp-card-list__content__card-item-content__description');

    const newCardItem = document.createElement('div');
    newCardItem.className = 'card-list-cmp-card-list__content__card-item is-visible card-list-slide-up';
    newCardItem.dataset.animation = 'card';
    newCardItem.dataset.slideType = 'slide-up';
    newCardItem.dataset.slideNoWrap = '';
    newCardItem.dataset.slideDelay = `${index * 100}`.padStart(3, '0');
    newCardItem.style.transitionDelay = `${index * 0.2}s`;

    if (imageElement) {
      const picture = createOptimizedPicture(imageElement.src, imageElement.alt);
      const img = picture.querySelector('img');
      img.className = 'card-list-cmp-card-list__content__card-item__image';
      moveInstrumentation(imageElement, img);
      newCardItem.append(picture);
    }

    const cardItemContent = document.createElement('div');
    cardItemContent.className = 'card-list-cmp-card-list__content__card-item-content';

    const headingWrapperCard = document.createElement('div');
    headingWrapperCard.className = 'card-list-cmp-card-list__content__card-item-content__heading-wrapper';
    headingWrapperCard.tabIndex = 0;

    const titleDiv = document.createElement('div');
    titleDiv.className = 'card-list-cmp-card-list__content__card-item-content__title';
    titleDiv.setAttribute('aria-hidden', 'false');
    titleDiv.textContent = titleElement ? titleElement.textContent.trim() : '';
    moveInstrumentation(titleElement, titleDiv);
    headingWrapperCard.append(titleDiv);
    cardItemContent.append(headingWrapperCard);

    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'card-list-cmp-card-list__content__card-item-content__description';
    descriptionDiv.tabIndex = 0;
    descriptionDiv.setAttribute('aria-label', descriptionElement ? descriptionElement.getAttribute('aria-label') : '');
    descriptionDiv.setAttribute('aria-hidden', 'false');
    descriptionDiv.innerHTML = descriptionElement ? descriptionElement.innerHTML : '';
    moveInstrumentation(descriptionElement, descriptionDiv);
    cardItemContent.append(descriptionDiv);

    newCardItem.append(cardItemContent);
    newCardsContainer.append(newCardItem);
  });

  cardListContent.append(newCardsContainer);
  block.append(cardListContent);

  // Add parallax-child class to the block itself if it was present initially
  if (block.classList.contains('parallax-child')) {
    block.classList.add('parallax-child');
  }
}