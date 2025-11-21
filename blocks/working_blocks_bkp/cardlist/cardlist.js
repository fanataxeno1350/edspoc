import { createOptimizedPicture } from '../../../scripts/aem.js';
import { moveInstrumentation } from '../../../scripts/scripts.js';

export default function decorate(block) {
  const cardListContent = document.createElement('div');
  cardListContent.classList.add('card-list-cmp-card-list__content');

  // Extracting the top section (heading and CTA)
  const firstRow = block.children[0];
  if (firstRow) {
    const slideWrap = document.createElement('div');
    slideWrap.classList.add('card-list-slide-wrap');

    const contentTop = document.createElement('div');
    contentTop.classList.add('card-list-cmp-card-list__content__top', 'card-list-slide-up');
    contentTop.setAttribute('data-slide-type', 'slide-up');
    moveInstrumentation(firstRow, contentTop);

    const headingCell = firstRow.children[0]; // Assuming heading is in the first cell of the first row
    if (headingCell) {
      const headingWrapper = document.createElement('div');
      headingWrapper.classList.add('card-list-cmp-card-list__content__heading', 'is-visible');

      const headingTitle = document.createElement('div');
      headingTitle.id = 'card-list-heading';
      headingTitle.classList.add('card-list-cmp-card-list__content__heading__title');
      headingTitle.setAttribute('tabindex', '0');
      headingTitle.innerHTML = headingCell.innerHTML;
      moveInstrumentation(headingCell, headingTitle);
      headingWrapper.append(headingTitle);
      contentTop.append(headingWrapper);
    }

    const ctaCell = firstRow.children[1]; // Assuming CTA is in the second cell of the first row
    if (ctaCell) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('card-list-cmp-card-list__content__cta-wrapper', 'is-visible');
      const link = ctaCell.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.classList.add('card-list-cta', 'card-list-cta__primary');
        newLink.target = link.target;
        newLink.setAttribute('aria-label', link.getAttribute('aria-label'));
        newLink.setAttribute('data-palette', link.getAttribute('data-palette'));

        const iconSpan = document.createElement('span');
        iconSpan.classList.add('card-list-cta__icon', 'qd-icon', 'qd-icon--cheveron-right');
        iconSpan.setAttribute('aria-hidden', 'true');
        newLink.append(iconSpan);

        const labelSpan = document.createElement('span');
        labelSpan.classList.add('card-list-cta__label');
        labelSpan.textContent = link.textContent;
        newLink.append(labelSpan);
        moveInstrumentation(link, newLink);
        ctaWrapper.append(newLink);
      }
      moveInstrumentation(ctaCell, ctaWrapper);
      contentTop.append(ctaWrapper);
    }
    slideWrap.append(contentTop);
    cardListContent.append(slideWrap);
  }

  // Create the container for card items
  const cardItemsContainer = document.createElement('div');
  cardItemsContainer.classList.add('card-list-cmp-card-list__content__items');

  // Loop through the remaining rows (starting from the second row for cards)
  [...block.children].slice(1).forEach((row, index) => {
    const cardItem = document.createElement('div');
    cardItem.classList.add('card-list-cmp-card-list__content__card-item', 'is-visible', 'card-list-slide-up');
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
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add('card-list-cmp-card-list__content__card-item__image');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        cardItem.append(optimizedPic);
      }
    }

    const cardItemContent = document.createElement('div');
    cardItemContent.classList.add('card-list-cmp-card-list__content__card-item-content');

    // Title
    const titleCell = cells[1];
    if (titleCell) {
      const headingWrapper = document.createElement('div');
      headingWrapper.classList.add('card-list-cmp-card-list__content__card-item-content__heading-wrapper');
      headingWrapper.setAttribute('tabindex', '0');

      const titleDiv = document.createElement('div');
      titleDiv.classList.add('card-list-cmp-card-list__content__card-item-content__title');
      titleDiv.setAttribute('aria-hidden', 'false');
      titleDiv.innerHTML = titleCell.innerHTML;
      moveInstrumentation(titleCell, titleDiv);
      headingWrapper.append(titleDiv);
      cardItemContent.append(headingWrapper);
    }

    // Description
    const descriptionCell = cells[2];
    if (descriptionCell) {
      const descriptionDiv = document.createElement('div');
      descriptionDiv.classList.add('card-list-cmp-card-list__content__card-item-content__description');
      descriptionDiv.setAttribute('tabindex', '0');
      descriptionDiv.setAttribute('aria-label', descriptionCell.textContent.trim()); // Use textContent for aria-label
      descriptionDiv.setAttribute('aria-hidden', 'false');
      descriptionDiv.innerHTML = descriptionCell.innerHTML;
      moveInstrumentation(descriptionCell, descriptionDiv);
      cardItemContent.append(descriptionDiv);
    }

    cardItem.append(cardItemContent);
    cardItemsContainer.append(cardItem);
  });

  cardListContent.append(cardItemsContainer);

  block.textContent = '';
  block.classList.add('card-list-cmp-card-list', 'parallax-child');
  block.append(cardListContent);
}
