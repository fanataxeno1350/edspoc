import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const cardListContent = block.querySelector(':scope > div');
  if (!cardListContent) return;

  cardListContent.classList.add('card-list-cmp-card-list__content');

  const slideWrap = document.createElement('div');
  slideWrap.classList.add('card-list-slide-wrap');
  moveInstrumentation(cardListContent.children[0], slideWrap);

  const contentTop = document.createElement('div');
  contentTop.classList.add('card-list-cmp-card-list__content__top', 'card-list-slide-up');
  contentTop.dataset.slideType = 'slide-up';
  moveInstrumentation(cardListContent.children[0], contentTop);

  const headingWrapper = document.createElement('div');
  headingWrapper.classList.add('card-list-cmp-card-list__content__heading', 'is-visible');
  moveInstrumentation(cardListContent.children[0].children[0], headingWrapper);

  const headingTitle = document.createElement('div');
  headingTitle.id = 'card-list-heading';
  headingTitle.classList.add('card-list-cmp-card-list__content__heading__title');
  headingTitle.setAttribute('tabindex', '0');
  const heading = block.querySelector('div:nth-child(1) > div:nth-child(1) > h2');
  if (heading) {
    headingTitle.append(heading);
    moveInstrumentation(block.querySelector('div:nth-child(1) > div:nth-child(1)'), headingTitle);
  }
  headingWrapper.append(headingTitle);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('card-list-cmp-card-list__content__cta-wrapper', 'is-visible');
  const ctaLink = block.querySelector('div:nth-child(1) > div:nth-child(2) > a');
  if (ctaLink) {
    ctaLink.classList.add('card-list-cta', 'card-list-cta__primary');
    ctaLink.setAttribute('target', '_self');
    ctaLink.setAttribute('aria-label', ctaLink.textContent.trim());
    ctaLink.dataset.palette = 'palette-1';

    const ctaIcon = document.createElement('span');
    ctaIcon.classList.add('card-list-cta__icon', 'qd-icon', 'qd-icon--cheveron-right');
    ctaIcon.setAttribute('aria-hidden', 'true');
    moveInstrumentation(block.querySelector('div:nth-child(1) > div:nth-child(2) > a > span:nth-child(1)'), ctaIcon);

    const ctaLabel = document.createElement('span');
    ctaLabel.classList.add('card-list-cta__label');
    ctaLabel.textContent = ctaLink.textContent.trim();
    moveInstrumentation(block.querySelector('div:nth-child(1) > div:nth-child(2) > a > span:nth-child(2)'), ctaLabel);

    ctaLink.textContent = '';
    ctaLink.append(ctaIcon, ctaLabel);
    moveInstrumentation(block.querySelector('div:nth-child(1) > div:nth-child(2)'), ctaWrapper);
    ctaWrapper.append(ctaLink);
  }

  contentTop.append(headingWrapper, ctaWrapper);
  slideWrap.append(contentTop);

  const itemsWrapper = document.createElement('div');
  itemsWrapper.classList.add('card-list-cmp-card-list__content__items');

  const cards = block.querySelectorAll('div:nth-child(2) > div');

  cards.forEach((card, index) => {
    const cardItem = document.createElement('div');
    cardItem.classList.add('card-list-cmp-card-list__content__card-item', 'is-visible', 'card-list-slide-up');
    cardItem.dataset.animation = 'card';
    cardItem.dataset.slideType = 'slide-up';
    cardItem.dataset.slideNoWrap = '';
    cardItem.dataset.slideDelay = `${index * 100}`.padStart(3, '0');
    cardItem.style.transitionDelay = `${index * 0.2}s`;
    moveInstrumentation(card, cardItem);

    const imageDiv = card.querySelector('div:nth-child(1)');
    const img = imageDiv?.querySelector('img');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, picture.querySelector('img'));
      cardItem.append(picture);
      picture.querySelector('img').classList.add('card-list-cmp-card-list__content__card-item__image');
    }

    const cardItemContent = document.createElement('div');
    cardItemContent.classList.add('card-list-cmp-card-list__content__card-item-content');
    moveInstrumentation(card.querySelector('div:nth-child(2)'), cardItemContent);

    const titleWrapper = document.createElement('div');
    titleWrapper.classList.add('card-list-cmp-card-list__content__card-item-content__heading-wrapper');
    titleWrapper.setAttribute('tabindex', '0');
    moveInstrumentation(card.querySelector('div:nth-child(2) > div:nth-child(1)'), titleWrapper);

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('card-list-cmp-card-list__content__card-item-content__title');
    titleDiv.setAttribute('aria-hidden', 'false');
    const title = card.querySelector('div:nth-child(2) > div:nth-child(1) > p');
    if (title) {
      titleDiv.textContent = title.textContent.trim();
      moveInstrumentation(title, titleDiv);
    }
    titleWrapper.append(titleDiv);

    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('card-list-cmp-card-list__content__card-item-content__description');
    descriptionDiv.setAttribute('tabindex', '0');
    descriptionDiv.setAttribute('aria-hidden', 'false');
    const description = card.querySelector('div:nth-child(2) > div:nth-child(2) > p');
    if (description) {
      descriptionDiv.setAttribute('aria-label', description.outerHTML);
      descriptionDiv.append(description);
      moveInstrumentation(card.querySelector('div:nth-child(2) > div:nth-child(2)'), descriptionDiv);
    }

    cardItemContent.append(titleWrapper, descriptionDiv);
    cardItem.append(cardItemContent);
    itemsWrapper.append(cardItem);
  });

  cardListContent.textContent = '';
  cardListContent.append(slideWrap, itemsWrapper);

  block.textContent = '';
  block.classList.add('card-list-cmp-card-list', 'parallax-child');
  block.append(cardListContent);
}
