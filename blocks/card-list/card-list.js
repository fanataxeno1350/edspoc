import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const blockName = block.dataset.blockName;

  // Step 1: Read Block JSON (already done mentally)
  // Fields: heading (richtext), cta (aem-tag with label, href)
  // Multifield: card (image, title, description)

  // Step 2: Read Expected HTML (already done mentally)
  // Defines the structure and classes.

  // Step 3: Extract authored content from block
  const headingElement = block.querySelector('[data-aue-prop="heading"]');
  const ctaLabelElement = block.querySelector('[data-aue-prop="cta-label"]');
  const ctaHrefElement = block.querySelector('[data-aue-prop="cta-href"]');
  const cardElements = block.querySelectorAll('[data-aue-model="card"]');

  // Step 4: Build final DOM
  const cardListCmpCardList = document.createElement('div');
  cardListCmpCardList.className = 'card-list-cmp-card-list parallax-child';

  const cardListCmpCardListContent = document.createElement('div');
  cardListCmpCardListContent.className = 'card-list-cmp-card-list__content';

  const cardListSlideWrap = document.createElement('div');
  cardListSlideWrap.className = 'card-list-slide-wrap';

  const cardListCmpCardListContentTop = document.createElement('div');
  cardListCmpCardListContentTop.className = 'card-list-cmp-card-list__content__top card-list-slide-up';
  cardListCmpCardListContentTop.dataset.slideType = 'slide-up';

  const cardListCmpCardListContentHeading = document.createElement('div');
  cardListCmpCardListContentHeading.className = 'card-list-cmp-card-list__content__heading is-visible';

  const cardListCmpCardListContentHeadingTitle = document.createElement('div');
  cardListCmpCardListContentHeadingTitle.id = 'card-list-heading';
  cardListCmpCardListContentHeadingTitle.className = 'card-list-cmp-card-list__content__heading__title';
  cardListCmpCardListContentHeadingTitle.tabIndex = 0;

  if (headingElement) {
    moveInstrumentation(headingElement, cardListCmpCardListContentHeadingTitle);
    cardListCmpCardListContentHeadingTitle.append(...headingElement.children);
  }

  cardListCmpCardListContentHeading.append(cardListCmpCardListContentHeadingTitle);

  const cardListCmpCardListContentCtaWrapper = document.createElement('div');
  cardListCmpCardListContentCtaWrapper.className = 'card-list-cmp-card-list__content__cta-wrapper is-visible';

  if (ctaLabelElement && ctaHrefElement) {
    const ctaLink = document.createElement('a');
    ctaLink.className = 'card-list-cta card-list-cta__primary';
    ctaLink.target = '_self';
    ctaLink.dataset.palette = 'palette-1';

    const ctaLabel = ctaLabelElement.textContent.trim();
    const ctaHref = ctaHrefElement.textContent.trim();

    ctaLink.href = ctaHref;
    ctaLink.ariaLabel = ctaLabel;

    const ctaIcon = document.createElement('span');
    ctaIcon.className = 'card-list-cta__icon qd-icon qd-icon--cheveron-right';
    ctaIcon.ariaHidden = 'true';

    const ctaLabelSpan = document.createElement('span');
    ctaLabelSpan.className = 'card-list-cta__label';
    ctaLabelSpan.textContent = ctaLabel;

    ctaLink.append(ctaIcon, ctaLabelSpan);
    moveInstrumentation(ctaLabelElement, ctaLink);
    moveInstrumentation(ctaHrefElement, ctaLink);
    cardListCmpCardListContentCtaWrapper.append(ctaLink);
  }

  cardListCmpCardListContentTop.append(cardListCmpCardListContentHeading, cardListCmpCardListContentCtaWrapper);
  cardListSlideWrap.append(cardListCmpCardListContentTop);

  const cardListCmpCardListContentItems = document.createElement('div');
  cardListCmpCardListContentItems.className = 'card-list-cmp-card-list__content__items';

  cardElements.forEach((cardElement, index) => {
    const cardItem = document.createElement('div');
    cardItem.className = 'card-list-cmp-card-list__content__card-item is-visible card-list-slide-up';
    cardItem.dataset.animation = 'card';
    cardItem.dataset.slideType = 'slide-up';
    cardItem.dataset.slideNoWrap = '';
    cardItem.dataset.slideDelay = `${index * 100}`.padStart(3, '0');
    cardItem.style.transitionDelay = `${index * 0.2}s`;
    moveInstrumentation(cardElement, cardItem);

    const imageElement = cardElement.querySelector('[data-aue-prop="image"]');
    if (imageElement) {
      const img = imageElement.querySelector('img');
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        pic.querySelector('img').className = 'card-list-cmp-card-list__content__card-item__image';
        moveInstrumentation(img, pic.querySelector('img'));
        cardItem.append(pic);
      }
    }

    const cardItemContent = document.createElement('div');
    cardItemContent.className = 'card-list-cmp-card-list__content__card-item-content';

    const cardItemContentHeadingWrapper = document.createElement('div');
    cardItemContentHeadingWrapper.className = 'card-list-cmp-card-list__content__card-item-content__heading-wrapper';
    cardItemContentHeadingWrapper.tabIndex = 0;

    const cardItemContentTitle = document.createElement('div');
    cardItemContentTitle.className = 'card-list-cmp-card-list__content__card-item-content__title';
    cardItemContentTitle.ariaHidden = 'false';
    const titleElement = cardElement.querySelector('[data-aue-prop="title"]');
    if (titleElement) {
      moveInstrumentation(titleElement, cardItemContentTitle);
      cardItemContentTitle.textContent = titleElement.textContent.trim();
    }
    cardItemContentHeadingWrapper.append(cardItemContentTitle);

    const cardItemContentDescription = document.createElement('div');
    cardItemContentDescription.className = 'card-list-cmp-card-list__content__card-item-content__description';
    cardItemContentDescription.tabIndex = 0;
    cardItemContentDescription.ariaHidden = 'false';
    const descriptionElement = cardElement.querySelector('[data-aue-prop="description"]');
    if (descriptionElement) {
      moveInstrumentation(descriptionElement, cardItemContentDescription);
      cardItemContentDescription.append(...descriptionElement.children);
      cardItemContentDescription.ariaLabel = descriptionElement.innerHTML.trim();
    }

    cardItemContent.append(cardItemContentHeadingWrapper, cardItemContentDescription);
    cardItem.append(cardItemContent);
    cardListCmpCardListContentItems.append(cardItem);
  });

  cardListCmpCardListContent.append(cardListSlideWrap, cardListCmpCardListContentItems);
  cardListCmpCardList.append(cardListCmpCardListContent);

  // Step 5: Replace block content and restore identity
  block.textContent = '';
  block.append(cardListCmpCardList);
  block.className = `${blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
