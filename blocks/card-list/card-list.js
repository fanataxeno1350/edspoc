import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const cardListWrapper = document.createElement('div');
  cardListWrapper.className = 'card-list-cmp-card-list parallax-child';

  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'card-list-cmp-card-list__content';

  const slideWrap = document.createElement('div');
  slideWrap.className = 'card-list-slide-wrap';

  const contentTop = document.createElement('div');
  contentTop.className = 'card-list-cmp-card-list__content__top card-list-slide-up';
  contentTop.setAttribute('data-slide-type', 'slide-up');

  const headingWrapper = document.createElement('div');
  headingWrapper.className = 'card-list-cmp-card-list__content__heading is-visible';
  const headingTitle = document.createElement('div');
  headingTitle.id = 'card-list-heading';
  headingTitle.className = 'card-list-cmp-card-list__content__heading__title';
  headingTitle.setAttribute('tabindex', '0');

  const heading = block.querySelector('[data-aue-prop="heading"]');
  if (heading) {
    const h2 = document.createElement('h2');
    moveInstrumentation(heading, h2);
    h2.innerHTML = heading.innerHTML;
    headingTitle.append(h2);
  }
  headingWrapper.append(headingTitle);
  contentTop.append(headingWrapper);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.className = 'card-list-cmp-card-list__content__cta-wrapper is-visible';

  const ctaLabel = block.querySelector('[data-aue-prop="ctaLabel"]');
  const ctaLink = block.querySelector('[data-aue-prop="ctaLink"]');

  if (ctaLabel && ctaLink) {
    const ctaAnchor = document.createElement('a');
    ctaAnchor.className = 'card-list-cta card-list-cta__primary';
    ctaAnchor.setAttribute('target', '_self');
    ctaAnchor.setAttribute('data-palette', 'palette-1');
    ctaAnchor.href = ctaLink.textContent.trim();
    ctaAnchor.setAttribute('aria-label', ctaLabel.textContent.trim());

    const ctaIcon = document.createElement('span');
    ctaIcon.className = 'card-list-cta__icon qd-icon qd-icon--cheveron-right';
    ctaIcon.setAttribute('aria-hidden', 'true');
    ctaAnchor.append(ctaIcon);

    const ctaLabelSpan = document.createElement('span');
    ctaLabelSpan.className = 'card-list-cta__label';
    moveInstrumentation(ctaLabel, ctaLabelSpan);
    ctaLabelSpan.textContent = ctaLabel.textContent.trim();
    ctaAnchor.append(ctaLabelSpan);

    ctaWrapper.append(ctaAnchor);
  }
  contentTop.append(ctaWrapper);
  slideWrap.append(contentTop);
  contentWrapper.append(slideWrap);

  const itemsWrapper = document.createElement('div');
  itemsWrapper.className = 'card-list-cmp-card-list__content__items';

  const cardRows = block.querySelectorAll('[data-aue-model="card"]');
  cardRows.forEach((cardRow, index) => {
    const cardItem = document.createElement('div');
    cardItem.className = 'card-list-cmp-card-list__content__card-item is-visible card-list-slide-up';
    cardItem.setAttribute('data-animation', 'card');
    cardItem.setAttribute('data-slide-type', 'slide-up');
    cardItem.setAttribute('data-slide-no-wrap', '');
    const delay = index * 100;
    cardItem.setAttribute('data-slide-delay', String(delay).padStart(3, '0'));
    cardItem.style.transitionDelay = `${delay / 1000}s`;

    const imageDiv = cardRow.querySelector('[data-aue-prop="image"]');
    if (imageDiv && imageDiv.querySelector('img')) {
      const img = imageDiv.querySelector('img');
      const pic = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, pic.querySelector('img'));
      pic.querySelector('img').className = 'card-list-cmp-card-list__content__card-item__image';
      cardItem.append(pic);
    }

    const cardItemContent = document.createElement('div');
    cardItemContent.className = 'card-list-cmp-card-list__content__card-item-content';

    const titleWrapper = document.createElement('div');
    titleWrapper.className = 'card-list-cmp-card-list__content__card-item-content__heading-wrapper';
    titleWrapper.setAttribute('tabindex', '0');
    const titleDiv = document.createElement('div');
    titleDiv.className = 'card-list-cmp-card-list__content__card-item-content__title';
    titleDiv.setAttribute('aria-hidden', 'false');

    const title = cardRow.querySelector('[data-aue-prop="title"]');
    if (title) {
      moveInstrumentation(title, titleDiv);
      titleDiv.textContent = title.textContent.trim();
    }
    titleWrapper.append(titleDiv);
    cardItemContent.append(titleWrapper);

    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'card-list-cmp-card-list__content__card-item-content__description';
    descriptionDiv.setAttribute('tabindex', '0');
    descriptionDiv.setAttribute('aria-hidden', 'false');

    const description = cardRow.querySelector('[data-aue-prop="description"]');
    if (description) {
      moveInstrumentation(description, descriptionDiv);
      descriptionDiv.innerHTML = description.innerHTML;
      descriptionDiv.setAttribute('aria-label', description.innerHTML.replace(/\n/g, ' ').trim());
    }
    cardItemContent.append(descriptionDiv);

    cardItem.append(cardItemContent);
    itemsWrapper.append(cardItem);
  });

  contentWrapper.append(itemsWrapper);
  cardListWrapper.append(contentWrapper);

  block.textContent = '';
  block.append(cardListWrapper);
}