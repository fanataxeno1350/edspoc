import { createOptimizedPicture } from '../../scripts/aem.js';

function moveInstrumentation(source, target) {
  const dataset = source.dataset;
  Object.keys(dataset).forEach((key) => {
    if (key.startsWith('aue')) {
      target.dataset[key] = dataset[key];
    }
  });
}

export default function decorate(block) {
  const rootDiv = document.createElement('div');
  rootDiv.classList.add('card-list-cmp-card-list', 'parallax-child');

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('card-list-cmp-card-list__content');
  rootDiv.append(contentDiv);

  const slideWrap = document.createElement('div');
  slideWrap.classList.add('card-list-slide-wrap');
  contentDiv.append(slideWrap);

  const topContent = document.createElement('div');
  topContent.classList.add('card-list-cmp-card-list__content__top', 'card-list-slide-up');
  topContent.dataset.slideType = 'slide-up';
  slideWrap.append(topContent);

  const headingWrapper = document.createElement('div');
  headingWrapper.classList.add('card-list-cmp-card-list__content__heading', 'is-visible');
  topContent.append(headingWrapper);

  const headingTitle = document.createElement('div');
  headingTitle.id = 'card-list-heading';
  headingTitle.classList.add('card-list-cmp-card-list__content__heading__title');
  headingTitle.tabIndex = 0;
  headingWrapper.append(headingTitle);

  const headingElement = block.querySelector('[data-aue-prop="heading"]');
  if (headingElement) {
    const h2 = document.createElement('h2');
    h2.append(...headingElement.childNodes);
    moveInstrumentation(headingElement, h2);
    headingTitle.append(h2);
  }

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('card-list-cmp-card-list__content__cta-wrapper', 'is-visible');
  topContent.append(ctaWrapper);

  const ctaLinkElement = block.querySelector('[data-aue-prop="ctaLink"]');
  if (ctaLinkElement) {
    const a = document.createElement('a');
    a.classList.add('card-list-cta', 'card-list-cta__primary');
    a.target = '_self';
    a.dataset.palette = 'palette-1';
    a.href = ctaLinkElement.href;
    a.ariaLabel = ctaLinkElement.textContent;
    moveInstrumentation(ctaLinkElement, a);

    const iconSpan = document.createElement('span');
    iconSpan.classList.add('card-list-cta__icon', 'qd-icon', 'qd-icon--cheveron-right');
    iconSpan.ariaHidden = 'true';
    a.append(iconSpan);

    const labelSpan = document.createElement('span');
    labelSpan.classList.add('card-list-cta__label');
    labelSpan.textContent = ctaLinkElement.textContent;
    a.append(labelSpan);

    ctaWrapper.append(a);
  }

  const itemsDiv = document.createElement('div');
  itemsDiv.classList.add('card-list-cmp-card-list__content__items');
  contentDiv.append(itemsDiv);

  const cardItems = block.querySelectorAll('[data-aue-model="card"]');
  cardItems.forEach((cardItem, index) => {
    const delay = index * 100;
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card-list-cmp-card-list__content__card-item', 'is-visible', 'card-list-slide-up');
    cardDiv.dataset.animation = 'card';
    cardDiv.dataset.slideType = 'slide-up';
    cardDiv.dataset.slideNoWrap = '';
    cardDiv.dataset.slideDelay = String(delay).padStart(3, '0');
    cardDiv.style.transitionDelay = `${delay / 1000}s`;
    moveInstrumentation(cardItem, cardDiv);

    const imageElement = cardItem.querySelector('[data-aue-prop="image"]');
    if (imageElement) {
      const img = imageElement.querySelector('img');
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt);
        pic.querySelector('img').classList.add('card-list-cmp-card-list__content__card-item__image');
        moveInstrumentation(img, pic.querySelector('img'));
        cardDiv.append(pic);
      }
    }

    const cardContent = document.createElement('div');
    cardContent.classList.add('card-list-cmp-card-list__content__card-item-content');
    cardDiv.append(cardContent);

    const cardHeadingWrapper = document.createElement('div');
    cardHeadingWrapper.classList.add('card-list-cmp-card-list__content__card-item-content__heading-wrapper');
    cardHeadingWrapper.tabIndex = 0;
    cardContent.append(cardHeadingWrapper);

    const cardTitleDiv = document.createElement('div');
    cardTitleDiv.classList.add('card-list-cmp-card-list__content__card-item-content__title');
    cardTitleDiv.ariaHidden = 'false';
    const titleElement = cardItem.querySelector('[data-aue-prop="title"]');
    if (titleElement) {
      cardTitleDiv.textContent = titleElement.textContent;
      moveInstrumentation(titleElement, cardTitleDiv);
    }
    cardHeadingWrapper.append(cardTitleDiv);

    const cardDescriptionDiv = document.createElement('div');
    cardDescriptionDiv.classList.add('card-list-cmp-card-list__content__card-item-content__description');
    cardDescriptionDiv.tabIndex = 0;
    cardDescriptionDiv.ariaHidden = 'false';
    const descriptionElement = cardItem.querySelector('[data-aue-prop="description"]');
    if (descriptionElement) {
      cardDescriptionDiv.innerHTML = descriptionElement.innerHTML;
      cardDescriptionDiv.ariaLabel = descriptionElement.innerHTML;
      moveInstrumentation(descriptionElement, cardDescriptionDiv);
    }
    cardContent.append(cardDescriptionDiv);

    itemsDiv.append(cardDiv);
  });

  block.textContent = '';
  block.append(rootDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
