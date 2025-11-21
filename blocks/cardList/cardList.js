import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.className = 'card-list-cmp-card-list parallax-child';
  moveInstrumentation(block, mainDiv);

  const contentDiv = document.createElement('div');
  contentDiv.className = 'card-list-cmp-card-list__content';
  mainDiv.append(contentDiv);

  // Process the first row for heading and CTA
  const [headingCtaRow, ...cardRows] = [...block.children];

  if (headingCtaRow) {
    const slideWrap = document.createElement('div');
    slideWrap.className = 'card-list-slide-wrap';
    contentDiv.append(slideWrap);

    const topContent = document.createElement('div');
    topContent.className = 'card-list-cmp-card-list__content__top card-list-slide-up';
    topContent.setAttribute('data-slide-type', 'slide-up');
    moveInstrumentation(headingCtaRow, topContent);
    slideWrap.append(topContent);

    const headingCell = headingCtaRow.children[0];
    if (headingCell) {
      const headingWrapper = document.createElement('div');
      headingWrapper.className = 'card-list-cmp-card-list__content__heading is-visible';
      const headingTitle = document.createElement('div');
      headingTitle.id = 'card-list-heading';
      headingTitle.className = 'card-list-cmp-card-list__content__heading__title';
      headingTitle.setAttribute('tabindex', '0');
      headingTitle.innerHTML = headingCell.innerHTML;
      moveInstrumentation(headingCell, headingTitle);
      headingWrapper.append(headingTitle);
      topContent.append(headingWrapper);
    }

    const ctaCell = headingCtaRow.children[1];
    if (ctaCell) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.className = 'card-list-cmp-card-list__content__cta-wrapper is-visible';
      const link = ctaCell.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.className = 'card-list-cta card-list-cta__primary';
        newLink.target = link.target;
        newLink.setAttribute('aria-label', link.getAttribute('aria-label'));
        newLink.setAttribute('data-palette', 'palette-1');

        const iconSpan = document.createElement('span');
        iconSpan.className = 'card-list-cta__icon qd-icon qd-icon--cheveron-right';
        iconSpan.setAttribute('aria-hidden', 'true');
        newLink.append(iconSpan);

        const labelSpan = document.createElement('span');
        labelSpan.className = 'card-list-cta__label';
        labelSpan.textContent = link.textContent;
        newLink.append(labelSpan);
        moveInstrumentation(link, newLink);
        ctaWrapper.append(newLink);
      }
      moveInstrumentation(ctaCell, ctaWrapper);
      topContent.append(ctaWrapper);
    }
  }

  const itemsDiv = document.createElement('div');
  itemsDiv.className = 'card-list-cmp-card-list__content__items';
  contentDiv.append(itemsDiv);

  cardRows.forEach((row, index) => {
    const cardItem = document.createElement('div');
    cardItem.className = 'card-list-cmp-card-list__content__card-item is-visible card-list-slide-up';
    cardItem.setAttribute('data-animation', 'card');
    cardItem.setAttribute('data-slide-type', 'slide-up');
    cardItem.setAttribute('data-slide-no-wrap', '');
    cardItem.setAttribute('data-slide-delay', `${index * 100}`.padStart(3, '0'));
    cardItem.style.transitionDelay = `${index * 0.2}s`;
    moveInstrumentation(row, cardItem);

    const imageCell = row.children[0];
    if (imageCell) {
      const img = imageCell.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, picture.querySelector('img'));
        picture.classList.add('card-list-cmp-card-list__content__card-item__image');
        cardItem.append(picture);
      }
    }

    const cardContentDiv = document.createElement('div');
    cardContentDiv.className = 'card-list-cmp-card-list__content__card-item-content';
    cardItem.append(cardContentDiv);

    const titleCell = row.children[1];
    if (titleCell) {
      const headingWrapper = document.createElement('div');
      headingWrapper.className = 'card-list-cmp-card-list__content__card-item-content__heading-wrapper';
      headingWrapper.setAttribute('tabindex', '0');
      const titleDiv = document.createElement('div');
      titleDiv.className = 'card-list-cmp-card-list__content__card-item-content__title';
      titleDiv.setAttribute('aria-hidden', 'false');
      titleDiv.innerHTML = titleCell.innerHTML;
      moveInstrumentation(titleCell, titleDiv);
      headingWrapper.append(titleDiv);
      cardContentDiv.append(headingWrapper);
    }

    const descriptionCell = row.children[2];
    if (descriptionCell) {
      const descriptionDiv = document.createElement('div');
      descriptionDiv.className = 'card-list-cmp-card-list__content__card-item-content__description';
      descriptionDiv.setAttribute('tabindex', '0');
      descriptionDiv.setAttribute('aria-label', descriptionCell.getAttribute('aria-label') || '');
      descriptionDiv.setAttribute('aria-hidden', 'false');
      descriptionDiv.innerHTML = descriptionCell.innerHTML;
      moveInstrumentation(descriptionCell, descriptionDiv);
      cardContentDiv.append(descriptionDiv);
    }
    itemsDiv.append(cardItem);
  });

  block.textContent = '';
  block.append(mainDiv);
}
