import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainContentWrapper = document.createElement('div');
  mainContentWrapper.classList.add('card-list-cmp-card-list__content');

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
  const h2 = document.createElement('h2');

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('card-list-cmp-card-list__content__cta-wrapper', 'is-visible');
  const ctaLink = document.createElement('a');
  ctaLink.classList.add('card-list-cta', 'card-list-cta__primary');
  ctaLink.setAttribute('target', '_self');
  ctaLink.setAttribute('data-palette', 'palette-1');
  const ctaIcon = document.createElement('span');
  ctaIcon.classList.add('card-list-cta__icon', 'qd-icon', 'qd-icon--cheveron-right');
  ctaIcon.setAttribute('aria-hidden', 'true');
  const ctaLabel = document.createElement('span');
  ctaLabel.classList.add('card-list-cta__label');

  // Card items section
  const itemsWrapper = document.createElement('div');
  itemsWrapper.classList.add('card-list-cmp-card-list__content__items');

  // Process block children
  [...block.children].forEach((row, index) => {
    if (index === 0) {
      // First row contains heading and CTA
      moveInstrumentation(row, topSection);
      const cells = [...row.children];

      // Heading
      const headingCell = cells[0];
      if (headingCell) {
        const headingContent = headingCell.querySelector('h1, h2, h3, h4, h5, h6');
        if (headingContent) {
          h2.innerHTML = headingContent.innerHTML;
          headingTitle.append(h2);
          headingWrapper.append(headingTitle);
          topSection.append(headingWrapper);
        }
      }

      // CTA
      const ctaCell = cells[1];
      if (ctaCell) {
        const existingLink = ctaCell.querySelector('a');
        if (existingLink) {
          ctaLink.href = existingLink.href;
          ctaLink.setAttribute('aria-label', existingLink.textContent.trim());
          ctaLabel.textContent = existingLink.textContent.trim();
          ctaLink.append(ctaIcon, ctaLabel);
          ctaWrapper.append(ctaLink);
          topSection.append(ctaWrapper);
        }
      }
      topSectionWrapper.append(topSection);
      mainContentWrapper.append(topSectionWrapper);
    } else {
      // Subsequent rows are card items
      const cardItem = document.createElement('div');
      cardItem.classList.add('card-list-cmp-card-list__content__card-item', 'is-visible', 'card-list-slide-up');
      cardItem.setAttribute('data-animation', 'card');
      cardItem.setAttribute('data-slide-type', 'slide-up');
      cardItem.setAttribute('data-slide-no-wrap', '');
      cardItem.setAttribute('data-slide-delay', `${index - 1}00`);
      cardItem.style.transitionDelay = `${(index - 1) * 0.2}s`;
      moveInstrumentation(row, cardItem);

      const cells = [...row.children];

      // Image
      const imageCell = cells[0];
      if (imageCell) {
        const img = imageCell.querySelector('img');
        if (img) {
          const picture = createOptimizedPicture(img.src, img.alt);
          moveInstrumentation(img, picture.querySelector('img'));
          picture.querySelector('img').classList.add('card-list-cmp-card-list__content__card-item__image');
          cardItem.append(picture);
        }
      }

      // Content (Title and Description)
      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('card-list-cmp-card-list__content__card-item-content');

      const titleCell = cells[1];
      if (titleCell) {
        const titleWrapper = document.createElement('div');
        titleWrapper.classList.add('card-list-cmp-card-list__content__card-item-content__heading-wrapper');
        titleWrapper.setAttribute('tabindex', '0');
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('card-list-cmp-card-list__content__card-item-content__title');
        titleDiv.setAttribute('aria-hidden', 'false');
        titleDiv.textContent = titleCell.textContent.trim();
        titleWrapper.append(titleDiv);
        contentWrapper.append(titleWrapper);
      }

      const descriptionCell = cells[2];
      if (descriptionCell) {
        const descriptionDiv = document.createElement('div');
        descriptionDiv.classList.add('card-list-cmp-card-list__content__card-item-content__description');
        descriptionDiv.setAttribute('tabindex', '0');
        descriptionDiv.setAttribute('aria-label', descriptionCell.innerHTML.trim());
        descriptionDiv.setAttribute('aria-hidden', 'false');
        descriptionDiv.innerHTML = descriptionCell.innerHTML;
        contentWrapper.append(descriptionDiv);
      }
      cardItem.append(contentWrapper);
      itemsWrapper.append(cardItem);
    }
  });

  mainContentWrapper.append(itemsWrapper);

  block.textContent = '';
  block.classList.add('card-list-cmp-card-list', 'parallax-child');
  block.append(mainContentWrapper);
}