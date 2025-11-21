import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainContent = document.createElement('div');
  mainContent.classList.add('card-list-cmp-card-list__content');
  moveInstrumentation(block, mainContent);

  const topContentWrapper = document.createElement('div');
  topContentWrapper.classList.add('card-list-slide-wrap');
  mainContent.append(topContentWrapper);

  const topContent = document.createElement('div');
  topContent.classList.add('card-list-cmp-card-list__content__top', 'card-list-slide-up');
  topContent.setAttribute('data-slide-type', 'slide-up');
  topContentWrapper.append(topContent);

  const headingWrapper = document.createElement('div');
  headingWrapper.classList.add('card-list-cmp-card-list__content__heading', 'is-visible');
  topContent.append(headingWrapper);

  const headingTitle = document.createElement('div');
  headingTitle.id = 'card-list-heading';
  headingTitle.classList.add('card-list-cmp-card-list__content__heading__title');
  headingTitle.setAttribute('tabindex', '0');
  headingWrapper.append(headingTitle);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('card-list-cmp-card-list__content__cta-wrapper', 'is-visible');
  topContent.append(ctaWrapper);

  const itemsContainer = document.createElement('div');
  itemsContainer.classList.add('card-list-cmp-card-list__content__items');
  mainContent.append(itemsContainer);

  [...block.children].forEach((row, index) => {
    if (index === 0) {
      // First row contains heading and CTA
      const headingCell = row.children[0];
      const ctaLinkCell = row.children[1];
      const ctaLabelCell = row.children[2];

      if (headingCell) {
        const heading = headingCell.querySelector('h2');
        if (heading) {
          headingTitle.append(heading);
          moveInstrumentation(headingCell, headingTitle);
        }
      }

      if (ctaLinkCell && ctaLabelCell) {
        const link = ctaLinkCell.querySelector('a');
        const label = ctaLabelCell.textContent.trim();

        if (link) {
          const newLink = document.createElement('a');
          newLink.href = link.href;
          newLink.classList.add('card-list-cta', 'card-list-cta__primary');
          newLink.setAttribute('target', '_self');
          newLink.setAttribute('aria-label', label);
          newLink.setAttribute('data-palette', 'palette-1');

          const iconSpan = document.createElement('span');
          iconSpan.classList.add('card-list-cta__icon', 'qd-icon', 'qd-icon--cheveron-right');
          iconSpan.setAttribute('aria-hidden', 'true');
          newLink.append(iconSpan);

          const labelSpan = document.createElement('span');
          labelSpan.classList.add('card-list-cta__label');
          labelSpan.textContent = label;
          newLink.append(labelSpan);

          ctaWrapper.append(newLink);
          moveInstrumentation(ctaLinkCell, newLink);
        }
      }
    } else {
      // Subsequent rows are card items
      const cardItem = document.createElement('div');
      cardItem.classList.add('card-list-cmp-card-list__content__card-item', 'is-visible', 'card-list-slide-up');
      cardItem.setAttribute('data-animation', 'card');
      cardItem.setAttribute('data-slide-type', 'slide-up');
      cardItem.setAttribute('data-slide-no-wrap', '');
      cardItem.setAttribute('data-slide-delay', `${(index - 1) * 100}`.padStart(3, '0'));
      cardItem.style.transitionDelay = `${(index - 1) * 0.2}s`;
      moveInstrumentation(row, cardItem);

      const imageCell = row.children[0];
      const titleCell = row.children[1];
      const descriptionCell = row.children[2];

      if (imageCell) {
        const img = imageCell.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt);
          optimizedPic.querySelector('img').classList.add('card-list-cmp-card-list__content__card-item__image');
          cardItem.append(optimizedPic);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
        }
      }

      const cardContent = document.createElement('div');
      cardContent.classList.add('card-list-cmp-card-list__content__card-item-content');
      cardItem.append(cardContent);

      if (titleCell) {
        const titleWrapper = document.createElement('div');
        titleWrapper.classList.add('card-list-cmp-card-list__content__card-item-content__heading-wrapper');
        titleWrapper.setAttribute('tabindex', '0');

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('card-list-cmp-card-list__content__card-item-content__title');
        titleDiv.setAttribute('aria-hidden', 'false');
        titleDiv.textContent = titleCell.textContent.trim();
        titleWrapper.append(titleDiv);
        cardContent.append(titleWrapper);
        moveInstrumentation(titleCell, titleDiv);
      }

      if (descriptionCell) {
        const descriptionDiv = document.createElement('div');
        descriptionDiv.classList.add('card-list-cmp-card-list__content__card-item-content__description');
        descriptionDiv.setAttribute('tabindex', '0');
        descriptionDiv.setAttribute('aria-label', descriptionCell.innerHTML.trim());
        descriptionDiv.setAttribute('aria-hidden', 'false');
        descriptionDiv.innerHTML = descriptionCell.innerHTML;
        cardContent.append(descriptionDiv);
        moveInstrumentation(descriptionCell, descriptionDiv);
      }

      itemsContainer.append(cardItem);
    }
  });

  block.textContent = '';
  block.append(mainContent);
}
