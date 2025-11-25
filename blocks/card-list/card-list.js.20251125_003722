import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const cardListModel = JSON.parse(block.dataset.json);

  const cardListCmp = document.createElement('div');
  cardListCmp.className = 'card-list-cmp-card-list parallax-child';
  moveInstrumentation(block, cardListCmp);

  const contentDiv = document.createElement('div');
  contentDiv.className = 'card-list-cmp-card-list__content';

  const slideWrapDiv = document.createElement('div');
  slideWrapDiv.className = 'card-list-slide-wrap';

  const contentTopDiv = document.createElement('div');
  contentTopDiv.className = 'card-list-cmp-card-list__content__top card-list-slide-up';
  contentTopDiv.setAttribute('data-slide-type', 'slide-up');

  const headingDiv = document.createElement('div');
  headingDiv.className = 'card-list-cmp-card-list__content__heading is-visible';

  const headingTitleDiv = document.createElement('div');
  headingTitleDiv.id = 'card-list-heading';
  headingTitleDiv.className = 'card-list-cmp-card-list__content__heading__title';
  headingTitleDiv.setAttribute('tabindex', '0');
  headingTitleDiv.innerHTML = cardListModel.heading;
  moveInstrumentation(block.querySelector('div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)'), headingTitleDiv.querySelector('h2'));

  headingDiv.append(headingTitleDiv);

  const ctaWrapperDiv = document.createElement('div');
  ctaWrapperDiv.className = 'card-list-cmp-card-list__content__cta-wrapper is-visible';

  const ctaLink = document.createElement('a');
  ctaLink.href = cardListModel.ctaLink;
  ctaLink.className = 'card-list-cta card-list-cta__primary';
  ctaLink.target = '_self';
  ctaLink.setAttribute('aria-label', cardListModel.ctaLabel);
  ctaLink.setAttribute('data-palette', 'palette-1');

  const ctaIconSpan = document.createElement('span');
  ctaIconSpan.className = 'card-list-cta__icon qd-icon qd-icon--cheveron-right';
  ctaIconSpan.setAttribute('aria-hidden', 'true');

  const ctaLabelSpan = document.createElement('span');
  ctaLabelSpan.className = 'card-list-cta__label';
  ctaLabelSpan.textContent = cardListModel.ctaLabel;
  moveInstrumentation(block.querySelector('div:nth-child(1) > div:nth-child(2) > a:nth-child(1) > span:nth-child(2)'), ctaLabelSpan);

  ctaLink.append(ctaIconSpan, ctaLabelSpan);
  ctaWrapperDiv.append(ctaLink);

  contentTopDiv.append(headingDiv, ctaWrapperDiv);
  slideWrapDiv.append(contentTopDiv);

  const itemsDiv = document.createElement('div');
  itemsDiv.className = 'card-list-cmp-card-list__content__items';

  cardListModel.cardItems.forEach((card, index) => {
    const cardItemDiv = document.createElement('div');
    cardItemDiv.className = `card-list-cmp-card-list__content__card-item is-visible card-list-slide-up`;
    cardItemDiv.setAttribute('data-animation', 'card');
    cardItemDiv.setAttribute('data-slide-type', 'slide-up');
    cardItemDiv.setAttribute('data-slide-no-wrap', '');
    cardItemDiv.setAttribute('data-slide-delay', `${index * 100}`.padStart(3, '0'));
    cardItemDiv.style.transitionDelay = `${index * 0.2}s`;

    const originalCardImage = block.querySelectorAll('.card-list-cmp-card-list__content__card-item__image')[index];
    const picture = createOptimizedPicture(card.image, card.title);
    if (originalCardImage) {
      moveInstrumentation(originalCardImage, picture.querySelector('img'));
    }
    picture.querySelector('img').className = 'card-list-cmp-card-list__content__card-item__image';

    const cardItemContentDiv = document.createElement('div');
    cardItemContentDiv.className = 'card-list-cmp-card-list__content__card-item-content';

    const headingWrapperDiv = document.createElement('div');
    headingWrapperDiv.className = 'card-list-cmp-card-list__content__card-item-content__heading-wrapper';
    headingWrapperDiv.setAttribute('tabindex', '0');

    const titleDiv = document.createElement('div');
    titleDiv.className = 'card-list-cmp-card-list__content__card-item-content__title';
    titleDiv.setAttribute('aria-hidden', 'false');
    titleDiv.textContent = card.title;
    moveInstrumentation(block.querySelectorAll('.card-list-cmp-card-list__content__card-item-content__title')[index], titleDiv);

    headingWrapperDiv.append(titleDiv);

    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'card-list-cmp-card-list__content__card-item-content__description';
    descriptionDiv.setAttribute('tabindex', '0');
    descriptionDiv.setAttribute('aria-label', card.description);
    descriptionDiv.setAttribute('aria-hidden', 'false');
    descriptionDiv.innerHTML = card.description;
    moveInstrumentation(block.querySelectorAll('.card-list-cmp-card-list__content__card-item-content__description')[index], descriptionDiv);

    cardItemContentDiv.append(headingWrapperDiv, descriptionDiv);
    cardItemDiv.append(picture, cardItemContentDiv);
    itemsDiv.append(cardItemDiv);
  });

  contentDiv.append(slideWrapDiv, itemsDiv);
  cardListCmp.append(contentDiv);

  block.textContent = '';
  block.append(cardListCmp);
}
