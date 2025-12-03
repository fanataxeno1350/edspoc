import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const cardListContent = document.createElement('div');
  cardListContent.classList.add('card-list-cmp-card-list__content');
  moveInstrumentation(block, cardListContent);

  const topContent = document.createElement('div');
  topContent.classList.add('card-list-cmp-card-list__content__top');

  const headingWrapper = document.createElement('div');
  headingWrapper.classList.add('card-list-cmp-card-list__content__heading');
  const heading = block.querySelector('[data-aue-prop="heading"]');
  if (heading) {
    const headingTitle = document.createElement('div');
    headingTitle.classList.add('card-list-cmp-card-list__content__heading__title');
    headingTitle.append(...heading.childNodes);
    moveInstrumentation(heading, headingTitle);
    headingWrapper.append(headingTitle);
  }
  topContent.append(headingWrapper);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('card-list-cmp-card-list__content__cta-wrapper');
  const cta = block.querySelector('[data-aue-prop="cta"]');
  if (cta) {
    const ctaLink = document.createElement('a');
    ctaLink.classList.add('card-list-cta', 'card-list-cta__primary');
    ctaLink.href = cta.href;
    ctaLink.target = cta.target;
    ctaLink.setAttribute('aria-label', cta.title);
    ctaLink.setAttribute('data-palette', 'palette-1');

    const ctaIcon = document.createElement('span');
    ctaIcon.classList.add('card-list-cta__icon', 'qd-icon', 'qd-icon--cheveron-right');
    ctaIcon.setAttribute('aria-hidden', 'true');
    ctaLink.append(ctaIcon);

    const ctaLabel = document.createElement('span');
    ctaLabel.classList.add('card-list-cta__label');
    ctaLabel.append(...cta.childNodes);
    moveInstrumentation(cta, ctaLabel);
    ctaLink.append(ctaLabel);

    ctaWrapper.append(ctaLink);
  }
  topContent.append(ctaWrapper);

  cardListContent.append(topContent);

  const cardItemsContainer = document.createElement('div');
  cardItemsContainer.classList.add('card-list-cmp-card-list__content__items');

  const cards = block.querySelectorAll('[data-aue-model="card"]');
  cards.forEach((card) => {
    const cardItem = document.createElement('div');
    cardItem.classList.add('card-list-cmp-card-list__content__card-item');
    moveInstrumentation(card, cardItem);

    const imageContainer = document.createElement('picture');
    const image = card.querySelector('[data-aue-prop="image"]');
    if (image) {
      const img = image.querySelector('img') || image;
      const optimizedPicture = createOptimizedPicture(img.src, img.alt);
      imageContainer.append(...optimizedPicture.childNodes);
      moveInstrumentation(img, optimizedPicture.querySelector('img'));
    } else {
      // If image is a link to an image file
      const anchor = card.querySelector('a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".gif"], a[href$=".webp"]');
      if (anchor) {
        const optimizedPicture = createOptimizedPicture(anchor.href, anchor.title || '');
        imageContainer.append(...optimizedPicture.childNodes);
        moveInstrumentation(anchor, optimizedPicture.querySelector('img'));
      }
    }
    cardItem.append(imageContainer);

    const cardItemContent = document.createElement('div');
    cardItemContent.classList.add('card-list-cmp-card-list__content__card-item-content');

    const titleWrapper = document.createElement('div');
    titleWrapper.classList.add('card-list-cmp-card-list__content__card-item-content__heading-wrapper');
    const title = card.querySelector('[data-aue-prop="title"]');
    if (title) {
      const titleDiv = document.createElement('div');
      titleDiv.classList.add('card-list-cmp-card-list__content__card-item-content__title');
      titleDiv.append(...title.childNodes);
      moveInstrumentation(title, titleDiv);
      titleWrapper.append(titleDiv);
    }
    cardItemContent.append(titleWrapper);

    const description = card.querySelector('[data-aue-prop="description"]');
    if (description) {
      const descriptionDiv = document.createElement('div');
      descriptionDiv.classList.add('card-list-cmp-card-list__content__card-item-content__description');
      descriptionDiv.append(...description.childNodes);
      moveInstrumentation(description, descriptionDiv);
      cardItemContent.append(descriptionDiv);
    }
    cardItem.append(cardItemContent);
    cardItemsContainer.append(cardItem);
  });

  cardListContent.append(cardItemsContainer);
  block.innerHTML = '';
  block.append(cardListContent);
}
