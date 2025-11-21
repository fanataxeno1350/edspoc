import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const statsByTheNumberWrapper = document.createElement('div');
  statsByTheNumberWrapper.className = 'stats-by-the-number-wrapper animate-ready animate-in';
  statsByTheNumberWrapper.setAttribute('role', 'region');
  statsByTheNumberWrapper.setAttribute('aria-label', 'Statistics by the numbers');

  const statsByTheNumberContainer = document.createElement('div');
  statsByTheNumberContainer.className = 'stats-by-the-number-container';
  statsByTheNumberWrapper.append(statsByTheNumberContainer);

  const statsByTheNumberTitle = document.createElement('div');
  statsByTheNumberTitle.className = 'stats-by-the-number-title';
  const h2 = document.createElement('h2');
  statsByTheNumberTitle.append(h2);
  statsByTheNumberContainer.append(statsByTheNumberTitle);

  const statsByTheNumberMainContent = document.createElement('div');
  statsByTheNumberMainContent.className = 'stats-by-the-number-main-content';
  statsByTheNumberContainer.append(statsByTheNumberMainContent);

  const statsByTheNumberImageSection = document.createElement('div');
  statsByTheNumberImageSection.className = 'stats-by-the-number-image-section';
  statsByTheNumberMainContent.append(statsByTheNumberImageSection);

  const statsByTheNumberContentSection = document.createElement('div');
  statsByTheNumberContentSection.className = 'stats-by-the-number-content-section';
  statsByTheNumberMainContent.append(statsByTheNumberContentSection);

  const statsByTheNumberTabContent = document.createElement('div');
  statsByTheNumberTabContent.className = 'stats-by-the-number-tab-content stats-by-the-number-tab-content--active';
  statsByTheNumberTabContent.setAttribute('data-tab-content', '0');
  statsByTheNumberContentSection.append(statsByTheNumberTabContent);

  const statsByTheNumberCards = document.createElement('div');
  statsByTheNumberCards.className = 'stats-by-the-number-cards';
  statsByTheNumberCards.setAttribute('role', 'list');
  statsByTheNumberTabContent.append(statsByTheNumberCards);

  [...block.children].forEach((row, rowIndex) => {
    if (rowIndex === 0) {
      // First row contains title, main image, main description, and CTA
      const titleCell = row.children[0];
      const mainImageCell = row.children[1];
      const mainDescriptionCell = row.children[2];
      const ctaLinkCell = row.children[3];
      const ctaLabelCell = row.children[4];

      if (titleCell) {
        h2.innerHTML = titleCell.innerHTML;
        moveInstrumentation(titleCell, h2);
      }

      if (mainImageCell) {
        const img = mainImageCell.querySelector('img');
        if (img) {
          const statsByTheNumberImageContainer = document.createElement('div');
          statsByTheNumberImageContainer.className = 'stats-by-the-number-image-container stats-by-the-number-image-container--active';
          statsByTheNumberImageContainer.setAttribute('data-tab-content', '0');
          statsByTheNumberImageContainer.setAttribute('data-image-path', img.src);

          const optimizedPic = createOptimizedPicture(img.src, img.alt);
          const mainImage = optimizedPic.querySelector('img');
          mainImage.className = 'stats-by-the-number-main-image';
          mainImage.setAttribute('data-tab-image', '0');
          mainImage.style.opacity = '1';
          moveInstrumentation(img, mainImage);
          statsByTheNumberImageContainer.append(optimizedPic);
          statsByTheNumberImageSection.append(statsByTheNumberImageContainer);
        }
      }

      if (mainDescriptionCell) {
        const statsByTheNumberDescription = document.createElement('div');
        statsByTheNumberDescription.className = 'stats-by-the-number-description';
        statsByTheNumberDescription.innerHTML = mainDescriptionCell.innerHTML;
        moveInstrumentation(mainDescriptionCell, statsByTheNumberDescription);
        statsByTheNumberTabContent.prepend(statsByTheNumberDescription);
      }

      if (ctaLinkCell && ctaLabelCell) {
        const statsByTheNumberCta = document.createElement('div');
        statsByTheNumberCta.className = 'stats-by-the-number-cta';

        const link = ctaLinkCell.querySelector('a');
        if (link) {
          const newLink = document.createElement('a');
          newLink.href = link.href;
          newLink.className = 'cta cta__primary';
          newLink.target = '_self';
          newLink.setAttribute('aria-label', ctaLabelCell.textContent.trim());
          newLink.setAttribute('data-palette', 'palette-1');

          const iconSpan = document.createElement('span');
          iconSpan.className = 'cta__icon qd-icon qd-icon--cheveron-right';
          iconSpan.setAttribute('aria-hidden', 'true');
          newLink.append(iconSpan);

          const labelSpan = document.createElement('span');
          labelSpan.className = 'cta__label';
          labelSpan.textContent = ctaLabelCell.textContent.trim();
          newLink.append(labelSpan);

          moveInstrumentation(link, newLink);
          moveInstrumentation(ctaLabelCell, labelSpan);
          statsByTheNumberCta.append(newLink);
          statsByTheNumberTabContent.append(statsByTheNumberCta);
        }
      }
    } else {
      // Subsequent rows are stat cards
      const imageCell = row.children[0];
      const numberCell = row.children[1];
      const descriptionCell = row.children[2];

      const statsByTheNumberCard = document.createElement('div');
      statsByTheNumberCard.className = 'stats-by-the-number-card';
      statsByTheNumberCard.setAttribute('role', 'img');
      statsByTheNumberCard.setAttribute('tabindex', '0');
      statsByTheNumberCard.setAttribute('aria-label', `${numberCell.textContent.trim()}: ${descriptionCell.textContent.trim()}`);
      moveInstrumentation(row, statsByTheNumberCard);

      if (imageCell) {
        const img = imageCell.querySelector('img');
        if (img) {
          statsByTheNumberCard.setAttribute('data-hover-image', img.src);
          moveInstrumentation(img, statsByTheNumberCard);
        }
      }

      // For data-hover-details, we need to reconstruct the HTML from the description cell
      if (descriptionCell) {
        statsByTheNumberCard.setAttribute('data-hover-details', descriptionCell.innerHTML.trim());
      }

      if (numberCell) {
        const readOnlyAuthorSpan = document.createElement('span');
        readOnlyAuthorSpan.className = 'readOnlyAuthor';
        readOnlyAuthorSpan.style.display = 'none';
        readOnlyAuthorSpan.innerHTML = numberCell.innerHTML.trim();
        statsByTheNumberCard.append(readOnlyAuthorSpan);
        moveInstrumentation(numberCell, readOnlyAuthorSpan);

        const numberDiv = document.createElement('div');
        numberDiv.className = 'stats-by-the-number-card__number';
        numberDiv.setAttribute('data-count', numberCell.innerHTML.trim());
        numberDiv.innerHTML = numberCell.innerHTML;
        statsByTheNumberCard.append(numberDiv);
      }

      if (descriptionCell) {
        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'stats-by-the-number-card__description';
        descriptionDiv.innerHTML = descriptionCell.innerHTML;
        statsByTheNumberCard.append(descriptionDiv);
      }
      statsByTheNumberCards.append(statsByTheNumberCard);
    }
  });

  block.textContent = '';
  block.append(statsByTheNumberWrapper);
}
