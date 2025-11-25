import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainContent = document.createElement('div');
  mainContent.classList.add('card-list-cmp-card-list__content');

  // Process the first row for heading and CTA
  const headingRow = block.children[0];
  if (headingRow) {
    const slideWrap = document.createElement('div');
    slideWrap.classList.add('card-list-slide-wrap');

    const topContent = document.createElement('div');
    topContent.classList.add('card-list-cmp-card-list__content__top', 'card-list-slide-up');
    topContent.setAttribute('data-slide-type', 'slide-up');
    moveInstrumentation(headingRow, topContent);

    const headingCell = headingRow.children[0];
    if (headingCell) {
      const headingWrapper = document.createElement('div');
      headingWrapper.classList.add('card-list-cmp-card-list__content__heading', 'is-visible');

      const headingTitle = document.createElement('div');
      headingTitle.id = 'card-list-heading';
      headingTitle.classList.add('card-list-cmp-card-list__content__heading__title');
      headingTitle.setAttribute('tabindex', '0');

      const heading = headingCell.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) {
        headingTitle.append(heading);
        moveInstrumentation(headingCell, headingTitle);
      }
      headingWrapper.append(headingTitle);
      topContent.append(headingWrapper);
    }

    const ctaCell = headingRow.children[1];
    if (ctaCell) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('card-list-cmp-card-list__content__cta-wrapper', 'is-visible');

      const link = ctaCell.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.classList.add('card-list-cta', 'card-list-cta__primary');
        newLink.setAttribute('target', link.getAttribute('target') || '_self');
        newLink.setAttribute('aria-label', link.getAttribute('aria-label') || '');
        newLink.setAttribute('data-palette', 'palette-1');

        const icon = document.createElement('span');
        icon.classList.add('card-list-cta__icon', 'qd-icon', 'qd-icon--cheveron-right');
        icon.setAttribute('aria-hidden', 'true');
        newLink.append(icon);

        const label = document.createElement('span');
        label.classList.add('card-list-cta__label');
        label.textContent = link.textContent;
        newLink.append(label);

        moveInstrumentation(link, newLink);
        ctaWrapper.append(newLink);
      }
      topContent.append(ctaWrapper);
    }
    slideWrap.append(topContent);
    mainContent.append(slideWrap);
  }

  // Process the remaining rows for card items
  const cardItemsWrapper = document.createElement('div');
  cardItemsWrapper.classList.add('card-list-cmp-card-list__content__items');

  // Skip the first row as it's processed for heading/CTA
  [...block.children].slice(1).forEach((row, index) => {
    const cardItem = document.createElement('div');
    cardItem.classList.add('card-list-cmp-card-list__content__card-item', 'is-visible', 'card-list-slide-up');
    cardItem.setAttribute('data-animation', 'card');
    cardItem.setAttribute('data-slide-type', 'slide-up');
    cardItem.setAttribute('data-slide-no-wrap', '');
    cardItem.setAttribute('data-slide-delay', `${index * 100}`);
    cardItem.style.transitionDelay = `${index * 0.2}s`;
    moveInstrumentation(row, cardItem);

    const cells = [...row.children];

    // Image
    const imageCell = cells[0];
    if (imageCell) {
      const img = imageCell.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, picture.querySelector('img'));
        cardItem.append(picture);
      }
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('card-list-cmp-card-list__content__card-item-content');

    // Title
    const titleCell = cells[1];
    if (titleCell) {
      const headingWrapper = document.createElement('div');
      headingWrapper.classList.add('card-list-cmp-card-list__content__card-item-content__heading-wrapper');
      headingWrapper.setAttribute('tabindex', '0');

      const titleDiv = document.createElement('div');
      titleDiv.classList.add('card-list-cmp-card-list__content__card-item-content__title');
      titleDiv.setAttribute('aria-hidden', 'false');
      titleDiv.textContent = titleCell.textContent.trim();
      moveInstrumentation(titleCell, titleDiv);

      headingWrapper.append(titleDiv);
      contentWrapper.append(headingWrapper);
    }

    // Description
    const descriptionCell = cells[2];
    if (descriptionCell) {
      const descriptionDiv = document.createElement('div');
      descriptionDiv.classList.add('card-list-cmp-card-list__content__card-item-content__description');
      descriptionDiv.setAttribute('tabindex', '0');
      descriptionDiv.setAttribute('aria-label', descriptionCell.innerHTML.trim());
      descriptionDiv.setAttribute('aria-hidden', 'false');
      descriptionDiv.innerHTML = descriptionCell.innerHTML;
      moveInstrumentation(descriptionCell, descriptionDiv);

      contentWrapper.append(descriptionDiv);
    }

    cardItem.append(contentWrapper);
    cardItemsWrapper.append(cardItem);
  });

  mainContent.append(cardItemsWrapper);

  block.textContent = '';
  block.classList.add('card-list-cmp-card-list', 'parallax-child');
  block.append(mainContent);
}
