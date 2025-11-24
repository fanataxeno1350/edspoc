import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const cardListContent = document.createElement('div');
  cardListContent.className = 'card-list-cmp-card-list__content';
  moveInstrumentation(block.firstElementChild, cardListContent);

  const slideWrap = document.createElement('div');
  slideWrap.className = 'card-list-slide-wrap';
  cardListContent.append(slideWrap);

  const contentTop = document.createElement('div');
  contentTop.className = 'card-list-cmp-card-list__content__top card-list-slide-up';
  contentTop.setAttribute('data-slide-type', 'slide-up');
  slideWrap.append(contentTop);

  const headingWrapper = document.createElement('div');
  headingWrapper.className = 'card-list-cmp-card-list__content__heading is-visible';
  contentTop.append(headingWrapper);

  const headingTitle = document.createElement('div');
  headingTitle.id = 'card-list-heading';
  headingTitle.className = 'card-list-cmp-card-list__content__heading__title';
  headingTitle.setAttribute('tabindex', '0');
  headingWrapper.append(headingTitle);

  const heading = block.querySelector('[data-valign="heading"]');
  if (heading) {
    const h2 = document.createElement('h2');
    h2.innerHTML = heading.innerHTML;
    moveInstrumentation(heading, h2);
    headingTitle.append(h2);
  }

  const ctaWrapper = document.createElement('div');
  ctaWrapper.className = 'card-list-cmp-card-list__content__cta-wrapper is-visible';
  contentTop.append(ctaWrapper);

  const ctaLabel = block.querySelector('[data-valign="ctaLabel"]');
  const ctaUrl = block.querySelector('[data-valign="ctaUrl"]');

  if (ctaLabel && ctaUrl) {
    const ctaLink = document.createElement('a');
    ctaLink.href = ctaUrl.textContent.trim();
    ctaLink.className = 'card-list-cta card-list-cta__primary';
    ctaLink.target = '_self';
    ctaLink.setAttribute('aria-label', ctaLabel.textContent.trim());
    ctaLink.setAttribute('data-palette', 'palette-1');
    moveInstrumentation(ctaLabel, ctaLink);
    moveInstrumentation(ctaUrl, ctaLink);

    const ctaIcon = document.createElement('span');
    ctaIcon.className = 'card-list-cta__icon qd-icon qd-icon--cheveron-right';
    ctaIcon.setAttribute('aria-hidden', 'true');
    ctaLink.append(ctaIcon);

    const ctaLabelSpan = document.createElement('span');
    ctaLabelSpan.className = 'card-list-cta__label';
    ctaLabelSpan.textContent = ctaLabel.textContent.trim();
    ctaLink.append(ctaLabelSpan);

    ctaWrapper.append(ctaLink);
  }

  const itemsWrapper = document.createElement('div');
  itemsWrapper.className = 'card-list-cmp-card-list__content__items';
  cardListContent.append(itemsWrapper);

  const cardItems = block.querySelectorAll('[data-model-id="card"]');
  cardItems.forEach((cardItem, index) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card-list-cmp-card-list__content__card-item is-visible card-list-slide-up';
    cardDiv.setAttribute('data-animation', 'card');
    cardDiv.setAttribute('data-slide-type', 'slide-up');
    cardDiv.setAttribute('data-slide-no-wrap', '');
    cardDiv.setAttribute('data-slide-delay', `${index * 100}`.padStart(3, '0'));
    cardDiv.style.transitionDelay = `${index * 0.2}s`;
    moveInstrumentation(cardItem, cardDiv);

    const image = cardItem.querySelector('[data-valign="image"] img');
    if (image) {
      const picture = createOptimizedPicture(image.src, image.alt);
      moveInstrumentation(image, picture.querySelector('img'));
      cardDiv.append(picture);
    }

    const cardItemContent = document.createElement('div');
    cardItemContent.className = 'card-list-cmp-card-list__content__card-item-content';
    cardDiv.append(cardItemContent);

    const cardItemHeadingWrapper = document.createElement('div');
    cardItemHeadingWrapper.className = 'card-list-cmp-card-list__content__card-item-content__heading-wrapper';
    cardItemHeadingWrapper.setAttribute('tabindex', '0');
    cardItemContent.append(cardItemHeadingWrapper);

    const cardItemTitle = document.createElement('div');
    cardItemTitle.className = 'card-list-cmp-card-list__content__card-item-content__title';
    cardItemTitle.setAttribute('aria-hidden', 'false');
    const title = cardItem.querySelector('[data-valign="title"]');
    if (title) {
      cardItemTitle.textContent = title.textContent.trim();
      moveInstrumentation(title, cardItemTitle);
    }
    cardItemHeadingWrapper.append(cardItemTitle);

    const cardItemDescription = document.createElement('div');
    cardItemDescription.className = 'card-list-cmp-card-list__content__card-item-content__description';
    cardItemDescription.setAttribute('tabindex', '0');
    cardItemDescription.setAttribute('aria-hidden', 'false');
    const description = cardItem.querySelector('[data-valign="description"]');
    if (description) {
      cardItemDescription.innerHTML = description.innerHTML;
      cardItemDescription.setAttribute('aria-label', description.innerHTML.trim());
      moveInstrumentation(description, cardItemDescription);
    }
    cardItemContent.append(cardItemDescription);

    itemsWrapper.append(cardDiv);
  });

  block.textContent = '';
  block.append(cardListContent);
  block.classList.add('card-list-cmp-card-list', 'parallax-child');
}
