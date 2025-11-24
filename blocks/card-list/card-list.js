import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // 1. Create the main outer wrapper based on the HTML structure
  const cardListCmp = document.createElement('div');
  cardListCmp.className = 'card-list-cmp-card-list parallax-child';
  moveInstrumentation(block, cardListCmp); // Transfer block instrumentation to the new outer element

  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'card-list-cmp-card-list__content';
  cardListCmp.append(contentWrapper);

  // The first row of the block typically contains the main 'Card-List' model's fields
  const blockChildren = [...block.children];
  const cardListRow = blockChildren[0]; // Access the first row for cardList model fields

  // --- Process CardList Heading and CTA (if the first row exists) ---
  if (cardListRow) {
    const cardListCells = [...cardListRow.children];

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
      moveInstrumentation(headingCell, headingTitle); // Transfer instrumentation from original cell to new title div
      headingWrapper.append(headingTitle);
      topContent.append(headingWrapper);
    }

    // CTA (from the second cell of the first row)
    const ctaCell = cardListCells[1];
    if (ctaCell) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.className = 'card-list-cmp-card-list__content__cta-wrapper is-visible';
      const ctaLink = ctaCell.querySelector('a'); // Original <a> element within the cell
      if (ctaLink) {
        const newCta = document.createElement('a'); // New <a> element
        newCta.href = ctaLink.href; // Copy href property
        newCta.className = ctaLink.className; // Copy all classes
        // Copy specific attributes if they exist on the original link
        ['target', 'aria-label', 'data-palette'].forEach(attr => {
            if (ctaLink.hasAttribute(attr)) {
                newCta.setAttribute(attr, ctaLink.getAttribute(attr));
            }
        });
        moveInstrumentation(ctaLink, newCta); // Transfer instrumentation from original anchor to new anchor

        // Recreate icon span, copying its classes and attributes
        const originalIconSpan = ctaLink.querySelector('.card-list-cta__icon');
        if (originalIconSpan) {
            const iconSpan = document.createElement('span');
            iconSpan.className = originalIconSpan.className;
            if (originalIconSpan.hasAttribute('aria-hidden')) {
                iconSpan.setAttribute('aria-hidden', originalIconSpan.getAttribute('aria-hidden'));
            }
            newCta.append(iconSpan);
        }

        // Recreate label span, copying its classes and text content
        const originalLabelSpan = ctaLink.querySelector('.card-list-cta__label');
        if (originalLabelSpan) {
            const labelSpan = document.createElement('span');
            labelSpan.className = originalLabelSpan.className;
            labelSpan.textContent = originalLabelSpan.textContent.trim();
            newCta.append(labelSpan);
        } else {
            // Fallback: If the specific label span is not found, take the text content directly from the link
            const labelSpan = document.createElement('span');
            labelSpan.className = 'card-list-cta__label'; // Apply default class as per HTML
            labelSpan.textContent = ctaLink.textContent.trim(); // Use full link text as fallback
            newCta.append(labelSpan);
        }

        ctaWrapper.append(newCta);
      }
      topContent.append(ctaWrapper);
    }
  }

  // --- Process Card Items --- 
  const cardItemsWrapper = document.createElement('div');
  cardItemsWrapper.className = 'card-list-cmp-card-list__content__items';
  contentWrapper.append(cardItemsWrapper);

  // Loop through the remaining rows for 'card' items (skipping the first row if it contained cardList data)
  // If cardListRow exists, start from the second row (index 1); otherwise, start from the first row (index 0).
  const startIndex = cardListRow ? 1 : 0;
  blockChildren.slice(startIndex).forEach((row, index) => {
    const cardItem = document.createElement('div');
    cardItem.className = 'card-list-cmp-card-list__content__card-item is-visible card-list-slide-up';
    cardItem.setAttribute('data-animation', 'card');
    cardItem.setAttribute('data-slide-type', 'slide-up');
    cardItem.setAttribute('data-slide-no-wrap', '');

    // Calculate data-slide-delay and transition-delay based on index
    const delayMs = index * 100;
    cardItem.setAttribute('data-slide-delay', String(delayMs).padStart(3, '0')); // Formats to '000', '100', '200'
    cardItem.style.transitionDelay = `${delayMs / 1000}s`; // Formats to '0s', '0.1s', '0.2s'

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
            moveInstrumentation(img, newImg); // Transfer instrumentation from original img to new img
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
      moveInstrumentation(titleCell, titleDiv); // Transfer instrumentation from original cell to new title div
      titleWrapper.append(titleDiv);
      cardItemContent.append(titleWrapper);
    }

    // Description (third cell of the card row)
    const descriptionCell = cells[2];
    if (descriptionCell) {
      const descriptionDiv = document.createElement('div');
      descriptionDiv.className = 'card-list-cmp-card-list__content__card-item-content__description';
      descriptionDiv.setAttribute('tabindex', '0');

      // The authored HTML for the description div has an aria-label attribute whose value is richtext (contains <p> tag).
      // The descriptionCell.innerHTML.trim() contains this full richtext content.
      // We apply this content directly as the aria-label value and innerHTML.
      descriptionDiv.setAttribute('aria-label', descriptionCell.innerHTML.trim());
      descriptionDiv.setAttribute('aria-hidden', 'false'); // Fixed attribute from HTML
      descriptionDiv.innerHTML = descriptionCell.innerHTML.trim();
      moveInstrumentation(descriptionCell, descriptionDiv); // Transfer instrumentation from original cell to new description div
      cardItemContent.append(descriptionDiv);
    }

    cardItem.append(cardItemContent);
    cardItemsWrapper.append(cardItem);
  });

  // 7. Clear the original block content and append the newly created structure
  block.textContent = '';
  block.append(cardListCmp);
}