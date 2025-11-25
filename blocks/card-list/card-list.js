import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const finalRoot = document.createElement('div');
  finalRoot.className = 'card-list-cmp-card-list parallax-child';

  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'card-list-cmp-card-list__content';
  finalRoot.append(contentWrapper);

  // Top section (heading and CTA)
  const slideWrap = document.createElement('div');
  slideWrap.className = 'card-list-slide-wrap';
  contentWrapper.append(slideWrap);

  const topContent = document.createElement('div');
  topContent.className = 'card-list-cmp-card-list__content__top card-list-slide-up';
  topContent.setAttribute('data-slide-type', 'slide-up');
  slideWrap.append(topContent);

  // Heading
  const headingWrapper = document.createElement('div');
  headingWrapper.className = 'card-list-cmp-card-list__content__heading is-visible';
  topContent.append(headingWrapper);

  const headingTitle = document.createElement('div');
  headingTitle.id = 'card-list-heading';
  headingTitle.className = 'card-list-cmp-card-list__content__heading__title';
  headingTitle.setAttribute('tabindex', '0');
  headingWrapper.append(headingTitle);

  const heading = block.querySelector('[data-aue-prop="heading"]');
  if (heading) {
    moveInstrumentation(heading, headingTitle);
    headingTitle.append(heading);
  }

  // CTA
  const ctaWrapper = document.createElement('div');
  ctaWrapper.className = 'card-list-cmp-card-list__content__cta-wrapper is-visible';
  topContent.append(ctaWrapper);

  const cta = block.querySelector('[data-aue-prop="cta"]');
  if (cta) {
    moveInstrumentation(cta, ctaWrapper);
    cta.className = 'card-list-cta card-list-cta__primary';
    cta.setAttribute('target', '_self');
    cta.setAttribute('aria-label', cta.textContent.trim()); // Assuming textContent is the label
    cta.setAttribute('data-palette', 'palette-1');

    const ctaIcon = document.createElement('span');
    ctaIcon.className = 'card-list-cta__icon qd-icon qd-icon--cheveron-right';
    ctaIcon.setAttribute('aria-hidden', 'true');
    cta.prepend(ctaIcon);

    const ctaLabel = document.createElement('span');
    ctaLabel.className = 'card-list-cta__label';
    ctaLabel.textContent = cta.textContent.trim(); // Re-extract text for label span
    cta.textContent = ''; // Clear original text
    cta.append(ctaIcon, ctaLabel);

    ctaWrapper.append(cta);
  }

  // Cards section
  const itemsWrapper = document.createElement('div');
  itemsWrapper.className = 'card-list-cmp-card-list__content__items';
  contentWrapper.append(itemsWrapper);

  const cards = block.querySelectorAll('[data-aue-model="card"]');
  cards.forEach((card, index) => {
    const cardItem = document.createElement('div');
    cardItem.className = 'card-list-cmp-card-list__content__card-item is-visible card-list-slide-up';
    cardItem.setAttribute('data-animation', 'card');
    cardItem.setAttribute('data-slide-type', 'slide-up');
    cardItem.setAttribute('data-slide-no-wrap', '');
    cardItem.setAttribute('data-slide-delay', `${index * 100}`);
    cardItem.style.transitionDelay = `${index * 0.2}s`;
    moveInstrumentation(card, cardItem);

    const imageContainer = card.querySelector('[data-aue-prop="image"]');
    if (imageContainer) {
      const img = imageContainer.querySelector('img');
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, pic.querySelector('img'));
        pic.querySelector('img').className = 'card-list-cmp-card-list__content__card-item__image';
        cardItem.append(pic);
      }
    }

    const cardContent = document.createElement('div');
    cardContent.className = 'card-list-cmp-card-list__content__card-item-content';
    cardItem.append(cardContent);

    const titleWrapper = document.createElement('div');
    titleWrapper.className = 'card-list-cmp-card-list__content__card-item-content__heading-wrapper';
    titleWrapper.setAttribute('tabindex', '0');
    cardContent.append(titleWrapper);

    const titleDiv = document.createElement('div');
    titleDiv.className = 'card-list-cmp-card-list__content__card-item-content__title';
    titleDiv.setAttribute('aria-hidden', 'false');
    titleWrapper.append(titleDiv);

    const title = card.querySelector('[data-aue-prop="title"]');
    if (title) {
      moveInstrumentation(title, titleDiv);
      titleDiv.append(title);
    }

    const description = card.querySelector('[data-aue-prop="description"]');
    if (description) {
      const descriptionDiv = document.createElement('div');
      descriptionDiv.className = 'card-list-cmp-card-list__content__card-item-content__description';
      descriptionDiv.setAttribute('tabindex', '0');
      descriptionDiv.setAttribute('aria-label', description.innerHTML.trim());
      descriptionDiv.setAttribute('aria-hidden', 'false');
      moveInstrumentation(description, descriptionDiv);
      descriptionDiv.append(description);
      cardContent.append(descriptionDiv);
    }

    itemsWrapper.append(cardItem);
  });

  block.textContent = '';
  block.append(finalRoot);

  const blockName = block.dataset.blockName;
  block.className = `${blockName} block`;
  block.dataset.blockStatus = "loaded";
}
