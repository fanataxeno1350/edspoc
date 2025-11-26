import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const rootDiv = document.createElement('div');
  rootDiv.className = 'card-list-cmp-card-list parallax-child';

  const contentDiv = document.createElement('div');
  contentDiv.className = 'card-list-cmp-card-list__content';

  const slideWrapDiv = document.createElement('div');
  slideWrapDiv.className = 'card-list-slide-wrap';

  const topContentDiv = document.createElement('div');
  topContentDiv.className = 'card-list-cmp-card-list__content__top card-list-slide-up';
  topContentDiv.setAttribute('data-slide-type', 'slide-up');

  const headingWrapperDiv = document.createElement('div');
  headingWrapperDiv.className = 'card-list-cmp-card-list__content__heading is-visible';

  const headingTitleDiv = document.createElement('div');
  headingTitleDiv.id = 'card-list-heading';
  headingTitleDiv.className = 'card-list-cmp-card-list__content__heading__title';
  headingTitleDiv.setAttribute('tabindex', '0');

  const headingElement = block.querySelector('[data-aue-prop="heading"]');
  if (headingElement) {
    headingTitleDiv.append(...headingElement.childNodes);
    moveInstrumentation(headingElement, headingTitleDiv);
  }

  headingWrapperDiv.append(headingTitleDiv);

  const ctaWrapperDiv = document.createElement('div');
  ctaWrapperDiv.className = 'card-list-cmp-card-list__content__cta-wrapper is-visible';

  const ctaLinkElement = block.querySelector('[data-aue-prop="ctaLink"]');
  const ctaLabelElement = block.querySelector('[data-aue-prop="ctaLabel"]');

  if (ctaLinkElement && ctaLabelElement) {
    const ctaAnchor = document.createElement('a');
    ctaAnchor.className = 'card-list-cta card-list-cta__primary';
    ctaAnchor.target = '_self';
    ctaAnchor.setAttribute('data-palette', 'palette-1');
    ctaAnchor.href = ctaLinkElement.textContent;
    moveInstrumentation(ctaLinkElement, ctaAnchor);

    const ctaIconSpan = document.createElement('span');
    ctaIconSpan.className = 'card-list-cta__icon qd-icon qd-icon--cheveron-right';
    ctaIconSpan.setAttribute('aria-hidden', 'true');

    const ctaLabelSpan = document.createElement('span');
    ctaLabelSpan.className = 'card-list-cta__label';
    ctaLabelSpan.textContent = ctaLabelElement.textContent;
    moveInstrumentation(ctaLabelElement, ctaLabelSpan);

    ctaAnchor.append(ctaIconSpan, ctaLabelSpan);
    ctaWrapperDiv.append(ctaAnchor);
  }

  topContentDiv.append(headingWrapperDiv, ctaWrapperDiv);
  slideWrapDiv.append(topContentDiv);

  const itemsDiv = document.createElement('div');
  itemsDiv.className = 'card-list-cmp-card-list__content__items';

  const cards = block.querySelectorAll('[data-aue-model="card"]');
  cards.forEach((card, index) => {
    const cardItemDiv = document.createElement('div');
    cardItemDiv.className = 'card-list-cmp-card-list__content__card-item is-visible card-list-slide-up';
    cardItemDiv.setAttribute('data-animation', 'card');
    cardItemDiv.setAttribute('data-slide-type', 'slide-up');
    cardItemDiv.setAttribute('data-slide-no-wrap', '');
    cardItemDiv.setAttribute('data-slide-delay', `${index * 100}`.padStart(3, '0'));
    cardItemDiv.style.transitionDelay = `${index * 0.2}s`;

    const imageElement = card.querySelector('[data-aue-prop="image"] img');
    if (imageElement) {
      const picture = createOptimizedPicture(imageElement.src, imageElement.alt);
      picture.querySelector('img').className = 'card-list-cmp-card-list__content__card-item__image';
      moveInstrumentation(imageElement, picture.querySelector('img'));
      cardItemDiv.append(picture);
    }

    const cardItemContentDiv = document.createElement('div');
    cardItemContentDiv.className = 'card-list-cmp-card-list__content__card-item-content';

    const cardHeadingWrapperDiv = document.createElement('div');
    cardHeadingWrapperDiv.className = 'card-list-cmp-card-list__content__card-item-content__heading-wrapper';
    cardHeadingWrapperDiv.setAttribute('tabindex', '0');

    const cardTitleDiv = document.createElement('div');
    cardTitleDiv.className = 'card-list-cmp-card-list__content__card-item-content__title';
    cardTitleDiv.setAttribute('aria-hidden', 'false');
    const titleElement = card.querySelector('[data-aue-prop="title"]');
    if (titleElement) {
      cardTitleDiv.textContent = titleElement.textContent;
      moveInstrumentation(titleElement, cardTitleDiv);
    }
    cardHeadingWrapperDiv.append(cardTitleDiv);

    const cardDescriptionDiv = document.createElement('div');
    cardDescriptionDiv.className = 'card-list-cmp-card-list__content__card-item-content__description';
    cardDescriptionDiv.setAttribute('tabindex', '0');
    cardDescriptionDiv.setAttribute('aria-hidden', 'false');
    const descriptionElement = card.querySelector('[data-aue-prop="description"]');
    if (descriptionElement) {
      cardDescriptionDiv.innerHTML = descriptionElement.innerHTML;
      cardDescriptionDiv.setAttribute('aria-label', descriptionElement.innerHTML);
      moveInstrumentation(descriptionElement, cardDescriptionDiv);
    }

    cardItemContentDiv.append(cardHeadingWrapperDiv, cardDescriptionDiv);
    cardItemDiv.append(cardItemContentDiv);
    itemsDiv.append(cardItemDiv);
  });

  contentDiv.append(slideWrapDiv, itemsDiv);
  rootDiv.append(contentDiv);

  block.textContent = '';
  block.append(rootDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
