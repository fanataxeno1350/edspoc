import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('card-list-cmp-card-list', 'parallax-child');

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('card-list-cmp-card-list__content');

  const slideWrapDiv = document.createElement('div');
  slideWrapDiv.classList.add('card-list-slide-wrap');

  const topContentDiv = document.createElement('div');
  topContentDiv.classList.add('card-list-cmp-card-list__content__top', 'card-list-slide-up');
  topContentDiv.setAttribute('data-slide-type', 'slide-up');

  const headingWrapperDiv = document.createElement('div');
  headingWrapperDiv.classList.add('card-list-cmp-card-list__content__heading', 'is-visible');

  const headingTitleDiv = document.createElement('div');
  headingTitleDiv.id = 'card-list-heading';
  headingTitleDiv.classList.add('card-list-cmp-card-list__content__heading__title');
  headingTitleDiv.setAttribute('tabindex', '0');

  const ctaWrapperDiv = document.createElement('div');
  ctaWrapperDiv.classList.add('card-list-cmp-card-list__content__cta-wrapper', 'is-visible');

  const itemsDiv = document.createElement('div');
  itemsDiv.classList.add('card-list-cmp-card-list__content__items');

  // Process the first row for heading and CTA
  const firstRow = block.children[0];
  if (firstRow) {
    moveInstrumentation(firstRow, topContentDiv);
    const cells = [...firstRow.children];

    // Heading
    const headingCell = cells[0];
    if (headingCell) {
      const heading = headingCell.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) {
        headingTitleDiv.append(heading);
        headingWrapperDiv.append(headingTitleDiv);
        topContentDiv.append(headingWrapperDiv);
      }
    }

    // CTA
    const ctaCell = cells[1];
    if (ctaCell) {
      const link = ctaCell.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.classList.add('card-list-cta', 'card-list-cta__primary');
        newLink.setAttribute('target', link.target || '_self');
        newLink.setAttribute('aria-label', link.getAttribute('aria-label') || link.textContent);
        newLink.setAttribute('data-palette', 'palette-1');

        const iconSpan = document.createElement('span');
        iconSpan.classList.add('card-list-cta__icon', 'qd-icon', 'qd-icon--cheveron-right');
        iconSpan.setAttribute('aria-hidden', 'true');
        newLink.append(iconSpan);

        const labelSpan = document.createElement('span');
        labelSpan.classList.add('card-list-cta__label');
        labelSpan.textContent = link.textContent;
        newLink.append(labelSpan);

        ctaWrapperDiv.append(newLink);
        topContentDiv.append(ctaWrapperDiv);
      }
    }
  }

  slideWrapDiv.append(topContentDiv);
  contentDiv.append(slideWrapDiv);

  // Process subsequent rows for card items
  [...block.children].slice(1).forEach((row, index) => {
    const cardItemDiv = document.createElement('div');
    cardItemDiv.classList.add('card-list-cmp-card-list__content__card-item', 'is-visible', 'card-list-slide-up');
    cardItemDiv.setAttribute('data-animation', 'card');
    cardItemDiv.setAttribute('data-slide-type', 'slide-up');
    cardItemDiv.setAttribute('data-slide-no-wrap', '');
    cardItemDiv.setAttribute('data-slide-delay', `${index * 100}`);
    cardItemDiv.style.transitionDelay = `${index * 0.2}s`;
    moveInstrumentation(row, cardItemDiv);

    const cells = [...row.children];

    // Image
    const imageCell = cells[0];
    if (imageCell) {
      const img = imageCell.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        picture.querySelector('img').classList.add('card-list-cmp-card-list__content__card-item__image');
        picture.querySelector('img').setAttribute('loading', 'lazy');
        moveInstrumentation(img, picture.querySelector('img'));
        cardItemDiv.append(picture);
      }
    }

    const cardContentDiv = document.createElement('div');
    cardContentDiv.classList.add('card-list-cmp-card-list__content__card-item-content');

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
      headingWrapper.append(titleDiv);
      cardContentDiv.append(headingWrapper);
    }

    // Description
    const descriptionCell = cells[2];
    if (descriptionCell) {
      const descriptionDiv = document.createElement('div');
      descriptionDiv.classList.add('card-list-cmp-card-list__content__card-item-content__description');
      descriptionDiv.setAttribute('tabindex', '0');
      descriptionDiv.setAttribute('aria-label', descriptionCell.innerHTML);
      descriptionDiv.setAttribute('aria-hidden', 'false');
      descriptionDiv.innerHTML = descriptionCell.innerHTML;
      cardContentDiv.append(descriptionDiv);
    }

    cardItemDiv.append(cardContentDiv);
    itemsDiv.append(cardItemDiv);
  });

  contentDiv.append(itemsDiv);
  mainDiv.append(contentDiv);

  block.textContent = '';
  block.append(mainDiv);
}