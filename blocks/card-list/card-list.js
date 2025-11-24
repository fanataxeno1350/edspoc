import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('card-list-cmp-card-list', 'parallax-child');

  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('card-list-cmp-card-list__content');

  const slideWrap = document.createElement('div');
  slideWrap.classList.add('card-list-slide-wrap');

  const topContent = document.createElement('div');
  topContent.classList.add('card-list-cmp-card-list__content__top', 'card-list-slide-up');
  topContent.setAttribute('data-slide-type', 'slide-up');

  // Extracting heading and CTA
  const headingWrapper = block.querySelector('div:nth-child(1) > div:nth-child(1)');
  if (headingWrapper) {
    const newHeadingWrapper = document.createElement('div');
    newHeadingWrapper.classList.add('card-list-cmp-card-list__content__heading', 'is-visible');

    const headingTitle = document.createElement('div');
    headingTitle.id = 'card-list-heading';
    headingTitle.classList.add('card-list-cmp-card-list__content__heading__title');
    headingTitle.setAttribute('tabindex', '0');
    headingTitle.innerHTML = headingWrapper.innerHTML;
    moveInstrumentation(headingWrapper, headingTitle);
    newHeadingWrapper.append(headingTitle);
    topContent.append(newHeadingWrapper);
  }

  const ctaWrapper = block.querySelector('div:nth-child(1) > div:nth-child(2)');
  if (ctaWrapper) {
    const newCtaWrapper = document.createElement('div');
    newCtaWrapper.classList.add('card-list-cmp-card-list__content__cta-wrapper', 'is-visible');

    const ctaLink = ctaWrapper.querySelector('a');
    if (ctaLink) {
      const newCtaLink = document.createElement('a');
      newCtaLink.href = ctaLink.href;
      newCtaLink.classList.add('card-list-cta', 'card-list-cta__primary');
      newCtaLink.target = '_self';
      newCtaLink.setAttribute('aria-label', ctaLink.getAttribute('aria-label'));
      newCtaLink.setAttribute('data-palette', 'palette-1');

      const ctaIcon = document.createElement('span');
      ctaIcon.classList.add('card-list-cta__icon', 'qd-icon', 'qd-icon--cheveron-right');
      ctaIcon.setAttribute('aria-hidden', 'true');

      const ctaLabel = document.createElement('span');
      ctaLabel.classList.add('card-list-cta__label');
      ctaLabel.textContent = ctaLink.textContent.trim();

      newCtaLink.append(ctaIcon, ctaLabel);
      moveInstrumentation(ctaLink, newCtaLink);
      newCtaWrapper.append(newCtaLink);
    }
    topContent.append(newCtaWrapper);
  }

  slideWrap.append(topContent);
  contentWrapper.append(slideWrap);

  const itemsWrapper = document.createElement('div');
  itemsWrapper.classList.add('card-list-cmp-card-list__content__items');

  const cards = block.querySelectorAll(':scope > div:not(:first-child)');
  cards.forEach((card, index) => {
    const cardItem = document.createElement('div');
    cardItem.classList.add('card-list-cmp-card-list__content__card-item', 'is-visible', 'card-list-slide-up');
    cardItem.setAttribute('data-animation', 'card');
    cardItem.setAttribute('data-slide-type', 'slide-up');
    cardItem.setAttribute('data-slide-no-wrap', '');
    cardItem.setAttribute('data-slide-delay', `${index * 100}`.padStart(3, '0'));
    cardItem.style.transitionDelay = `${index * 0.2}s`;

    const imageDiv = card.querySelector('div:nth-child(1)');
    const img = imageDiv?.querySelector('img');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, picture.querySelector('img'));
      cardItem.append(picture);
    }

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('card-list-cmp-card-list__content__card-item-content');

    const titleDiv = card.querySelector('div:nth-child(2)');
    if (titleDiv) {
      const headingWrapper = document.createElement('div');
      headingWrapper.classList.add('card-list-cmp-card-list__content__card-item-content__heading-wrapper');
      headingWrapper.setAttribute('tabindex', '0');

      const titleElement = document.createElement('div');
      titleElement.classList.add('card-list-cmp-card-list__content__card-item-content__title');
      titleElement.setAttribute('aria-hidden', 'false');
      titleElement.textContent = titleDiv.textContent.trim();
      moveInstrumentation(titleDiv, titleElement);
      headingWrapper.append(titleElement);
      contentDiv.append(headingWrapper);
    }

    const descriptionDiv = card.querySelector('div:nth-child(3)');
    if (descriptionDiv) {
      const descriptionElement = document.createElement('div');
      descriptionElement.classList.add('card-list-cmp-card-list__content__card-item-content__description');
      descriptionElement.setAttribute('tabindex', '0');
      descriptionElement.setAttribute('aria-label', descriptionDiv.innerHTML.replace(/\n/g, ''));
      descriptionElement.setAttribute('aria-hidden', 'false');
      descriptionElement.innerHTML = descriptionDiv.innerHTML;
      moveInstrumentation(descriptionDiv, descriptionElement);
      contentDiv.append(descriptionElement);
    }

    cardItem.append(contentDiv);
    itemsWrapper.append(cardItem);
  });

  contentWrapper.append(itemsWrapper);

  block.textContent = '';
  block.append(contentWrapper);
}
