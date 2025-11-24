import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // 1. Create the main outer wrapper based on the HTML structure
  const cardListCmp = document.createElement('div');
  cardListCmp.className = 'card-list-cmp-card-list parallax-child';
  moveInstrumentation(block, cardListCmp);

  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'card-list-cmp-card-list__content';
  cardListCmp.append(contentWrapper);

  // The first row of the block contains the main 'Card-List' model's fields
  // Ensure we handle cases where the first row might not exist or is empty
  const blockChildren = [...block.children];
  const cardListRow = blockChildren[0]; // Access the first row for cardList model fields

  if (cardListRow) {
    const cardListCells = [...cardListRow.children];

    // --- Process CardList Heading and CTA --- 
    const slideWrap = document.createElement('div');
    slideWrap.className = 'card-list-slide-wrap';
    const topContent = document.createElement('div');
    topContent.className = 'card-list-cmp-card-list__content__top card-list-slide-up';
    topContent.setAttribute('data-slide-type', 'slide-up');
    slideWrap.append(topContent);
    contentWrapper.append(slideWrap);

    // Heading (from the first cell of the first row)
    const headingCell = cardListCells[0];
    if (headingCell) {
      const headingWrapper = document.createElement('div');
      headingWrapper.className = 'card-list-cmp-card-list__content__heading is-visible';
      const headingTitle = document.createElement('div');
      headingTitle.id = 'card-list-heading';
      headingTitle.className = 'card-list-cmp-card-list__content__heading__title';
      headingTitle.setAttribute('tabindex', '0');
      // 'heading' is richtext, so use innerHTML
      headingTitle.innerHTML = headingCell.innerHTML.trim();
      headingWrapper.append(headingTitle);
      topContent.append(headingWrapper);
    }

    // CTA (from the second cell of the first row)
    const ctaCell = cardListCells[1];
    if (ctaCell) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.className = 'card-list-cmp-card-list__content__cta-wrapper is-visible';
      const ctaLink = ctaCell.querySelector('a');
      if (ctaLink) {
        const newCta = document.createElement('a');
        newCta.href = ctaLink.href;
        newCta.className = 'card-list-cta card-list-cta__primary';
        newCta.setAttribute('target', '_self');
        // Use existing aria-label or fallback to textContent
        newCta.setAttribute('aria-label', ctaLink.getAttribute('aria-label') || ctaLink.textContent.trim());
        newCta.setAttribute('data-palette', 'palette-1');
        moveInstrumentation(ctaLink, newCta);

        const iconSpan = document.createElement('span');
        iconSpan.className = 'card-list-cta__icon qd-icon qd-icon--cheveron-right';
        iconSpan.setAttribute('aria-hidden', 'true');
        newCta.append(iconSpan);

        const labelSpan = document.createElement('span');
        labelSpan.className = 'card-list-cta__label';
        labelSpan.textContent = ctaLink.textContent.trim();
        newCta.append(labelSpan);

        ctaWrapper.append(newCta);
      }
      topContent.append(ctaWrapper);
    }
  }

  // --- Process Card Items --- 
  const cardItemsWrapper = document.createElement('div');
  cardItemsWrapper.className = 'card-list-cmp-card-list__content__items';
  contentWrapper.append(cardItemsWrapper);

  // Loop through the remaining rows for 'card' items (skipping the first row which is cardList data)
  // If cardListRow exists, start from the second row; otherwise, start from the first row.
  const startIndex = cardListRow ? 1 : 0;
  blockChildren.slice(startIndex).forEach((row, index) => {
    const cardItem = document.createElement('div');
    cardItem.className = 'card-list-cmp-card-list__content__card-item is-visible card-list-slide-up';
    cardItem.setAttribute('data-animation', 'card');
    cardItem.setAttribute('data-slide-type', 'slide-up');
    cardItem.setAttribute('data-slide-no-wrap', '');

    // Calculate data-slide-delay and transition-delay based on index
    const delayMs = index * 100;
    cardItem.setAttribute('data-slide-delay', String(delayMs).padStart(3, '0'));
    cardItem.style.transitionDelay = `${delayMs / 1000}s`;

    moveInstrumentation(row, cardItem); // Transfer editor instrumentation from the original row

    const cells = [...row.children];

    // Image (first cell of the card row)
    const imageCell = cells[0];
    if (imageCell) {
      const img = imageCell.querySelector('img');
      if (img) {
        // createOptimizedPicture handles picture and img tags, and lazy loading.
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        const newImg = optimizedPic.querySelector('img');
        if (newImg) {
            moveInstrumentation(img, newImg); // Transfer instrumentation from original img
            newImg.className = 'card-list-cmp-card-list__content__card-item__image';
        }
        cardItem.append(optimizedPic);
      }
    }

    // Card Item Content wrapper
    const cardItemContent = document.createElement('div');
    cardItemContent.className = 'card-list-cmp-card-list__content__card-item-content';

    // Title (second cell of the card row)
    const titleCell = cells[1];
    if (titleCell) {
      const titleWrapper = document.createElement('div');
      titleWrapper.className = 'card-list-cmp-card-list__content__card-item-content__heading-wrapper';
      titleWrapper.setAttribute('tabindex', '0');
      const titleDiv = document.createElement('div');
      titleDiv.className = 'card-list-cmp-card-list__content__card-item-content__title';
      titleDiv.setAttribute('aria-hidden', 'false');
      titleDiv.textContent = titleCell.textContent.trim();
      titleWrapper.append(titleDiv);
      cardItemContent.append(titleWrapper);
    }

    // Description (third cell of the card row)
    const descriptionCell = cells[2];
    if (descriptionCell) {
      const descriptionDiv = document.createElement('div');
      descriptionDiv.className = 'card-list-cmp-card-list__content__card-item-content__description';
      descriptionDiv.setAttribute('tabindex', '0');
      // 'description' is richtext, so use innerHTML for content and aria-label
      descriptionDiv.setAttribute('aria-label', descriptionCell.innerHTML.trim());
      descriptionDiv.setAttribute('aria-hidden', 'false');
      descriptionDiv.innerHTML = descriptionCell.innerHTML.trim();
      cardItemContent.append(descriptionDiv);
    }

    cardItem.append(cardItemContent);
    cardItemsWrapper.append(cardItem);
  });

  // 7. Clear the original block content and append the newly created structure
  block.textContent = '';
  block.append(cardListCmp);
}