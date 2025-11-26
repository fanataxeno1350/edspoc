import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rootDiv = document.createElement('div');
  rootDiv.className = 'card-list-cmp-card-list parallax-child';

  const contentDiv = document.createElement('div');
  contentDiv.className = 'card-list-cmp-card-list__content';

  // Top section
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
  headingTitle.setAttribute('tabindex', '0');

  const authoredHeading = block.querySelector('[data-aue-prop="heading"]');
  if (authoredHeading) {
    headingTitle.append(...authoredHeading.childNodes);
    moveInstrumentation(authoredHeading, headingTitle);
  }

  headingWrapper.append(headingTitle);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.className = 'card-list-cmp-card-list__content__cta-wrapper is-visible';

  const authoredCta = block.querySelector('[data-aue-prop="cta"]');
  if (authoredCta) {
    const ctaLink = document.createElement('a');
    ctaLink.className = 'card-list-cta card-list-cta__primary';
    ctaLink.setAttribute('target', '_self');
    ctaLink.setAttribute('data-palette', 'palette-1');

    const ctaLabel = authoredCta.querySelector('[data-aue-prop="label"]');
    const ctaUrl = authoredCta.querySelector('[data-aue-prop="url"]');

    if (ctaUrl) {
      ctaLink.href = ctaUrl.textContent.trim();
      ctaLink.setAttribute('aria-label', ctaLabel ? ctaLabel.textContent.trim() : '');
      moveInstrumentation(ctaUrl, ctaLink);
    }

    const iconSpan = document.createElement('span');
    iconSpan.className = 'card-list-cta__icon qd-icon qd-icon--cheveron-right';
    iconSpan.setAttribute('aria-hidden', 'true');
    ctaLink.append(iconSpan);

    const labelSpan = document.createElement('span');
    labelSpan.className = 'card-list-cta__label';
    if (ctaLabel) {
      labelSpan.append(...ctaLabel.childNodes);
      moveInstrumentation(ctaLabel, labelSpan);
    }
    ctaLink.append(labelSpan);

    ctaWrapper.append(ctaLink);
  }

  topContent.append(headingWrapper, ctaWrapper);
  slideWrap.append(topContent);
  contentDiv.append(slideWrap);

  // Cards section
  const itemsDiv = document.createElement('div');
  itemsDiv.className = 'card-list-cmp-card-list__content__items';

  const cards = block.querySelectorAll('[data-aue-model="card"]');
  cards.forEach((card, index) => {
    const cardItem = document.createElement('div');
    cardItem.className = 'card-list-cmp-card-list__content__card-item is-visible card-list-slide-up';
    cardItem.setAttribute('data-animation', 'card');
    cardItem.setAttribute('data-slide-type', 'slide-up');
    cardItem.setAttribute('data-slide-no-wrap', '');
    cardItem.setAttribute('data-slide-delay', `${index * 100}`);
    cardItem.style.transitionDelay = `${index * 0.2}s`;

    const authoredImage = card.querySelector('[data-aue-prop="image"] img');
    if (authoredImage) {
      const pic = createOptimizedPicture(authoredImage.src, authoredImage.alt);
      pic.querySelector('img').className = 'card-list-cmp-card-list__content__card-item__image';
      cardItem.append(pic);
      moveInstrumentation(authoredImage, pic.querySelector('img'));
    }

    const cardItemContent = document.createElement('div');
    cardItemContent.className = 'card-list-cmp-card-list__content__card-item-content';

    const headingWrapperCard = document.createElement('div');
    headingWrapperCard.className = 'card-list-cmp-card-list__content__card-item-content__heading-wrapper';
    headingWrapperCard.setAttribute('tabindex', '0');

    const titleDiv = document.createElement('div');
    titleDiv.className = 'card-list-cmp-card-list__content__card-item-content__title';
    titleDiv.setAttribute('aria-hidden', 'false');

    const authoredTitle = card.querySelector('[data-aue-prop="title"]');
    if (authoredTitle) {
      titleDiv.append(...authoredTitle.childNodes);
      moveInstrumentation(authoredTitle, titleDiv);
    }
    headingWrapperCard.append(titleDiv);

    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'card-list-cmp-card-list__content__card-item-content__description';
    descriptionDiv.setAttribute('tabindex', '0');
    descriptionDiv.setAttribute('aria-hidden', 'false');

    const authoredDescription = card.querySelector('[data-aue-prop="description"]');
    if (authoredDescription) {
      descriptionDiv.setAttribute('aria-label', authoredDescription.innerHTML.trim());
      descriptionDiv.append(...authoredDescription.childNodes);
      moveInstrumentation(authoredDescription, descriptionDiv);
    }

    cardItemContent.append(headingWrapperCard, descriptionDiv);
    cardItem.append(cardItemContent);
    itemsDiv.append(cardItem);
  });

  contentDiv.append(itemsDiv);
  rootDiv.append(contentDiv);

  block.textContent = '';
  block.append(rootDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
