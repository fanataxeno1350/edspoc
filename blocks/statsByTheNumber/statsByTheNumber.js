import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const statsByTheNumberWrapper = document.createElement('div');
  statsByTheNumberWrapper.className = 'stats-by-the-number-wrapper animate-ready animate-in';
  statsByTheNumberWrapper.setAttribute('role', 'region');
  statsByTheNumberWrapper.setAttribute('aria-label', 'Statistics by the numbers');
  moveInstrumentation(block, statsByTheNumberWrapper);

  const statsByTheNumberContainer = document.createElement('div');
  statsByTheNumberContainer.className = 'stats-by-the-number-container';

  const rows = [...block.children];

  // First row is title, description, and main image
  if (rows[0]) {
    const titleCell = rows[0].children[0];
    const descriptionCell = rows[0].children[1];
    const mainImageCell = rows[0].children[2];

    const statsByTheNumberTitle = document.createElement('div');
    statsByTheNumberTitle.className = 'stats-by-the-number-title';
    const h2 = document.createElement('h2');
    h2.innerHTML = titleCell.innerHTML;
    statsByTheNumberTitle.append(h2);
    statsByTheNumberContainer.append(statsByTheNumberTitle);

    const statsByTheNumberMainContent = document.createElement('div');
    statsByTheNumberMainContent.className = 'stats-by-the-number-main-content';

    const statsByTheNumberImageSection = document.createElement('div');
    statsByTheNumberImageSection.className = 'stats-by-the-number-image-section';

    const statsByTheNumberImageContainer = document.createElement('div');
    statsByTheNumberImageContainer.className = 'stats-by-the-number-image-container stats-by-the-number-image-container--active';
    statsByTheNumberImageContainer.setAttribute('data-tab-content', '0');

    const mainImage = mainImageCell.querySelector('img');
    if (mainImage) {
      const optimizedPic = createOptimizedPicture(mainImage.src, mainImage.alt);
      moveInstrumentation(mainImage, optimizedPic.querySelector('img'));
      const statsByTheNumberMainImage = optimizedPic.querySelector('img');
      statsByTheNumberMainImage.classList.add('stats-by-the-number-main-image');
      statsByTheNumberMainImage.setAttribute('data-tab-image', '0');
      statsByTheNumberMainImage.style.opacity = '1';
      statsByTheNumberImageContainer.setAttribute('data-image-path', mainImage.src);
      statsByTheNumberImageContainer.append(optimizedPic);
    }
    statsByTheNumberImageSection.append(statsByTheNumberImageContainer);
    statsByTheNumberMainContent.append(statsByTheNumberImageSection);

    const statsByTheNumberContentSection = document.createElement('div');
    statsByTheNumberContentSection.className = 'stats-by-the-number-content-section';

    const statsByTheNumberTabContent = document.createElement('div');
    statsByTheNumberTabContent.className = 'stats-by-the-number-tab-content stats-by-the-number-tab-content--active';
    statsByTheNumberTabContent.setAttribute('data-tab-content', '0');

    const statsByTheNumberDescription = document.createElement('div');
    statsByTheNumberDescription.className = 'stats-by-the-number-description';
    statsByTheNumberDescription.innerHTML = descriptionCell.innerHTML;
    statsByTheNumberTabContent.append(statsByTheNumberDescription);

    const statsByTheNumberCards = document.createElement('div');
    statsByTheNumberCards.className = 'stats-by-the-number-cards';
    statsByTheNumberCards.setAttribute('role', 'list');

    // Remaining rows are stat cards
    rows.slice(1).forEach((row) => {
      const cardCell = row.children[0];

      const statsByTheNumberCard = document.createElement('div');
      statsByTheNumberCard.className = 'stats-by-the-number-card';
      statsByTheNumberCard.setAttribute('role', 'img');
      statsByTheNumberCard.setAttribute('tabindex', '0');
      moveInstrumentation(row, statsByTheNumberCard);

      const hoverImage = cardCell.querySelector('a[href]');
      if (hoverImage) {
        statsByTheNumberCard.setAttribute('data-hover-image', hoverImage.href);
      }

      const numberElement = cardCell.children[0];
      const descriptionElement = cardCell.children[1];
      const hoverDetailsElement = cardCell.children[2];

      if (numberElement) {
        const numberDiv = document.createElement('div');
        numberDiv.className = 'stats-by-the-number-card__number';
        numberDiv.setAttribute('data-count', numberElement.innerHTML);
        numberDiv.innerHTML = numberElement.innerHTML;
        statsByTheNumberCard.append(numberDiv);

        // Set aria-label from number and description if available
        const descriptionText = descriptionElement ? descriptionElement.textContent.trim() : '';
        const numberText = numberElement.textContent.trim();
        if (numberText && descriptionText) {
          statsByTheNumberCard.setAttribute('aria-label', `${numberText}: ${descriptionText}`);
        } else if (numberText) {
          statsByTheNumberCard.setAttribute('aria-label', numberText);
        }
      }

      if (descriptionElement) {
        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'stats-by-the-number-card__description';
        descriptionDiv.innerHTML = descriptionElement.innerHTML;
        statsByTheNumberCard.append(descriptionDiv);
      }

      if (hoverDetailsElement) {
        statsByTheNumberCard.setAttribute('data-hover-details', hoverDetailsElement.innerHTML);
      }

      statsByTheNumberCards.append(statsByTheNumberCard);
    });

    statsByTheNumberTabContent.append(statsByTheNumberCards);

    // Check for a CTA in the last cell of the first row or a separate row if needed
    const ctaCell = rows[0].children[3]; // Assuming CTA is the fourth cell in the first row
    if (ctaCell) {
      const ctaLink = ctaCell.querySelector('a');
      if (ctaLink) {
        const statsByTheNumberCta = document.createElement('div');
        statsByTheNumberCta.className = 'stats-by-the-number-cta';

        const newCtaLink = document.createElement('a');
        newCtaLink.href = ctaLink.href;
        newCtaLink.className = 'cta cta__primary';
        newCtaLink.target = ctaLink.target;
        newCtaLink.setAttribute('aria-label', ctaLink.getAttribute('aria-label') || ctaLink.textContent.trim());
        newCtaLink.setAttribute('data-palette', 'palette-1');

        const iconSpan = document.createElement('span');
        iconSpan.className = 'cta__icon qd-icon qd-icon--cheveron-right';
        iconSpan.setAttribute('aria-hidden', 'true');
        newCtaLink.append(iconSpan);

        const labelSpan = document.createElement('span');
        labelSpan.className = 'cta__label';
        labelSpan.textContent = ctaLink.textContent.trim();
        newCtaLink.append(labelSpan);

        statsByTheNumberCta.append(newCtaLink);
        statsByTheNumberTabContent.append(statsByTheNumberCta);
      }
    }

    statsByTheNumberContentSection.append(statsByTheNumberTabContent);
    statsByTheNumberMainContent.append(statsByTheNumberContentSection);
    statsByTheNumberContainer.append(statsByTheNumberMainContent);
  }

  statsByTheNumberWrapper.append(statsByTheNumberContainer);
  block.textContent = '';
  block.append(statsByTheNumberWrapper);
}
