import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const cardListCmpCardList = document.createElement('div');
  cardListCmpCardList.className = 'card-list-cmp-card-list parallax-child';
  moveInstrumentation(block, cardListCmpCardList);

  const cardListCmpCardListContent = document.createElement('div');
  cardListCmpCardListContent.className = 'card-list-cmp-card-list__content';
  cardListCmpCardList.append(cardListCmpCardListContent);

  const cardListSlideWrap = document.createElement('div');
  cardListSlideWrap.className = 'card-list-slide-wrap';
  cardListCmpCardListContent.append(cardListSlideWrap);

  const cardListCmpCardListContentTop = document.createElement('div');
  cardListCmpCardListContentTop.className = 'card-list-cmp-card-list__content__top card-list-slide-up';
  cardListCmpCardListContentTop.setAttribute('data-slide-type', 'slide-up');
  cardListSlideWrap.append(cardListCmpCardListContentTop);

  const headingWrapper = document.createElement('div');
  headingWrapper.className = 'card-list-cmp-card-list__content__heading is-visible';
  cardListCmpCardListContentTop.append(headingWrapper);

  const headingTitle = document.createElement('div');
  headingTitle.id = 'card-list-heading';
  headingTitle.className = 'card-list-cmp-card-list__content__heading__title';
  headingTitle.tabIndex = 0;
  headingWrapper.append(headingTitle);

  const headingElement = block.querySelector(':scope > div:first-child > div:first-child');
  if (headingElement) {
    const h2 = document.createElement('h2');
    moveInstrumentation(headingElement, h2);
    h2.innerHTML = headingElement.innerHTML;
    headingTitle.append(h2);
  }

  const ctaWrapper = document.createElement('div');
  ctaWrapper.className = 'card-list-cmp-card-list__content__cta-wrapper is-visible';
  cardListCmpCardListContentTop.append(ctaWrapper);

  const ctaLinkElement = block.querySelector(':scope > div:nth-child(2) > div:first-child');
  const ctaLabelElement = block.querySelector(':scope > div:nth-child(3) > div:first-child');

  if (ctaLinkElement && ctaLabelElement) {
    const a = document.createElement('a');
    moveInstrumentation(ctaLinkElement, a);
    a.href = ctaLinkElement.textContent.trim();
    a.className = 'card-list-cta card-list-cta__primary';
    a.target = '_self';
    a.setAttribute('aria-label', ctaLabelElement.textContent.trim());
    a.setAttribute('data-palette', 'palette-1');

    const ctaIcon = document.createElement('span');
    ctaIcon.className = 'card-list-cta__icon qd-icon qd-icon--cheveron-right';
    ctaIcon.setAttribute('aria-hidden', 'true');
    a.append(ctaIcon);

    const ctaLabelSpan = document.createElement('span');
    ctaLabelSpan.className = 'card-list-cta__label';
    ctaLabelSpan.textContent = ctaLabelElement.textContent.trim();
    a.append(ctaLabelSpan);

    ctaWrapper.append(a);
  }

  const cardListCmpCardListContentItems = document.createElement('div');
  cardListCmpCardListContentItems.className = 'card-list-cmp-card-list__content__items';
  cardListCmpCardListContent.append(cardListCmpCardListContentItems);

  const cardRows = Array.from(block.children).slice(3);

  cardRows.forEach((row, index) => {
    const cardListCmpCardItem = document.createElement('div');
    cardListCmpCardItem.className = 'card-list-cmp-card-list__content__card-item is-visible card-list-slide-up';
    cardListCmpCardItem.setAttribute('data-animation', 'card');
    cardListCmpCardItem.setAttribute('data-slide-type', 'slide-up');
    cardListCmpCardItem.setAttribute('data-slide-no-wrap', '');
    cardListCmpCardItem.setAttribute('data-slide-delay', `${index * 100}`.padStart(3, '0'));
    cardListCmpCardItem.style.transitionDelay = `${index * 0.2}s`;
    moveInstrumentation(row, cardListCmpCardItem);

    const imageDiv = row.querySelector(':scope > div:first-child');
    const titleDiv = row.querySelector(':scope > div:nth-child(2)');
    const descriptionDiv = row.querySelector(':scope > div:nth-child(3)');

    if (imageDiv) {
      const img = imageDiv.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, picture.querySelector('img'));
        cardListCmpCardItem.append(picture);
      }
    }

    const cardItemContent = document.createElement('div');
    cardItemContent.className = 'card-list-cmp-card-list__content__card-item-content';
    cardListCmpCardItem.append(cardItemContent);

    if (titleDiv) {
      const headingWrapper = document.createElement('div');
      headingWrapper.className = 'card-list-cmp-card-list__content__card-item-content__heading-wrapper';
      headingWrapper.tabIndex = 0;
      moveInstrumentation(titleDiv, headingWrapper);

      const title = document.createElement('div');
      title.className = 'card-list-cmp-card-list__content__card-item-content__title';
      title.setAttribute('aria-hidden', 'false');
      title.textContent = titleDiv.textContent.trim();
      headingWrapper.append(title);
      cardItemContent.append(headingWrapper);
    }

    if (descriptionDiv) {
      const description = document.createElement('div');
      description.className = 'card-list-cmp-card-list__content__card-item-content__description';
      description.tabIndex = 0;
      description.setAttribute('aria-label', descriptionDiv.innerHTML.trim());
      description.setAttribute('aria-hidden', 'false');
      description.innerHTML = descriptionDiv.innerHTML;
      moveInstrumentation(descriptionDiv, description);
      cardItemContent.append(description);
    }

    cardListCmpCardListContentItems.append(cardListCmpCardItem);
  });

  block.textContent = '';
  block.append(cardListCmpCardList);
}
