import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const cardListContainer = document.createElement('div');
  cardListContainer.classList.add('cardlist-cmp-card-list', 'parallax-child');

  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('cardlist-cmp-card-list__content');
  cardListContainer.append(contentWrapper);

  // Process the first row for heading and CTA
  const [headingRow, ctaRow, ...cardRows] = block.children;

  if (headingRow) {
    const slideWrap = document.createElement('div');
    slideWrap.classList.add('cardlist-slide-wrap');
    contentWrapper.append(slideWrap);

    const topContent = document.createElement('div');
    topContent.classList.add('cardlist-cmp-card-list__content__top', 'cardlist-slide-up');
    topContent.setAttribute('data-slide-type', 'slide-up');
    moveInstrumentation(headingRow, topContent);
    slideWrap.append(topContent);

    const headingCell = headingRow.children[0];
    if (headingCell) {
      const headingDiv = document.createElement('div');
      headingDiv.classList.add('cardlist-cmp-card-list__content__heading', 'cardlist-is-visible');
      const titleDiv = document.createElement('div');
      titleDiv.id = 'card-list-heading';
      titleDiv.classList.add('cardlist-cmp-card-list__content__heading__title');
      titleDiv.setAttribute('tabindex', '0');
      titleDiv.innerHTML = headingCell.innerHTML;
      headingDiv.append(titleDiv);
      topContent.append(headingDiv);
    }

    if (ctaRow) {
      const ctaCell = ctaRow.children[0];
      if (ctaCell) {
        const ctaWrapper = document.createElement('div');
        ctaWrapper.classList.add('cardlist-cmp-card-list__content__cta-wrapper', 'cardlist-is-visible');
        const link = ctaCell.querySelector('a');
        if (link) {
          const newLink = document.createElement('a');
          newLink.href = link.href;
          newLink.classList.add('cardlist-cta', 'cardlist-cta__primary');
          newLink.target = link.target;
          newLink.setAttribute('aria-label', link.getAttribute('aria-label') || '');
          newLink.setAttribute('data-palette', 'palette-1');
          moveInstrumentation(link, newLink);

          const iconSpan = document.createElement('span');
          iconSpan.classList.add('cardlist-cta__icon', 'qd-icon', 'qd-icon--cheveron-right');
          iconSpan.setAttribute('aria-hidden', 'true');
          newLink.append(iconSpan);

          const labelSpan = document.createElement('span');
          labelSpan.classList.add('cardlist-cta__label');
          labelSpan.textContent = link.textContent;
          newLink.append(labelSpan);

          ctaWrapper.append(newLink);
        }
        topContent.append(ctaWrapper);
      }
    }
  }

  // Process card items
  const itemsWrapper = document.createElement('div');
  itemsWrapper.classList.add('cardlist-cmp-card-list__content__items');
  contentWrapper.append(itemsWrapper);

  cardRows.forEach((row, index) => {
    const cardItem = document.createElement('div');
    cardItem.classList.add('cardlist-cmp-card-list__content__card-item', 'cardlist-is-visible', 'cardlist-slide-up');
    cardItem.setAttribute('data-animation', 'card');
    cardItem.setAttribute('data-slide-type', 'slide-up');
    cardItem.setAttribute('data-slide-no-wrap', '');
    cardItem.setAttribute('data-slide-delay', `${index * 100}`.padStart(3, '0'));
    cardItem.style.transitionDelay = `${index * 0.2}s`;
    moveInstrumentation(row, cardItem);

    const cells = [...row.children];

    // Image
    const imageCell = cells[0];
    if (imageCell) {
      const img = imageCell.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        picture.querySelector('img').classList.add('cardlist-cmp-card-list__content__card-item__image');
        moveInstrumentation(img, picture.querySelector('img'));
        cardItem.append(picture);
      }
    }

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('cardlist-cmp-card-list__content__card-item-content');

    // Title
    const titleCell = cells[1];
    if (titleCell) {
      const headingWrapper = document.createElement('div');
      headingWrapper.classList.add('cardlist-cmp-card-list__content__card-item-content__heading-wrapper');
      headingWrapper.setAttribute('tabindex', '0');
      const titleDiv = document.createElement('div');
      titleDiv.classList.add('cardlist-cmp-card-list__content__card-item-content__title');
      titleDiv.setAttribute('aria-hidden', 'false');
      titleDiv.textContent = titleCell.textContent.trim();
      headingWrapper.append(titleDiv);
      contentDiv.append(headingWrapper);
    }

    // Description
    const descriptionCell = cells[2];
    if (descriptionCell) {
      const descriptionDiv = document.createElement('div');
      descriptionDiv.classList.add('cardlist-cmp-card-list__content__card-item-content__description');
      descriptionDiv.setAttribute('tabindex', '0');
      descriptionDiv.setAttribute('aria-label', descriptionCell.innerHTML.trim());
      descriptionDiv.setAttribute('aria-hidden', 'false');
      descriptionDiv.innerHTML = descriptionCell.innerHTML;
      contentDiv.append(descriptionDiv);
    }

    cardItem.append(contentDiv);
    itemsWrapper.append(cardItem);
  });

  block.textContent = '';
  block.append(cardListContainer);
}
