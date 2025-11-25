//checkpoint
import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainWrapper = document.createElement('div');
  mainWrapper.className = 'card-list-cmp-card-list parallax-child';

  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'card-list-cmp-card-list__content';

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

  const heading = block.querySelector('[data-aue-prop="heading"]');
  if (heading) {
    headingTitle.append(...heading.children);
    moveInstrumentation(heading, headingTitle);
  }
  headingWrapper.append(headingTitle);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.className = 'card-list-cmp-card-list__content__cta-wrapper is-visible';

  const ctaLink = block.querySelector('[data-aue-prop="ctaLink"]');
  const ctaText = block.querySelector('[data-aue-prop="ctaText"]');

  if (ctaLink && ctaText) {
    const ctaAnchor = document.createElement('a');
    ctaAnchor.className = 'card-list-cta card-list-cta__primary';
    ctaAnchor.target = '_self';
    ctaAnchor.setAttribute('data-palette', 'palette-1');
    ctaAnchor.href = ctaLink.textContent.trim();
    ctaAnchor.setAttribute('aria-label', ctaText.textContent.trim());

    const ctaIcon = document.createElement('span');
    ctaIcon.className = 'card-list-cta__icon qd-icon qd-icon--cheveron-right';
    ctaIcon.setAttribute('aria-hidden', 'true');

    const ctaLabel = document.createElement('span');
    ctaLabel.className = 'card-list-cta__label';
    ctaLabel.textContent = ctaText.textContent.trim();

    ctaAnchor.append(ctaIcon, ctaLabel);
    ctaWrapper.append(ctaAnchor);
    moveInstrumentation(ctaLink, ctaAnchor);
    moveInstrumentation(ctaText, ctaLabel);
  }

  topContent.append(headingWrapper, ctaWrapper);
  slideWrap.append(topContent);

  const itemsWrapper = document.createElement('div');
  itemsWrapper.className = 'card-list-cmp-card-list__content__items';

  const cardElements = block.querySelectorAll('[data-aue-model="card"]');
  cardElements.forEach((cardEl, i) => {
    const cardItem = document.createElement('div');
    cardItem.className = 'card-list-cmp-card-list__content__card-item is-visible card-list-slide-up';
    cardItem.setAttribute('data-animation', 'card');
    cardItem.setAttribute('data-slide-type', 'slide-up');
    cardItem.setAttribute('data-slide-no-wrap', '');
    cardItem.setAttribute('data-slide-delay', `${i * 100}`);
    cardItem.style.transitionDelay = `${i * 0.2}s`;

    const imageEl = cardEl.querySelector('[data-aue-prop="image"] img');
    if (imageEl) {
      const pic = createOptimizedPicture(imageEl.src, imageEl.alt);
      pic.querySelector('img').className = 'card-list-cmp-card-list__content__card-item__image';
      cardItem.append(pic);
      moveInstrumentation(imageEl, pic.querySelector('img'));
    }

    const cardContent = document.createElement('div');
    cardContent.className = 'card-list-cmp-card-list__content__card-item-content';

    const titleWrapper = document.createElement('div');
    titleWrapper.className = 'card-list-cmp-card-list__content__card-item-content__heading-wrapper';
    titleWrapper.setAttribute('tabindex', '0');

    const titleDiv = document.createElement('div');
    titleDiv.className = 'card-list-cmp-card-list__content__card-item-content__title';
    titleDiv.setAttribute('aria-hidden', 'false');

    const title = cardEl.querySelector('[data-aue-prop="title"]');
    if (title) {
      titleDiv.textContent = title.textContent.trim();
      moveInstrumentation(title, titleDiv);
    }
    titleWrapper.append(titleDiv);

    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'card-list-cmp-card-list__content__card-item-content__description';
    descriptionDiv.setAttribute('tabindex', '0');
    descriptionDiv.setAttribute('aria-hidden', 'false');

    const description = cardEl.querySelector('[data-aue-prop="description"]');
    if (description) {
      descriptionDiv.innerHTML = description.innerHTML;
      descriptionDiv.setAttribute('aria-label', description.innerHTML.trim());
      moveInstrumentation(description, descriptionDiv);
    }

    cardContent.append(titleWrapper, descriptionDiv);
    cardItem.append(cardContent);
    itemsWrapper.append(cardItem);
  });

  contentWrapper.append(slideWrap, itemsWrapper);
  mainWrapper.append(contentWrapper);

  block.textContent = '';
  block.append(mainWrapper);
}