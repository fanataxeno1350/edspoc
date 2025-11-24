import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const cardListContent = document.createElement('div');
  cardListContent.className = 'card-list-cmp-card-list__content';

  const slideWrap = document.createElement('div');
  slideWrap.className = 'card-list-slide-wrap';
  const topContent = document.createElement('div');
  topContent.className = 'card-list-cmp-card-list__content__top card-list-slide-up';
  topContent.setAttribute('data-slide-type', 'slide-up');

  const headingWrapper = document.createElement('div');
  headingWrapper.className = 'card-list-cmp-card-list__content__heading is-visible';
  const headingTitle = document.createElement('div');
  headingTitle.id = 'card-list-heading';
  headingTitle.className = 'card-list-cmp-card-list__content__heading__title';
  headingTitle.tabIndex = 0;
  const heading = block.querySelector(':scope > div:first-child > div:first-child');
  if (heading) {
    headingTitle.innerHTML = heading.innerHTML;
    moveInstrumentation(heading, headingTitle);
  }
  headingWrapper.append(headingTitle);
  topContent.append(headingWrapper);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.className = 'card-list-cmp-card-list__content__cta-wrapper is-visible';
  const ctaLink = block.querySelector(':scope > div:first-child > div:nth-child(2) a');
  if (ctaLink) {
    const newCtaLink = document.createElement('a');
    newCtaLink.href = ctaLink.href;
    newCtaLink.className = 'card-list-cta card-list-cta__primary';
    newCtaLink.target = '_self';
    newCtaLink.setAttribute('aria-label', ctaLink.getAttribute('aria-label'));
    newCtaLink.setAttribute('data-palette', 'palette-1');

    const ctaIcon = document.createElement('span');
    ctaIcon.className = 'card-list-cta__icon qd-icon qd-icon--cheveron-right';
    ctaIcon.setAttribute('aria-hidden', 'true');
    newCtaLink.append(ctaIcon);

    const ctaLabel = document.createElement('span');
    ctaLabel.className = 'card-list-cta__label';
    ctaLabel.textContent = ctaLink.textContent.trim();
    newCtaLink.append(ctaLabel);

    moveInstrumentation(ctaLink, newCtaLink);
    ctaWrapper.append(newCtaLink);
  }
  topContent.append(ctaWrapper);
  slideWrap.append(topContent);
  cardListContent.append(slideWrap);

  const itemsWrapper = document.createElement('div');
  itemsWrapper.className = 'card-list-cmp-card-list__content__items';

  const cardRows = [...block.querySelectorAll(':scope > div')].slice(1);

  cardRows.forEach((row, index) => {
    const cardItem = document.createElement('div');
    cardItem.className = 'card-list-cmp-card-list__content__card-item is-visible card-list-slide-up';
    cardItem.setAttribute('data-animation', 'card');
    cardItem.setAttribute('data-slide-type', 'slide-up');
    cardItem.setAttribute('data-slide-no-wrap', '');
    cardItem.setAttribute('data-slide-delay', `${index * 100}`.padStart(3, '0'));
    cardItem.style.transitionDelay = `${index * 0.2}s`;

    const imageCell = row.querySelector('div:first-child');
    const img = imageCell ? imageCell.querySelector('img') : null;
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt);
      cardItem.append(pic);
      pic.querySelector('img').className = 'card-list-cmp-card-list__content__card-item__image';
      moveInstrumentation(img, pic.querySelector('img'));
    }

    const cardItemContent = document.createElement('div');
    cardItemContent.className = 'card-list-cmp-card-list__content__card-item-content';

    const titleCell = row.querySelector('div:nth-child(2)');
    if (titleCell) {
      const headingWrapperInner = document.createElement('div');
      headingWrapperInner.className = 'card-list-cmp-card-list__content__card-item-content__heading-wrapper';
      headingWrapperInner.tabIndex = 0;
      const titleDiv = document.createElement('div');
      titleDiv.className = 'card-list-cmp-card-list__content__card-item-content__title';
      titleDiv.setAttribute('aria-hidden', 'false');
      titleDiv.textContent = titleCell.textContent.trim();
      moveInstrumentation(titleCell, titleDiv);
      headingWrapperInner.append(titleDiv);
      cardItemContent.append(headingWrapperInner);
    }

    const descriptionCell = row.querySelector('div:nth-child(3)');
    if (descriptionCell) {
      const descriptionDiv = document.createElement('div');
      descriptionDiv.className = 'card-list-cmp-card-list__content__card-item-content__description';
      descriptionDiv.tabIndex = 0;
      descriptionDiv.setAttribute('aria-label', descriptionCell.innerHTML.trim());
      descriptionDiv.setAttribute('aria-hidden', 'false');
      descriptionDiv.innerHTML = descriptionCell.innerHTML;
      moveInstrumentation(descriptionCell, descriptionDiv);
      cardItemContent.append(descriptionDiv);
    }

    cardItem.append(cardItemContent);
    itemsWrapper.append(cardItem);
  });

  cardListContent.append(itemsWrapper);

  block.textContent = '';
  block.classList.add('card-list-cmp-card-list', 'parallax-child');
  block.append(cardListContent);
}
