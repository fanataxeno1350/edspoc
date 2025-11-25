import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const content = {};

  // Extract heading and CTA
  const headingWrapper = block.querySelector('.card-list-cmp-card-list__content__heading__title');
  if (headingWrapper) {
    content.heading = headingWrapper.innerHTML;
    moveInstrumentation(headingWrapper, headingWrapper);
  }

  const ctaLinkElement = block.querySelector('.card-list-cmp-card-list__content__cta-wrapper a');
  if (ctaLinkElement) {
    content.ctaLink = ctaLinkElement.href;
    content.ctaLabel = ctaLinkElement.querySelector('.card-list-cta__label')?.textContent;
    moveInstrumentation(ctaLinkElement, ctaLinkElement);
  }

  // Extract cards
  content.cards = [];
  const cardElements = block.querySelectorAll('.card-list-cmp-card-list__content__card-item');
  cardElements.forEach((cardEl) => {
    const card = {};
    const imgEl = cardEl.querySelector('img');
    if (imgEl) {
      card.image = imgEl;
    }
    const titleEl = cardEl.querySelector('.card-list-cmp-card-list__content__card-item-content__title');
    if (titleEl) {
      card.title = titleEl.textContent.trim();
    }
    const descriptionEl = cardEl.querySelector('.card-list-cmp-card-list__content__card-item-content__description');
    if (descriptionEl) {
      card.description = descriptionEl.innerHTML;
    }
    content.cards.push(card);
    moveInstrumentation(cardEl, cardEl);
  });

  // Clear the block and rebuild the structure
  block.textContent = '';
  block.classList.add('card-list-cmp-card-list', 'parallax-child');

  const cardListContent = document.createElement('div');
  cardListContent.classList.add('card-list-cmp-card-list__content');

  const slideWrap = document.createElement('div');
  slideWrap.classList.add('card-list-slide-wrap');

  const contentTop = document.createElement('div');
  contentTop.classList.add('card-list-cmp-card-list__content__top', 'card-list-slide-up');
  contentTop.dataset.slideType = 'slide-up';

  if (content.heading) {
    const headingDiv = document.createElement('div');
    headingDiv.classList.add('card-list-cmp-card-list__content__heading', 'is-visible');
    const headingTitleDiv = document.createElement('div');
    headingTitleDiv.id = 'card-list-heading';
    headingTitleDiv.classList.add('card-list-cmp-card-list__content__heading__title');
    headingTitleDiv.tabIndex = 0;
    headingTitleDiv.innerHTML = content.heading;
    headingDiv.append(headingTitleDiv);
    contentTop.append(headingDiv);
  }

  if (content.ctaLink && content.ctaLabel) {
    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('card-list-cmp-card-list__content__cta-wrapper', 'is-visible');
    const cta = document.createElement('a');
    cta.href = content.ctaLink;
    cta.classList.add('card-list-cta', 'card-list-cta__primary');
    cta.target = '_self';
    cta.setAttribute('aria-label', content.ctaLabel);
    cta.dataset.palette = 'palette-1';

    const ctaIcon = document.createElement('span');
    ctaIcon.classList.add('card-list-cta__icon', 'qd-icon', 'qd-icon--cheveron-right');
    ctaIcon.setAttribute('aria-hidden', 'true');

    const ctaLabelSpan = document.createElement('span');
    ctaLabelSpan.classList.add('card-list-cta__label');
    ctaLabelSpan.textContent = content.ctaLabel;

    cta.append(ctaIcon, ctaLabelSpan);
    ctaWrapper.append(cta);
    contentTop.append(ctaWrapper);
  }

  slideWrap.append(contentTop);
  cardListContent.append(slideWrap);

  if (content.cards && content.cards.length > 0) {
    const itemsWrapper = document.createElement('div');
    itemsWrapper.classList.add('card-list-cmp-card-list__content__items');

    content.cards.forEach((card, index) => {
      const cardItem = document.createElement('div');
      cardItem.classList.add('card-list-cmp-card-list__content__card-item', 'is-visible', 'card-list-slide-up');
      cardItem.dataset.animation = 'card';
      cardItem.dataset.slideType = 'slide-up';
      cardItem.dataset.slideNoWrap = '';
      cardItem.dataset.slideDelay = `${index * 100}`.padStart(3, '0');

      if (card.image) {
        const picture = createOptimizedPicture(card.image.src, card.image.alt);
        moveInstrumentation(card.image, picture.querySelector('img'));
        cardItem.append(picture);
      }

      const cardItemContent = document.createElement('div');
      cardItemContent.classList.add('card-list-cmp-card-list__content__card-item-content');

      if (card.title) {
        const headingWrapper = document.createElement('div');
        headingWrapper.classList.add('card-list-cmp-card-list__content__card-item-content__heading-wrapper');
        headingWrapper.tabIndex = 0;
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('card-list-cmp-card-list__content__card-item-content__title');
        titleDiv.setAttribute('aria-hidden', 'false');
        titleDiv.textContent = card.title;
        headingWrapper.append(titleDiv);
        cardItemContent.append(headingWrapper);
      }

      if (card.description) {
        const descriptionDiv = document.createElement('div');
        descriptionDiv.classList.add('card-list-cmp-card-list__content__card-item-content__description');
        descriptionDiv.tabIndex = 0;
        descriptionDiv.setAttribute('aria-label', card.description.replace(/\n/g, ''));
        descriptionDiv.setAttribute('aria-hidden', 'false');
        descriptionDiv.innerHTML = card.description;
        cardItemContent.append(descriptionDiv);
      }

      cardItem.append(cardItemContent);
      itemsWrapper.append(cardItem);
    });
    cardListContent.append(itemsWrapper);
  }

  block.append(cardListContent);
}