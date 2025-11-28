import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const cardListContent = document.createElement('div');
  cardListContent.classList.add('card-list-cmp-card-list__content');

  const topContent = document.createElement('div');
  topContent.classList.add('card-list-cmp-card-list__content__top');

  const headingWrapper = document.createElement('div');
  headingWrapper.classList.add('card-list-cmp-card-list__content__heading');
  const heading = block.querySelector('[data-aue-prop="heading"]');
  if (heading) {
    headingWrapper.append(heading);
    moveInstrumentation(heading, headingWrapper);
  }
  topContent.append(headingWrapper);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('card-list-cmp-card-list__content__cta-wrapper');
  const cta = block.querySelector('[data-aue-prop="cta"]');
  if (cta) {
    ctaWrapper.append(cta);
    moveInstrumentation(cta, ctaWrapper);
  }
  topContent.append(ctaWrapper);

  cardListContent.append(topContent);

  const itemsWrapper = document.createElement('div');
  itemsWrapper.classList.add('card-list-cmp-card-list__content__items');

  const cards = block.querySelectorAll('[data-aue-model="card"]');
  cards.forEach((card) => {
    const cardItem = document.createElement('div');
    cardItem.classList.add('card-list-cmp-card-list__content__card-item');
    moveInstrumentation(card, cardItem);

    let img = card.querySelector('[data-aue-prop="image"]');
    if (!img) {
      const anchor = card.querySelector('a[href]');
      if (anchor) {
        img = document.createElement('img');
        img.src = anchor.href;
        img.alt = ''; // Default alt text or extract from anchor title if available
        moveInstrumentation(anchor, img);
      }
    }

    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt);
      cardItem.append(picture);
      moveInstrumentation(img, picture.querySelector('img'));
    }

    const cardItemContent = document.createElement('div');
    cardItemContent.classList.add('card-list-cmp-card-list__content__card-item-content');

    const titleWrapper = document.createElement('div');
    titleWrapper.classList.add('card-list-cmp-card-list__content__card-item-content__heading-wrapper');
    const title = card.querySelector('[data-aue-prop="title"]');
    if (title) {
      titleWrapper.append(title);
      moveInstrumentation(title, titleWrapper);
    }
    cardItemContent.append(titleWrapper);

    const description = card.querySelector('[data-aue-prop="description"]');
    if (description) {
      cardItemContent.append(description);
      moveInstrumentation(description, cardItemContent);
    }

    cardItem.append(cardItemContent);
    itemsWrapper.append(cardItem);
  });

  cardListContent.append(itemsWrapper);
  block.replaceChildren(cardListContent);
}
