import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainContent = document.createElement('div');
  mainContent.classList.add('card-list-cmp-card-list__content');

  // Top section (heading and CTA)
  const topSectionWrapper = document.createElement('div');
  topSectionWrapper.classList.add('card-list-slide-wrap');
  const topSection = document.createElement('div');
  topSection.classList.add('card-list-cmp-card-list__content__top', 'card-list-slide-up');
  topSection.setAttribute('data-slide-type', 'slide-up');

  const headingWrapper = document.createElement('div');
  headingWrapper.classList.add('card-list-cmp-card-list__content__heading', 'is-visible');
  const headingTitle = document.createElement('div');
  headingTitle.id = 'card-list-heading';
  headingTitle.classList.add('card-list-cmp-card-list__content__heading__title');
  headingTitle.setAttribute('tabindex', '0');

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('card-list-cmp-card-list__content__cta-wrapper', 'is-visible');

  // Cards section
  const cardsSection = document.createElement('div');
  cardsSection.classList.add('card-list-cmp-card-list__content__items');

  // Read from block's children (authored content)
  const rows = [...block.children];

  // First row typically contains heading and CTA
  if (rows.length > 0) {
    const firstRow = rows[0];
    const cells = [...firstRow.children];
    moveInstrumentation(firstRow, topSection);

    // Heading
    const headingCell = cells[0];
    if (headingCell) {
      const headingContent = headingCell.querySelector('h1, h2, h3, h4, h5, h6');
      if (headingContent) {
        headingTitle.append(headingContent);
        moveInstrumentation(headingContent, headingTitle.querySelector('h1, h2, h3, h4, h5, h6'));
      }
    }
    headingWrapper.append(headingTitle);
    topSection.append(headingWrapper);

    // CTA
    const ctaCell = cells[1];
    if (ctaCell) {
      const link = ctaCell.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.classList.add('card-list-cta', 'card-list-cta__primary');
        newLink.target = link.target;
        newLink.setAttribute('aria-label', link.getAttribute('aria-label'));
        newLink.setAttribute('data-palette', 'palette-1');

        const icon = document.createElement('span');
        icon.classList.add('card-list-cta__icon', 'qd-icon', 'qd-icon--cheveron-right');
        icon.setAttribute('aria-hidden', 'true');
        newLink.append(icon);

        const label = document.createElement('span');
        label.classList.add('card-list-cta__label');
        label.textContent = link.textContent;
        newLink.append(label);

        ctaWrapper.append(newLink);
        moveInstrumentation(link, newLink);
      }
    }
    topSection.append(ctaWrapper);
  }

  topSectionWrapper.append(topSection);
  mainContent.append(topSectionWrapper);

  // Remaining rows are cards
  rows.slice(1).forEach((row, index) => {
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
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        optimizedPic.querySelector('img').classList.add('card-list-cmp-card-list__content__card-item__image');
        cardItem.append(optimizedPic);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
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
      titleDiv.textContent = titleCell.textContent.trim();

      headingWrapper.append(titleDiv);
      cardItemContent.append(headingWrapper);
      moveInstrumentation(titleCell, titleDiv);
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

      cardItemContent.append(descriptionDiv);
      moveInstrumentation(descriptionCell, descriptionDiv);
    }

    cardItem.append(cardItemContent);
    cardsSection.append(cardItem);
  });

  mainContent.append(cardsSection);

  block.textContent = '';
  block.classList.add('card-list-cmp-card-list', 'parallax-child');
  block.append(mainContent);
}
